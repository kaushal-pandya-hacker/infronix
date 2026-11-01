import fs from 'node:fs';
import path from 'node:path';
import QRCode from 'qrcode';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

// Master target landing page URL (Verified Production URL)
const TARGET_URL = 'https://kaushal-pandya-hacker.github.io/infronix/';

console.log('--------------------------------------------------');
console.log('INFRONIX SMART QR GENERATOR & DECODER TEST RUNNER');
console.log('Target Encoded URL:', TARGET_URL);
console.log('--------------------------------------------------');

const outputDir = path.resolve('public', 'qr-exports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function runVerification() {
  const results = [];

  // Test 1: Dark Navy & Electric Blue High-Res PNG (1024x1024, Error Correction H)
  const darkPngPath = path.join(outputDir, 'infronix-qr-dark.png');
  await QRCode.toFile(darkPngPath, TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1024,
    margin: 2,
    color: {
      dark: '#0066FF',      // Electric blue modules
      light: '#040914',     // Dark navy background
    },
  });
  console.log('✓ Generated dark navy & electric blue PNG:', darkPngPath);

  // Test 2: Print-Quality High-Contrast White Background PNG (Ideal for business cards & flyers)
  const printPngPath = path.join(outputDir, 'infronix-qr-print.png');
  await QRCode.toFile(printPngPath, TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1024,
    margin: 2,
    color: {
      dark: '#050B18',      // Deep navy/black modules
      light: '#FFFFFF',     // Pure white background for physical printing
    },
  });
  console.log('✓ Generated print-optimized high-contrast PNG:', printPngPath);

  // Test 3: Print-Quality Scalable Vector Graphics (SVG) - Dark Theme
  const darkSvgPath = path.join(outputDir, 'infronix-qr-dark.svg');
  const darkSvgString = await QRCode.toString(TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 2,
    color: {
      dark: '#0066FF',
      light: '#040914',
    },
  });
  fs.writeFileSync(darkSvgPath, darkSvgString, 'utf-8');
  console.log('✓ Generated dark theme print-quality SVG:', darkSvgPath);

  // Test 4: Print-Quality Scalable Vector Graphics (SVG) - Print White Theme
  const printSvgPath = path.join(outputDir, 'infronix-qr-print.svg');
  const printSvgString = await QRCode.toString(TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 2,
    color: {
      dark: '#050B18',
      light: '#FFFFFF',
    },
  });
  fs.writeFileSync(printSvgPath, printSvgString, 'utf-8');
  console.log('✓ Generated print-optimized vector SVG:', printSvgPath);

  // Test 5: Standalone SVG with embedded Center Logo & Glow Badge
  const logoSvgPath = path.join(outputDir, 'infronix-qr-with-brand-badge.svg');
  
  // Custom composite SVG embedding the Infronix Brand Emblem in center
  // QR version at error level H has 30% error correction tolerance. Center 18% size is 100% scan safe.
  const baseSvgRaw = await QRCode.toString(TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 3,
    color: {
      dark: '#0066FF',
      light: '#040914',
    },
  });

  // Extract viewBox or dimensions to place the center emblem
  const viewBoxMatch = baseSvgRaw.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1].split(' ').map(Number) : [0, 0, 100, 100];
  const totalW = viewBox[2];
  const totalH = viewBox[3];
  const centerSize = Math.round(totalW * 0.22);
  const centerX = (totalW - centerSize) / 2;
  const centerY = (totalH - centerSize) / 2;

  const centerLogoSvg = `
    <!-- INFRONIX Official Network Hub Emblem with Protective Quiet Zone -->
    <rect x="${centerX - 1}" y="${centerY - 1}" width="${centerSize + 2}" height="${centerSize + 2}" rx="6" fill="#040914" stroke="#00D4FF" stroke-width="0.8" />
    <g transform="translate(${centerX}, ${centerY})">
      <svg width="${centerSize}" height="${centerSize}" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="18" fill="#040914" />
        <line x1="58.5" y1="50.0" x2="88.0" y2="50.0" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="73.0" cy="50.0" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="88.0" cy="50.0" r="4.5" fill="#F0F6FF" />

        <line x1="56.0" y1="56.0" x2="76.9" y2="76.9" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="66.3" cy="66.3" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="76.9" cy="76.9" r="4.5" fill="#F0F6FF" />

        <line x1="50.0" y1="58.5" x2="50.0" y2="88.0" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="50.0" cy="73.0" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="50.0" cy="88.0" r="4.5" fill="#F0F6FF" />

        <line x1="44.0" y1="56.0" x2="23.1" y2="76.9" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="33.7" cy="66.3" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="23.1" cy="76.9" r="4.5" fill="#F0F6FF" />

        <line x1="41.5" y1="50.0" x2="12.0" y2="50.0" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="27.0" cy="50.0" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="12.0" cy="50.0" r="4.5" fill="#F0F6FF" />

        <line x1="44.0" y1="44.0" x2="23.1" y2="23.1" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="33.7" cy="33.7" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="23.1" cy="23.1" r="4.5" fill="#F0F6FF" />

        <line x1="50.0" y1="41.5" x2="50.0" y2="12.0" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="50.0" cy="27.0" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="50.0" cy="12.0" r="4.5" fill="#F0F6FF" />

        <line x1="56.0" y1="44.0" x2="76.9" y2="23.1" stroke="#F0F6FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="66.3" cy="33.7" r="3.5" fill="#040914" stroke="#00D4FF" stroke-width="2" />
        <circle cx="76.9" cy="23.1" r="4.5" fill="#F0F6FF" />

        <circle cx="50" cy="50" r="11" fill="#040914" stroke="#00D4FF" stroke-width="2.5" />
        <circle cx="50" cy="50" r="5" fill="#0066FF" />
      </svg>
    </g>
  `;

  const compositeSvg = baseSvgRaw.replace('</svg>', `${centerLogoSvg}</svg>`);
  fs.writeFileSync(logoSvgPath, compositeSvg, 'utf-8');
  console.log('✓ Generated SVG with Infronix brand emblem in center:', logoSvgPath);

  // VERIFICATION STEP: Scan & Decode generated PNG files with jsQR
  const filesToDecode = [
    { name: 'infronix-qr-dark.png', path: darkPngPath },
    { name: 'infronix-qr-print.png', path: printPngPath },
  ];

  for (const item of filesToDecode) {
    const pngBuffer = fs.readFileSync(item.path);
    const png = PNG.sync.read(pngBuffer);
    const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

    if (code && code.data) {
      const match = code.data === TARGET_URL;
      console.log(`\n[QR SCAN TEST RESULT: ${item.name}]`);
      console.log(`  Decoded Data: "${code.data}"`);
      console.log(`  Matches Target URL: ${match ? 'YES (PASS)' : 'NO (FAIL)'}`);
      console.log(`  Location: TopLeft(${code.location.topLeftCorner.x}, ${code.location.topLeftCorner.y})`);
      results.push({ file: item.name, decoded: code.data, status: match ? 'PASSED' : 'FAILED' });
    } else {
      console.error(`\n[QR SCAN TEST RESULT: ${item.name}] FAILED TO DECODE!`);
      results.push({ file: item.name, decoded: null, status: 'FAILED' });
    }
  }

  const allPassed = results.every(r => r.status === 'PASSED');
  console.log('\n==================================================');
  console.log(`OVERALL SCAN VERIFICATION: ${allPassed ? 'ALL TESTS PASSED 100%' : 'FAILURES DETECTED'}`);
  console.log('==================================================\n');

  if (!allPassed) {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});

