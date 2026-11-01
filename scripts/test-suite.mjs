import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

console.log('====================================================');
console.log('      INFRONIX PRODUCTION AUDIT & VERIFICATION       ');
console.log('====================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
  }
}

// 1. Verify siteConfig specifications
const siteConfigRaw = fs.readFileSync(path.resolve('src/config/siteConfig.ts'), 'utf-8');

console.log('--- 1. BRAND & SPECIFICATION AUDIT ---');
assert(siteConfigRaw.includes("name: 'INFRONIX WEB AGENCY'"), 'Brand name matches "INFRONIX WEB AGENCY"');
assert(siteConfigRaw.includes("headline: \"Let's Connect.\""), 'Headline matches "Let\'s Connect."');
assert(siteConfigRaw.includes("subtitle: 'Explore our digital presence and discover what we create.'"), 'Subtitle matches exact string');
assert(siteConfigRaw.includes("https://www.infronixweb.in/"), 'Website URL matches "https://www.infronixweb.in/"');
assert(siteConfigRaw.includes("https://www.instagram.com/infronixwebagency2026?vrfl=ODdvZ3l6N3d1Z3F2"), 'Instagram URL matches exact tracking URL');
assert(siteConfigRaw.includes("errorCorrectionLevel: 'H'"), 'QR Error Correction Level set to High (H)');

// 2. Verify Landing Page Components & Button Labels
console.log('\n--- 2. LANDING PAGE CONTENT & BUTTON AUDIT ---');
const landingPageRaw = fs.readFileSync(path.resolve('src/components/LandingPage.tsx'), 'utf-8');
assert(landingPageRaw.includes('VISIT OUR WEBSITE'), 'Button 1 text contains "VISIT OUR WEBSITE"');
assert(landingPageRaw.includes('FOLLOW ON INSTAGRAM'), 'Button 2 text contains "FOLLOW ON INSTAGRAM"');
assert(landingPageRaw.includes('siteConfig.websiteUrl'), 'Button 1 links to siteConfig.websiteUrl');
assert(landingPageRaw.includes('siteConfig.instagramUrl'), 'Button 2 links to siteConfig.instagramUrl');
assert(landingPageRaw.includes('rel="noopener noreferrer"'), 'External links have secure noopener noreferrer rel');

// 3. Verify White-Label Compliance
console.log('\n--- 3. WHITE-LABEL COMPLIANCE AUDIT ---');
const distHtml = fs.readFileSync(path.resolve('dist/index.html'), 'utf-8');
assert(!distHtml.includes('qr-code-generator.com'), 'Zero 3rd-party QR generator attribution in build');
assert(!distHtml.includes('bit.ly') && !distHtml.includes('tinyurl'), 'Zero intermediate redirect domains');
assert(!distHtml.includes('google-analytics') && !distHtml.includes('gtag'), 'Zero non-consensual tracking scripts');

// 4. Verify Built Files & QR Assets
console.log('\n--- 4. PRODUCTION BUILD ARTIFACTS AUDIT ---');
const requiredFiles = [
  'dist/index.html',
  'dist/favicon.svg',
  'dist/qr-exports/infronix-qr-dark.png',
  'dist/qr-exports/infronix-qr-print.png',
  'dist/qr-exports/infronix-qr-dark.svg',
  'dist/qr-exports/infronix-qr-print.svg',
  'dist/qr-exports/infronix-qr-with-brand-badge.svg',
];

for (const file of requiredFiles) {
  const exists = fs.existsSync(path.resolve(file));
  assert(exists, `Required artifact exists: ${file}`);
}

// 5. Verify QR Decoding with jsQR
console.log('\n--- 5. COMPUTER VISION QR DECODER AUDIT ---');
const qrFilesToDecode = [
  { name: 'Dark Navy & Electric Blue PNG', path: 'dist/qr-exports/infronix-qr-dark.png' },
  { name: 'Print White High-Contrast PNG', path: 'dist/qr-exports/infronix-qr-print.png' },
];

for (const item of qrFilesToDecode) {
  const buf = fs.readFileSync(path.resolve(item.path));
  const png = PNG.sync.read(buf);
  const qr = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

  assert(qr !== null && qr.data.length > 0, `${item.name} decoded by computer vision`);
  assert(qr.data === 'https://infronix-connect.vercel.app', `${item.name} payload matches landing page URL strictly`);
  assert(!qr.data.includes('instagram.com') && !qr.data.includes('infronixweb.in/'), `${item.name} correctly encodes landing page URL rather than individual links`);
}

console.log('\n====================================================');
console.log(`TOTAL AUDIT CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${totalChecks - passedChecks}`);
console.log(`AUDIT RESULT: ${passedChecks === totalChecks ? '100% PRODUCTION READY' : 'AUDIT FAILED'}`);
console.log('====================================================\n');

if (passedChecks !== totalChecks) {
  process.exit(1);
}
