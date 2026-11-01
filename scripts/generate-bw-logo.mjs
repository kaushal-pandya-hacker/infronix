import fs from 'node:fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const jpegData = fs.readFileSync('public/infronix-official-logo.jpg');
const rawImage = jpeg.decode(jpegData, { useTArray: true });

const w = rawImage.width;
const h = rawImage.height;

// Pure Black & White / Monochrome Logo (Crisp white on transparent background)
const bwPng = new PNG({ width: w, height: h });

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = (w * y + x) << 2;
    const r = rawImage.data[idx];
    const g = rawImage.data[idx + 1];
    const b = rawImage.data[idx + 2];

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness > 238) {
      // Background: transparent
      bwPng.data[idx] = 0;
      bwPng.data[idx + 1] = 0;
      bwPng.data[idx + 2] = 0;
      bwPng.data[idx + 3] = 0;
    } else {
      // Calculate anti-aliasing alpha
      const alpha = Math.min(255, Math.max(0, Math.round((255 - brightness) * 1.6)));
      
      // Pure crisp white / silver
      bwPng.data[idx] = 255;
      bwPng.data[idx + 1] = 255;
      bwPng.data[idx + 2] = 255;
      bwPng.data[idx + 3] = alpha;
    }
  }
}

fs.writeFileSync('public/infronix-logo-bw.png', PNG.sync.write(bwPng));
fs.copyFileSync('public/infronix-logo-bw.png', 'src/assets/infronix-logo-bw.png');
console.log('✓ Created public/infronix-logo-bw.png (Pure Black & White Monochrome)');
