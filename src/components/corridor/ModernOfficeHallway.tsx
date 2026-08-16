import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import deloitteEntranceImg from '../../assets/images/deloitte_entrance_wood_1786852843923.jpg';
import deloitteCorridorWalkwayImg from '../../assets/images/deloitte_atrium_corridor_1786852857363.jpg';

export interface ModernOfficeHallwayProps {
  progress: number; // 0.0 to 1.0
  onActiveEraChange?: (era: 'entrance' | 'corridor') => void;
  className?: string;
}

export const ModernOfficeHallway: React.FC<ModernOfficeHallwayProps> = ({
  progress,
  onActiveEraChange,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef(progress);
  const currentProgressRef = useRef(progress);
  targetProgressRef.current = progress;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;

    // Initialize WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060b14);
    scene.fog = new THREE.FogExp2(0x060b14, 0.015);

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    );

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // Warm wood & cool blue recessed ceiling linear spotlights along the hallway
    const ceilingLight1 = new THREE.PointLight(0xffe8d6, 2.2, 25);
    ceilingLight1.position.set(0, 4.2, 2);
    scene.add(ceilingLight1);

    const ceilingLight2 = new THREE.PointLight(0x38bdf8, 2.4, 28);
    ceilingLight2.position.set(0, 4.2, -16);
    scene.add(ceilingLight2);

    const ceilingLight3 = new THREE.PointLight(0x0284c7, 2.5, 32);
    ceilingLight3.position.set(0, 4.2, -34);
    scene.add(ceilingLight3);

    // Dynamic camera beacon
    const camPointLight = new THREE.PointLight(0x0f62fe, 1.6, 20);
    scene.add(camPointLight);

    // --- TEXTURE LOADER ---
    const textureLoader = new THREE.TextureLoader();
    const entranceTexture = textureLoader.load(deloitteEntranceImg);
    entranceTexture.colorSpace = THREE.SRGBColorSpace;

    const corridorTexture = textureLoader.load(deloitteCorridorWalkwayImg);
    corridorTexture.colorSpace = THREE.SRGBColorSpace;

    // --- HALLWAY ARCHITECTURE ---
    const hallwayLength = 70;
    const hallwayWidth = 9.4;
    const hallwayHeight = 4.8;

    // 1. Polished Hallway Floor with high gloss reflection feel
    const floorGeo = new THREE.PlaneGeometry(hallwayWidth, hallwayLength);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.14,
      metalness: 0.7
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, 0, -hallwayLength / 2 + 5);
    scene.add(floorMesh);

    // Floor edge accent light strips
    const leftStripGeo = new THREE.BoxGeometry(0.14, 0.04, hallwayLength);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x0f62fe });
    const leftStrip = new THREE.Mesh(leftStripGeo, stripMat);
    leftStrip.position.set(-hallwayWidth / 2 + 0.1, 0.02, -hallwayLength / 2 + 5);
    scene.add(leftStrip);

    const rightStrip = new THREE.Mesh(leftStripGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    rightStrip.position.set(hallwayWidth / 2 - 0.1, 0.02, -hallwayLength / 2 + 5);
    scene.add(rightStrip);

    // 2. Modern Ceiling with Linear Recessed LED Lights
    const ceilingGeo = new THREE.PlaneGeometry(hallwayWidth, hallwayLength);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.8,
      metalness: 0.1
    });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(0, hallwayHeight, -hallwayLength / 2 + 5);
    scene.add(ceilingMesh);

    // Linear central ceiling light track
    const lightTrackGeo = new THREE.BoxGeometry(0.6, 0.08, hallwayLength);
    const lightTrackMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lightTrack = new THREE.Mesh(lightTrackGeo, lightTrackMat);
    lightTrack.position.set(0, hallwayHeight - 0.04, -hallwayLength / 2 + 5);
    scene.add(lightTrack);

    // 3. Hallway Walls (Left & Right)
    const wallGeo = new THREE.PlaneGeometry(hallwayLength, hallwayHeight);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.6,
      metalness: 0.2
    });

    // Left Wall
    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-hallwayWidth / 2, hallwayHeight / 2, -hallwayLength / 2 + 5);
    scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(hallwayWidth / 2, hallwayHeight / 2, -hallwayLength / 2 + 5);
    scene.add(rightWall);

    // Architectural Pillars & Wood/Glass Partitions along walls
    const pillarCount = 8;
    const pillarSpacing = hallwayLength / pillarCount;
    for (let i = 0; i < pillarCount; i++) {
      const zPos = 4 - i * pillarSpacing;

      // Architectural fin
      const finGeo = new THREE.BoxGeometry(0.32, hallwayHeight, 0.4);
      const finMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.3,
        metalness: 0.7
      });
      const leftFin = new THREE.Mesh(finGeo, finMat);
      leftFin.position.set(-hallwayWidth / 2 + 0.16, hallwayHeight / 2, zPos);
      scene.add(leftFin);

      const rightFin = new THREE.Mesh(finGeo, finMat);
      rightFin.position.set(hallwayWidth / 2 - 0.16, hallwayHeight / 2, zPos);
      scene.add(rightFin);

      // Vertical LED accent line on pillar
      const finLightGeo = new THREE.BoxGeometry(0.04, hallwayHeight * 0.85, 0.04);
      const finLightMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x0f62fe : 0x38bdf8
      });
      const finLight = new THREE.Mesh(finLightGeo, finLightMat);
      finLight.position.set(-hallwayWidth / 2 + 0.34, hallwayHeight / 2, zPos);
      scene.add(finLight);
    }

    // --- 3D PLACEHOLDER IMAGE PLANES ---

    // 1. DELOITTE RECEPTION WOOD SLAT WALL INTERFACE (Mounted at front entrance / Left at z = -8)
    const entrancePlaneGroup = new THREE.Group();
    const planeWidth = 7.6;
    const planeHeight = 4.3;

    const entranceGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const entranceMat = new THREE.MeshStandardMaterial({
      map: entranceTexture,
      roughness: 0.2,
      metalness: 0.1
    });
    const entranceMesh = new THREE.Mesh(entranceGeo, entranceMat);
    entrancePlaneGroup.add(entranceMesh);

    // Frame with illuminated warm/blue glow
    const frameThickness = 0.16;
    const frameGeo = new THREE.BoxGeometry(planeWidth + frameThickness * 2, planeHeight + frameThickness * 2, 0.14);
    const entranceFrameMat = new THREE.MeshStandardMaterial({
      color: 0x0f62fe,
      emissive: 0x0f62fe,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8
    });
    const entranceFrame = new THREE.Mesh(frameGeo, entranceFrameMat);
    entranceFrame.position.z = -0.08;
    entrancePlaneGroup.add(entranceFrame);

    const glowGeo = new THREE.PlaneGeometry(planeWidth + 0.6, planeHeight + 0.6);
    const entranceGlowMat = new THREE.MeshBasicMaterial({
      color: 0x0f62fe,
      transparent: true,
      opacity: 0.35
    });
    const entranceGlow = new THREE.Mesh(glowGeo, entranceGlowMat);
    entranceGlow.position.z = -0.16;
    entrancePlaneGroup.add(entranceGlow);

    // Angled on Left Wall
    entrancePlaneGroup.position.set(-hallwayWidth / 2 + 0.8, 2.4, -9);
    entrancePlaneGroup.rotation.y = Math.PI * 0.13;
    scene.add(entrancePlaneGroup);

    // 2. DELOITTE ATRIUM CORRIDOR WALKWAY PLANE (Mounted ahead at z = -32)
    const corridorPlaneGroup = new THREE.Group();
    const corridorGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const corridorMat = new THREE.MeshStandardMaterial({
      map: corridorTexture,
      roughness: 0.2,
      metalness: 0.1
    });
    const corridorMesh = new THREE.Mesh(corridorGeo, corridorMat);
    corridorPlaneGroup.add(corridorMesh);

    const corridorFrameMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8
    });
    const corridorFrame = new THREE.Mesh(frameGeo, corridorFrameMat);
    corridorFrame.position.z = -0.08;
    corridorPlaneGroup.add(corridorFrame);

    const corridorGlow = new THREE.Mesh(
      glowGeo,
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })
    );
    corridorGlow.position.z = -0.16;
    corridorPlaneGroup.add(corridorGlow);

    // Positioned along the walkway path
    corridorPlaneGroup.position.set(hallwayWidth / 2 - 0.8, 2.4, -30);
    corridorPlaneGroup.rotation.y = -Math.PI * 0.13;
    scene.add(corridorPlaneGroup);

    // 3. Hallway End Feature Wall
    const endWallGeo = new THREE.PlaneGeometry(hallwayWidth, hallwayHeight);
    const endWallMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.4,
      metalness: 0.8
    });
    const endWall = new THREE.Mesh(endWallGeo, endWallMat);
    endWall.position.set(0, hallwayHeight / 2, -hallwayLength + 5);
    scene.add(endWall);

    // Ambient floating particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * (hallwayWidth - 1);
      particlePos[i + 1] = Math.random() * (hallwayHeight - 0.5) + 0.2;
      particlePos[i + 2] = 5 - Math.random() * hallwayLength;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    let lastEra: 'entrance' | 'corridor' = 'entrance';

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.08;
      const p = currentProgressRef.current;

      const currentEra: 'entrance' | 'corridor' = p >= 0.46 ? 'corridor' : 'entrance';
      if (currentEra !== lastEra) {
        lastEra = currentEra;
        if (onActiveEraChange) {
          onActiveEraChange(currentEra);
        }
      }

      // Camera Walking Motion & Zoom along Hallway
      let camX = 0;
      let camY = 2.2;
      let camZ = 3 - p * 34;
      let lookAtX = 0;
      let lookAtY = 2.3;
      let lookAtZ = camZ - 8;

      if (p < 0.46) {
        const subP = p / 0.46;
        camX = THREE.MathUtils.lerp(0.2, -0.8, subP);
        lookAtX = THREE.MathUtils.lerp(0, -2.4, subP);
        lookAtZ = THREE.MathUtils.lerp(-9, -10, subP);
      } else {
        const subP = (p - 0.46) / 0.54;
        camX = THREE.MathUtils.lerp(-0.8, 0.9, subP);
        lookAtX = THREE.MathUtils.lerp(-2.4, 2.5, subP);
        lookAtZ = THREE.MathUtils.lerp(-18, -31, subP);
      }

      camera.position.set(camX, camY, camZ);
      camera.lookAt(lookAtX, lookAtY, lookAtZ);
      camPointLight.position.set(camX, camY, camZ);

      // Subtle float motion
      const time = Date.now() * 0.0015;
      entrancePlaneGroup.position.y = 2.4 + Math.sin(time) * 0.04;
      corridorPlaneGroup.position.y = 2.4 + Math.cos(time) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [onActiveEraChange]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
