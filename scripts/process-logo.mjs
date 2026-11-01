import fs from 'node:fs';
import path from 'node:path';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const jpegData = fs.readFileSync('public/infronix-official-logo.jpg');
const rawImage = jpeg.decode(jpegData, { useTArray: true });

console.log('Decoded JPEG:', rawImage.width, 'x', rawImage.height);

const w = rawImage.width;
const h = rawImage.height;

// 1. Generate Dark-Theme Optimized PNG: White letters, glowing cyan dots, transparent background
const darkThemePng = new PNG({ width: w, height: h });

// 2. Generate Original Colors Transparent PNG: Dark letters, cyan dots, transparent background
const originalPng = new PNG({ width: w, height: h });

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = (w * y + x) << 2;
    const r = rawImage.data[idx];
    const g = rawImage.data[idx + 1];
    const b = rawImage.data[idx + 2];

    // Detect if this is background (close to white / light gray > 230)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Check if pixel is the cyan / teal dot (high G/B, lower R)
    // In the image, the teal dot is around r: 0-50, g: 190-210, b: 180-210
    const isTeal = (g > 140 && b > 140 && r < 100);

    if (brightness > 238 && !isTeal) {
      // Pure transparent background
      darkThemePng.data[idx] = 0;
      darkThemePng.data[idx + 1] = 0;
      darkThemePng.data[idx + 2] = 0;
      darkThemePng.data[idx + 3] = 0;

      originalPng.data[idx] = 0;
      originalPng.data[idx + 1] = 0;
      originalPng.data[idx + 2] = 0;
      originalPng.data[idx + 3] = 0;
    } else {
      // Calculate anti-aliasing alpha
      const alpha = Math.min(255, Math.max(0, Math.round((255 - brightness) * 1.5)));

      if (isTeal) {
        // Boost teal / cyan neon glow
        darkThemePng.data[idx] = 0;       // Red
        darkThemePng.data[idx + 1] = 225; // Green
        darkThemePng.data[idx + 2] = 240; // Blue
        darkThemePng.data[idx + 3] = 255; // Solid

        originalPng.data[idx] = r;
        originalPng.data[idx + 1] = g;
        originalPng.data[idx + 2] = b;
        originalPng.data[idx + 3] = 255;
      } else {
        // Text / Black elements
        // For dark theme: pure white / bright silver with smooth anti-aliased edges
        darkThemePng.data[idx] = 240;
        darkThemePng.data[idx + 1] = 246;
        darkThemePng.data[idx + 2] = 255;
        darkThemePng.data[idx + 3] = alpha;

        // For original: preserve dark tone
        originalPng.data[idx] = r;
        originalPng.data[idx + 1] = g;
        originalPng.data[idx + 2] = b;
        originalPng.data[idx + 3] = alpha;
      }
    }
  }
}

fs.writeFileSync('public/infronix-logo-dark-theme.png', PNG.sync.write(darkThemePng));
fs.writeFileSync('public/infronix-logo-original.png', PNG.sync.write(originalPng));
console.log('✓ Created public/infronix-logo-dark-theme.png');
console.log('✓ Created public/infronix-logo-original.png');

// 3. Extract the iconic radial node mark (the circular tech symbol on the left)
// In the 1024x241 image, the radial emblem is roughly in the left square (x: 0 to 180, y: 0 to 180)
const iconSize = 180;
const iconPng = new PNG({ width: iconSize, height: iconSize });

// Find vertical center of the emblem
const startX = 2;
const startY = 12;

for (let y = 0; y < iconSize; y++) {
  for (let x = 0; x < iconSize; x++) {
    const srcX = startX + x;
    const srcY = startY + y;
    const srcIdx = (w * srcY + srcX) << 2;
    const destIdx = (iconSize * y + x) << 2;

    darkThemePng.data[srcIdx] ? null : null;
    iconPng.data[destIdx] = darkThemePng.data[srcIdx];
    iconPng.data[destIdx + 1] = darkThemePng.data[srcIdx + 1];
    iconPng.data[destIdx + 2] = darkThemePng.data[srcIdx + 2];
    iconPng.data[destIdx + 3] = darkThemePng.data[srcIdx + 3];
  }
}

fs.writeFileSync('public/infronix-emblem-dark.png', PNG.sync.write(iconPng));
console.log('✓ Created public/infronix-emblem-dark.png (Radial Node Mark)');
