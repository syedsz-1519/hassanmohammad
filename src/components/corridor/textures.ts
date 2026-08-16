import * as THREE from 'three';

/**
 * Procedural texture generator for clean white and glassmorphic 3D gallery frames
 * High-definition canvas rendering with frosted glass gradients, sapphire accents, and crisp navy typography
 */
export function createWhiteGlassFrameTexture(
  title: string,
  subtitle: string,
  placeholderLabel: string,
  badgeText: string,
  accentColor: string,
  summaryExcerpt?: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Crisp Frosted White Glass Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 720);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.5, '#F8FAFC');
  bgGrad.addColorStop(1, '#F1F5F9');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 720);

  // Outer Crisp Glass Glow Border
  ctx.lineWidth = 10;
  ctx.strokeStyle = accentColor;
  ctx.strokeRect(8, 8, 1008, 704);

  // Inner Frosted Border
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.8)';
  ctx.strokeRect(24, 24, 976, 672);

  // Top Glass Header Bar
  const headerGrad = ctx.createLinearGradient(28, 28, 996, 28);
  headerGrad.addColorStop(0, 'rgba(15, 98, 254, 0.08)');
  headerGrad.addColorStop(1, 'rgba(56, 189, 248, 0.05)');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(28, 28, 968, 68);

  // Badge Pill with vibrant accent
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.roundRect(46, 42, 190, 40, 20);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px "SF Mono", "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(badgeText, 141, 67);

  // Archive Identifier on the right
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 15px "SF Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('EXPERIENCE ARCHIVE // DEEP 3D VIEW', 960, 67);

  // Central Image Placeholder / Media Plate Box (Frosted Glass Well)
  const innerWellGrad = ctx.createLinearGradient(46, 114, 46, 454);
  innerWellGrad.addColorStop(0, '#F8FAFC');
  innerWellGrad.addColorStop(1, '#EEF2F6');
  ctx.fillStyle = innerWellGrad;
  ctx.beginPath();
  ctx.roundRect(46, 114, 932, 340, 16);
  ctx.fill();

  // Subtle dashed border for image placement
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.strokeStyle = 'rgba(15, 98, 254, 0.35)';
  ctx.strokeRect(46, 114, 932, 340);
  ctx.setLineDash([]); // reset

  // Central Photo / Architecture Label
  ctx.fillStyle = '#0F62FE';
  ctx.font = 'bold 34px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(placeholderLabel, 512, 270);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 18px "SF Mono", monospace';
  ctx.fillText('GLASSMORPHIC PHOTO PLANE // CLICK TO FOCUS', 512, 315);

  // Bottom Content Section: Title & Subtitle
  ctx.fillStyle = '#0B1220';
  ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(title, 50, 500);

  ctx.fillStyle = '#475569';
  ctx.font = '22px system-ui, -apple-system, sans-serif';
  ctx.fillText(subtitle, 50, 545);

  // Summary Excerpt (if provided)
  if (summaryExcerpt) {
    ctx.fillStyle = '#1E293B';
    ctx.font = '500 18px system-ui, -apple-system, sans-serif';
    ctx.fillText(summaryExcerpt, 50, 595);
  }

  // Bottom Status Bar
  ctx.fillStyle = 'rgba(15, 98, 254, 0.06)';
  ctx.fillRect(28, 640, 968, 56);

  ctx.fillStyle = accentColor;
  ctx.font = 'bold 15px "SF Mono", monospace';
  ctx.fillText('● EXPERIENCE LAYER ANCHORED', 50, 674);

  ctx.fillStyle = '#64748B';
  ctx.font = '14px "SF Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('SCROLL FORWARD TO DIVE DEEPER', 960, 674);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Clean White & Frosted Glass Floor Grid Texture
 * High-end architectural grid with soft azure perspective guides
 */
export function createWhiteGlassFloorGridTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Crisp white/light-slate floor base
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, 512, 512);

  // Soft grid lines
  ctx.strokeStyle = 'rgba(15, 98, 254, 0.12)';
  ctx.lineWidth = 2;

  for (let x = 0; x <= 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  for (let y = 0; y <= 512; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Center guideline
  ctx.strokeStyle = 'rgba(15, 98, 254, 0.3)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 24);
  return texture;
}

// Keep legacy export for backward compatibility
export const createGalleryFrameTexture = createWhiteGlassFrameTexture;
export const createFloorGridTexture = createWhiteGlassFloorGridTexture;

