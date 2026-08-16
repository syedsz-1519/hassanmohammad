import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle drifting orbs for soft mesh gradient
    const orbs = [
      { x: width * 0.25, y: height * 0.35, vx: 0.18, vy: 0.12, r: 280, color: 'rgba(15, 98, 254, 0.055)' },
      { x: width * 0.75, y: height * 0.65, vx: -0.15, vy: -0.18, r: 320, color: 'rgba(0, 163, 137, 0.045)' },
      { x: width * 0.5, y: height * 0.2, vx: 0.12, vy: -0.14, r: 240, color: 'rgba(95, 168, 255, 0.05)' },
      { x: width * 0.85, y: height * 0.25, vx: -0.1, vy: 0.15, r: 260, color: 'rgba(95, 217, 190, 0.04)' }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw each drifting gradient orb
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently inside viewport bounds
        if (orb.x < -orb.r * 0.5 || orb.x > width + orb.r * 0.5) orb.vx *= -1;
        if (orb.y < -orb.r * 0.5 || orb.y > height + orb.r * 0.5) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-100"
      style={{ filter: 'blur(40px)' }}
    />
  );
};
