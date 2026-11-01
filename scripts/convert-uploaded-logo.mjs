import fs from 'node:fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const jpegData = fs.readFileSync('public/infronix-logo.jpg');
const rawImage = jpeg.decode(jpegData, { useTArray: true });

const png = new PNG({ width: rawImage.width, height: rawImage.height });
for (let i = 0; i < rawImage.data.length; i += 4) {
  png.data[i] = rawImage.data[i];
  png.data[i + 1] = rawImage.data[i + 1];
  png.data[i + 2] = rawImage.data[i + 2];
  png.data[i + 3] = 255;
}

fs.writeFileSync('public/infronix-logo.png', PNG.sync.write(png));
fs.copyFileSync('public/infronix-logo.png', 'src/assets/infronix-logo.png');
console.log('✓ Created lossless public/infronix-logo.png from uploaded logo');
