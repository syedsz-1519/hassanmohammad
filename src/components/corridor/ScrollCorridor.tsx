import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { createGalleryFrameTexture, createFloorGridTexture } from './textures';

export interface GalleryPlaneConfig {
  id: string;
  title: string;
  subtitle: string;
  placeholderLabel: string;
  badge: string;
  accentColor: string;
  tPosition: number; // 0.0 to 1.0 along the curve
  side: 'left' | 'right' | 'center';
  // TODO: [ADD: Deloitte office image] or [ADD: YASH Technologies office image]
}

export interface MilestoneNodeConfig {
  id: string;
  stepNumber: number;
  title: string;
  company: string;
  period: string;
  duration: string;
  accentColor: string;
  description: string;
  tPosition: number; // 0.0 to 1.0
  era: 'yash' | 'deloitte';
}

export interface ScrollCorridorProps {
  type: 'photo-gallery' | 'career-pathway';
  progress: number; // Normalized scroll progress 0 to 1
  galleryPlanes?: GalleryPlaneConfig[];
  milestones?: MilestoneNodeConfig[];
  onActiveIndexChange?: (index: number) => void;
  className?: string;
}

export const ScrollCorridor: React.FC<ScrollCorridorProps> = ({
  type,
  progress,
  galleryPlanes = [],
  milestones = [],
  onActiveIndexChange,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const targetProgressRef = useRef(progress);
  const currentProgressRef = useRef(progress);
  targetProgressRef.current = progress;

  // Internal state for current active milestone or plane in focus
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Setup CatmullRomCurve3 Path for the 3D corridor
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const totalSegments = 16;
    const length = 120; // 120 units in Z

    for (let i = 0; i <= totalSegments; i++) {
      const t = i / totalSegments;
      const z = -t * length;
      // Gentle S-curve lateral wave for organic camera travel
      const x = Math.sin(t * Math.PI * 1.5) * 3.5;
      // Subtle architectural elevation rise
      const y = Math.sin(t * Math.PI) * 1.2 + 2.0;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    // Transparent scene background to allow modern office background to show through
    scene.background = null;
    renderer.setClearColor(0x000000, 0);

    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      160
    );

    // --- LIGHTING (Clean White & High-End Architectural) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(10, 25, 15);
    scene.add(dirLight);

    const blueFillLight = new THREE.DirectionalLight(0x0f62fe, 0.6);
    blueFillLight.position.set(-12, 18, -40);
    scene.add(blueFillLight);

    // Dynamic camera beacon light
    const cameraLight = new THREE.PointLight(0x0f62fe, 2.5, 36);
    scene.add(cameraLight);

    // --- CORRIDOR ARCHITECTURE (Clean White Glassmorphic) ---
    // 1. Floor Plane with Clean Frosted Glass Grid
    const floorGeo = new THREE.PlaneGeometry(42, 180);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createFloorGridTexture(),
      roughness: 0.15,
      metalness: 0.25,
      color: 0xffffff
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -0.2, -60);
    scene.add(floorMesh);

    // 2. Glowing Sapphire Guideway Floor Rails along Curve
    const railPoints = curve.getPoints(100);
    const railGeoLeft = new THREE.BufferGeometry();
    const railGeoRight = new THREE.BufferGeometry();
    const leftPositions: number[] = [];
    const rightPositions: number[] = [];

    railPoints.forEach((pt) => {
      leftPositions.push(pt.x - 3.2, 0.06, pt.z);
      rightPositions.push(pt.x + 3.2, 0.06, pt.z);
    });

    railGeoLeft.setAttribute('position', new THREE.Float32BufferAttribute(leftPositions, 3));
    railGeoRight.setAttribute('position', new THREE.Float32BufferAttribute(rightPositions, 3));

    const railMat = new THREE.LineBasicMaterial({
      color: type === 'photo-gallery' ? 0x0f62fe : 0x0ea5e9,
      linewidth: 2.5
    });
    const leftRail = new THREE.Line(railGeoLeft, railMat);
    const rightRail = new THREE.Line(railGeoRight, railMat);
    scene.add(leftRail);
    scene.add(rightRail);

    // 3. Floating Glass Portals / Frosted Overhead Arches along the Curve
    const archPositions = [0.15, 0.38, 0.62, 0.85];
    archPositions.forEach((pos) => {
      const archPt = curve.getPointAt(pos);
      const archGeo = new THREE.TorusGeometry(4.6, 0.08, 16, 40, Math.PI);
      const archMat = new THREE.MeshStandardMaterial({
        color: 0x0f62fe,
        emissive: 0x0f62fe,
        emissiveIntensity: 0.2,
        roughness: 0.1,
        metalness: 0.5,
        transparent: true,
        opacity: 0.55
      });
      const archMesh = new THREE.Mesh(archGeo, archMat);
      archMesh.position.set(archPt.x, 0, archPt.z);
      archMesh.lookAt(archPt.x, 0, archPt.z + 10);
      scene.add(archMesh);
    });

    // 4. Floating Ambient Glass Shimmer Crystals
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 32;
      particlePositions[i + 1] = Math.random() * 9;
      particlePositions[i + 2] = -Math.random() * 140;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0f62fe,
      size: 0.16,
      transparent: true,
      opacity: 0.5
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 3D MESHES: PHOTO GALLERY WALLS OR MILESTONE NODES ---
    const interactiveMeshes: THREE.Mesh[] = [];

    if (type === 'photo-gallery') {
      // Create framed photo planes along both walls of the corridor
      galleryPlanes.forEach((plane) => {
        const texture = createGalleryFrameTexture(
          plane.title,
          plane.subtitle,
          plane.placeholderLabel,
          plane.badge,
          plane.accentColor
        );

        const frameGeo = new THREE.PlaneGeometry(6.6, 4.4);
        const frameMat = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
          roughness: 0.15,
          metalness: 0.2
        });
        const frameMesh = new THREE.Mesh(frameGeo, frameMat);

        const curvePt = curve.getPointAt(plane.tPosition);
        const tangent = curve.getTangentAt(plane.tPosition).normalize();
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        const offsetDistance = plane.side === 'left' ? -4.4 : 4.4;
        const posX = curvePt.x + normal.x * offsetDistance;
        const posZ = curvePt.z + normal.z * offsetDistance;
        const posY = curvePt.y + 0.6;

        frameMesh.position.set(posX, posY, posZ);

        // Angle the frame slightly toward the viewer as camera travels
        frameMesh.lookAt(curvePt.x, posY, curvePt.z);
        if (plane.side === 'left') {
          frameMesh.rotateY(Math.PI * 0.08);
        } else {
          frameMesh.rotateY(-Math.PI * 0.08);
        }

        // Add clean frosted glass backing slab behind frame
        const rimGeo = new THREE.BoxGeometry(6.8, 4.6, 0.12);
        const rimMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          metalness: 0.2,
          transparent: true,
          opacity: 0.95
        });
        const rimMesh = new THREE.Mesh(rimGeo, rimMat);
        rimMesh.position.set(0, 0, -0.08);
        frameMesh.add(rimMesh);

        scene.add(frameMesh);
        interactiveMeshes.push(frameMesh);
      });
    } else {
      // Career Pathway: Glowing Floor Milestone Nodes and Pedestals
      milestones.forEach((m) => {
        const curvePt = curve.getPointAt(m.tPosition);

        // 1. Glowing Floor Disc Ring
        const ringGeo = new THREE.RingGeometry(1.6, 2.2, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(m.accentColor),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = -Math.PI / 2;
        ringMesh.position.set(curvePt.x, 0.08, curvePt.z);
        scene.add(ringMesh);

        // 2. Inner Glowing Core Disc
        const coreGeo = new THREE.CircleGeometry(1.4, 32);
        const coreMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(m.accentColor),
          transparent: true,
          opacity: 0.25,
          side: THREE.DoubleSide
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreMesh.rotation.x = -Math.PI / 2;
        coreMesh.position.set(curvePt.x, 0.09, curvePt.z);
        scene.add(coreMesh);

        // 3. Floating Holographic Milestone Plaque (Clean White Glass)
        const texture = createGalleryFrameTexture(
          m.title,
          `${m.company} · ${m.period}`,
          `[STEP 0${m.stepNumber} // ${m.era.toUpperCase()}]`,
          m.duration,
          m.accentColor
        );
        const plaqueGeo = new THREE.PlaneGeometry(5.0, 3.4);
        const plaqueMat = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
          roughness: 0.15,
          metalness: 0.2
        });
        const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
        plaqueMesh.position.set(curvePt.x, curvePt.y + 0.8, curvePt.z - 1.2);
        plaqueMesh.lookAt(curvePt.x, curvePt.y + 1.2, curvePt.z + 10);
        scene.add(plaqueMesh);
        interactiveMeshes.push(plaqueMesh);
      });
    }

    // --- ANIMATION & CAMERA DOLLY LOOP ---
    let animationFrameId: number;

    const render = () => {
      // Smooth spring/lerp interpolation for camera movement
      const targetP = Math.max(0, Math.min(1, targetProgressRef.current));
      currentProgressRef.current += (targetP - currentProgressRef.current) * 0.09;
      const t = currentProgressRef.current;

      // Position camera along CatmullRomCurve3
      const camPos = curve.getPointAt(t);
      camera.position.set(camPos.x, camPos.y + 0.25, camPos.z);

      // Look slightly ahead along the curve for natural corridor navigation
      const lookAtT = Math.min(1, t + 0.06);
      const lookAtPos = curve.getPointAt(lookAtT);
      camera.lookAt(lookAtPos.x, lookAtPos.y, lookAtPos.z);

      // Update dynamic camera light position
      cameraLight.position.set(camPos.x, camPos.y + 1.5, camPos.z - 2);

      // Subtle particle float
      particles.rotation.y += 0.0005;

      // Calculate which milestone or plane is closest to camera
      if (type === 'photo-gallery' && galleryPlanes.length > 0) {
        let bestIdx = 0;
        let minDiff = 999;
        galleryPlanes.forEach((p, idx) => {
          const diff = Math.abs(p.tPosition - t);
          if (diff < minDiff) {
            minDiff = diff;
            bestIdx = idx;
          }
        });
        setActiveItemIndex(bestIdx);
        onActiveIndexChange?.(bestIdx);
      } else if (type === 'career-pathway' && milestones.length > 0) {
        let bestIdx = 0;
        let minDiff = 999;
        milestones.forEach((m, idx) => {
          const diff = Math.abs(m.tPosition - t);
          if (diff < minDiff) {
            minDiff = diff;
            bestIdx = idx;
          }
        });
        setActiveItemIndex(bestIdx);
        onActiveIndexChange?.(bestIdx);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize Observer for responsive canvas
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, [curve, galleryPlanes, milestones, onActiveIndexChange, type]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
    </div>
  );
};
