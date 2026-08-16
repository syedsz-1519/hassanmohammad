import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface IsometricModuleStackProps {
  compact?: boolean;
  className?: string;
  onSelectModule?: (module: 'MM' | 'WM' | 'Procurement') => void;
}

export const IsometricModuleStack: React.FC<IsometricModuleStackProps> = ({
  compact = false,
  className = '',
  onSelectModule
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeModule, setActiveModule] = useState<'MM' | 'WM' | 'Procurement' | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || (compact ? 360 : 480);
    const height = container.clientHeight || (compact ? 320 : 440);

    // Scene
    const scene = new THREE.Scene();

    // Camera - Orthographic or Isometric perspective
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(12, 14, 18);
    camera.lookAt(0, 0, 0);

    // Renderer with antialias & high pixel ratio
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting for glossy glass and subtle metal bevels
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(15, 25, 20);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x5fa8ff, 1.2);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x0f62fe, 1.5, 30);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Helper to generate dynamic canvas texture for slab labels
    const createLabelTexture = (
      code: string,
      title: string,
      color: string,
      accentColor: string
    ) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Base glass gradient fill
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
        bgGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        bgGrad.addColorStop(1, 'rgba(240, 246, 255, 0.85)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 512);

        // Subtle inner border
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 14;
        ctx.strokeRect(14, 14, 996, 484);

        // Header Accent Strip
        ctx.fillStyle = accentColor;
        ctx.fillRect(14, 14, 996, 40);

        // Large Code Badge
        ctx.fillStyle = color;
        ctx.font = 'bold 110px "Space Grotesk", sans-serif';
        ctx.fillText(code, 60, 220);

        // Title
        ctx.fillStyle = '#0B1220';
        ctx.font = '600 48px "Space Grotesk", sans-serif';
        ctx.fillText(title, 60, 310);

        // Deloitte SAP tag
        ctx.fillStyle = '#5B6472';
        ctx.font = '500 32px "JetBrains Mono", monospace';
        ctx.fillText('SAP ENTERPRISE MODULE // ACTIVE', 60, 380);

        // Subtle decorative tech grid dots
        ctx.fillStyle = accentColor;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(880 + i * 24, 220, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Module slab definitions
    const modulesConfig = [
      {
        id: 'MM' as const,
        code: 'SAP MM',
        title: 'Materials Management',
        color: '#0F62FE',
        accent: 'rgba(15, 98, 254, 0.8)',
        yOffset: 3.4,
        emissiveColor: 0x0f62fe
      },
      {
        id: 'WM' as const,
        code: 'SAP WM',
        title: 'Warehouse Management',
        color: '#FF8A00',
        accent: 'rgba(255, 138, 0, 0.8)',
        yOffset: 0.0,
        emissiveColor: 0xff8a00
      },
      {
        id: 'Procurement' as const,
        code: 'SAP CP',
        title: 'Central Procurement',
        color: '#00A389',
        accent: 'rgba(0, 163, 137, 0.8)',
        yOffset: -3.4,
        emissiveColor: 0x00a389
      }
    ];

    const slabGroup = new THREE.Group();
    scene.add(slabGroup);

    const slabMeshes: { mesh: THREE.Mesh; config: (typeof modulesConfig)[0] }[] = [];

    // Geometry for rounded-look slabs
    const slabGeo = new THREE.BoxGeometry(7.8, 0.7, 5.2);

    modulesConfig.forEach((cfg) => {
      const topTexture = createLabelTexture(cfg.code, cfg.title, cfg.color, cfg.accent);

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.15,
        transmission: 0.82, // Glass-like transparency
        thickness: 1.2,
        ior: 1.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.8,
        transparent: true,
        opacity: 0.95
      });

      const topMat = new THREE.MeshStandardMaterial({
        map: topTexture,
        roughness: 0.25,
        metalness: 0.1,
        transparent: true,
        opacity: 0.96
      });

      // Side materials with subtle colored glow on edges
      const sideMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(cfg.color),
        roughness: 0.3,
        metalness: 0.2,
        emissive: new THREE.Color(cfg.emissiveColor),
        emissiveIntensity: 0.18
      });

      // [right, left, top, bottom, front, back]
      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];

      const mesh = new THREE.Mesh(slabGeo, materials);
      mesh.position.y = cfg.yOffset;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: cfg.id };

      slabGroup.add(mesh);
      slabMeshes.push({ mesh, config: cfg });
    });

    // Connecting Light-Trace lines between the 3 slabs
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0f62fe,
      transparent: true,
      opacity: 0.75,
      linewidth: 2
    });

    // 4 Corner connector vertical beams
    const cornerOffsets = [
      { x: 3.4, z: 2.1 },
      { x: -3.4, z: 2.1 },
      { x: 3.4, z: -2.1 },
      { x: -3.4, z: -2.1 }
    ];

    const pulses: { mesh: THREE.Mesh; startY: number; speed: number }[] = [];

    cornerOffsets.forEach((corner) => {
      const points = [
        new THREE.Vector3(corner.x, 3.4, corner.z),
        new THREE.Vector3(corner.x, -3.4, corner.z)
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMaterial);
      slabGroup.add(line);

      // Glowing data pulse traveling on each vertical trace line
      const pulseGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x5fa8ff
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.set(corner.x, 3.4, corner.z);
      slabGroup.add(pulseMesh);
      pulses.push({
        mesh: pulseMesh,
        startY: 3.4,
        speed: 0.04 + Math.random() * 0.02
      });
    });

    // Center pulse beacon line
    const centerLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 4.0, 0),
      new THREE.Vector3(0, -4.0, 0)
    ]);
    const centerLine = new THREE.Line(
      centerLineGeo,
      new THREE.LineBasicMaterial({ color: 0x00a389, opacity: 0.5, transparent: true })
    );
    slabGroup.add(centerLine);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      mouseRef.current.targetX = (clientX / rect.width - 0.5) * 2;
      mouseRef.current.targetY = -(clientY / rect.height - 0.5) * 2;

      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(slabGroup.children, true);
      if (intersects.length > 0) {
        let parentMesh: THREE.Object3D | null = intersects[0].object;
        while (parentMesh && !parentMesh.userData.id && parentMesh.parent !== slabGroup) {
          parentMesh = parentMesh.parent;
        }
        if (parentMesh && parentMesh.userData.id) {
          const modId = parentMesh.userData.id as 'MM' | 'WM' | 'Procurement';
          setActiveModule(modId);
          if (onSelectModule) onSelectModule(modId);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || width;
      const newHeight = container.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Base slow auto-rotate + mouse tilt
      slabGroup.rotation.y = Math.sin(elapsedTime * 0.35) * 0.2 + mouseRef.current.x * 0.45;
      slabGroup.rotation.x = mouseRef.current.y * 0.3;
      slabGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.25;

      // Subtle float animation on each slab
      slabMeshes.forEach((item, index) => {
        const floatDelta = Math.sin(elapsedTime * 1.5 + index * 1.2) * 0.08;
        item.mesh.position.y = item.config.yOffset + floatDelta;
      });

      // Animate vertical light pulses
      pulses.forEach((pulse) => {
        pulse.mesh.position.y -= pulse.speed;
        if (pulse.mesh.position.y < -3.4) {
          pulse.mesh.position.y = pulse.startY;
        }
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [compact, onSelectModule]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center select-none cursor-pointer ${
        compact ? 'h-72 md:h-80' : 'h-80 md:h-[430px]'
      } ${className}`}
    >
      {/* 3D Stack interactive badge hint */}
      <div className="absolute top-2 right-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E4E9F0] shadow-sm text-[11px] font-mono text-[#5B6472] flex items-center gap-1.5 pointer-events-none z-10">
        <span className="w-2 h-2 rounded-full bg-[#0F62FE] animate-ping" />
        <span>3D ISOMETRIC SAP STACK</span>
      </div>

      {activeModule && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-[#0B1220]/90 backdrop-blur-md text-white text-xs font-mono shadow-lg transition-all animate-fade-in z-10 flex items-center gap-2">
          <span>Active Focus: <strong>SAP {activeModule}</strong></span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveModule(null);
            }}
            className="text-white/60 hover:text-white text-sm"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
