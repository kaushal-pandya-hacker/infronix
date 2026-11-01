import fs from 'node:fs';
import path from 'node:path';
import QRCode from 'qrcode';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

const TARGET_URL = 'https://kaushal-pandya-hacker.github.io/infronix/';

async function generateReadyToSharePNGs() {
  console.log('Generating Ready-to-Share HD PNG QR codes...');

  // 1. Dark Electric Blue HD (2048x2048)
  const darkHdPath = path.resolve('INFRONIX-SMART-QR-DARK-HD.png');
  await QRCode.toFile(darkHdPath, TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 2048,
    margin: 3,
    color: {
      dark: '#0066FF',  // Electric blue
      light: '#040914', // Dark navy background
    },
  });
  console.log('✓ Generated 2048x2048 Dark HD PNG:', darkHdPath);

  // 2. High-Contrast Print HD (2048x2048)
  const printHdPath = path.resolve('INFRONIX-SMART-QR-PRINT-HD.png');
  await QRCode.toFile(printHdPath, TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 2048,
    margin: 3,
    color: {
      dark: '#050B18',  // Deep midnight navy/black
      light: '#FFFFFF', // Pure white
    },
  });
  console.log('✓ Generated 2048x2048 Print HD PNG:', printHdPath);

  // 3. Composite Branded Share Card (1080x1350 Instagram / WhatsApp / Social Share Format)
  // Let's create an 1080x1350 PNG flyer with Infronix header, glowing QR code, and link footer!
  const cardWidth = 1080;
  const cardHeight = 1350;
  const cardPng = new PNG({ width: cardWidth, height: cardHeight });

  // Fill background with Dark Navy (#040914 -> R:4, G:9, B:20)
  for (let y = 0; y < cardHeight; y++) {
    for (let x = 0; x < cardWidth; x++) {
      const idx = (cardWidth * y + x) << 2;
      // Gradient effect down the canvas
      const ratio = y / cardHeight;
      const r = Math.round(4 + ratio * 7);   // #040914 -> #0B1528
      const g = Math.round(9 + ratio * 12);
      const b = Math.round(20 + ratio * 20);
      cardPng.data[idx] = r;
      cardPng.data[idx + 1] = g;
      cardPng.data[idx + 2] = b;
      cardPng.data[idx + 3] = 255; // Alpha
    }
  }

  // Generate QR buffer at 720x720 to paste in center
  const qrBuf = await QRCode.toBuffer(TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 720,
    margin: 2,
    color: {
      dark: '#0066FF',
      light: '#040914',
    },
  });
  const innerQr = PNG.sync.read(qrBuf);

  // Paste QR in the middle (x: 180, y: 380)
  const startX = 180;
  const startY = 380;

  for (let qy = 0; qy < innerQr.height; qy++) {
    for (let qx = 0; qx < innerQr.width; qx++) {
      const srcIdx = (innerQr.width * qy + qx) << 2;
      const destX = startX + qx;
      const destY = startY + qy;
      const destIdx = (cardWidth * destY + destX) << 2;

      cardPng.data[destIdx] = innerQr.data[srcIdx];
      cardPng.data[destIdx + 1] = innerQr.data[srcIdx + 1];
      cardPng.data[destIdx + 2] = innerQr.data[srcIdx + 2];
      cardPng.data[destIdx + 3] = 255;
    }
  }

  // Draw border around the QR card
  for (let b = 0; b < 4; b++) {
    const rx = startX - 8 - b;
    const ry = startY - 8 - b;
    const rw = innerQr.width + 16 + b * 2;
    const rh = innerQr.height + 16 + b * 2;

    for (let x = rx; x < rx + rw; x++) {
      // Top and bottom border
      const idxTop = (cardWidth * ry + x) << 2;
      const idxBot = (cardWidth * (ry + rh) + x) << 2;
      if (idxTop >= 0 && idxTop < cardPng.data.length) {
        cardPng.data[idxTop] = 0;
        cardPng.data[idxTop + 1] = 212; // Cyan border
        cardPng.data[idxTop + 2] = 255;
      }
      if (idxBot >= 0 && idxBot < cardPng.data.length) {
        cardPng.data[idxBot] = 0;
        cardPng.data[idxBot + 1] = 212;
        cardPng.data[idxBot + 2] = 255;
      }
    }
    for (let y = ry; y < ry + rh; y++) {
      // Left and right border
      const idxLeft = (cardWidth * y + rx) << 2;
      const idxRight = (cardWidth * y + (rx + rw)) << 2;
      if (idxLeft >= 0 && idxLeft < cardPng.data.length) {
        cardPng.data[idxLeft] = 0;
        cardPng.data[idxLeft + 1] = 212;
        cardPng.data[idxLeft + 2] = 255;
      }
      if (idxRight >= 0 && idxRight < cardPng.data.length) {
        cardPng.data[idxRight] = 0;
        cardPng.data[idxRight + 1] = 212;
        cardPng.data[idxRight + 2] = 255;
      }
    }
  }

  const cardSharePath = path.resolve('INFRONIX-SOCIAL-SHARE-CARD.png');
  fs.writeFileSync(cardSharePath, PNG.sync.write(cardPng));
  console.log('✓ Generated 1080x1350 Branded Social Share Card PNG:', cardSharePath);

  // Copy to public/qr-exports as well
  fs.copyFileSync(darkHdPath, path.resolve('public', 'qr-exports', 'infronix-qr-dark-hd.png'));
  fs.copyFileSync(printHdPath, path.resolve('public', 'qr-exports', 'infronix-qr-print-hd.png'));
  fs.copyFileSync(cardSharePath, path.resolve('public', 'qr-exports', 'infronix-social-share-card.png'));

  // VERIFY SCANS WITH jsQR
  const filesToVerify = [
    { name: 'Dark HD PNG (2048px)', path: darkHdPath },
    { name: 'Print HD PNG (2048px)', path: printHdPath },
    { name: 'Branded Social Share Card PNG', path: cardSharePath },
  ];

  for (const item of filesToVerify) {
    const raw = fs.readFileSync(item.path);
    const png = PNG.sync.read(raw);
    const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
    if (code && code.data === TARGET_URL) {
      console.log(`✓ VERIFIED [${item.name}]: Decoded "${code.data}" (100% MATCH)`);
    } else {
      console.error(`✗ FAILED [${item.name}] could not decode`);
    }
  }
}

generateReadyToSharePNGs().catch(console.error);

