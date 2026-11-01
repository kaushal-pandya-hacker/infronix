/**
 * Clean vector SVG string used for embedding into QR codes and exporting
 */
export const getInfronixLogoSvg = (size = 120): string => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="qr-infronix-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#0066FF" />
    </linearGradient>
    <linearGradient id="qr-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040914" />
      <stop offset="100%" stop-color="#0B162C" />
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="92" height="92" rx="20" fill="url(#qr-bg-grad)" stroke="#00F0FF" stroke-width="3" />
  <path d="M30 28 H40 V72 H30 Z" fill="url(#qr-infronix-grad)" />
  <path d="M48 30 L66 70 H56 L44 42 Z" fill="#00D4FF" />
  <path d="M66 30 L48 70 H58 L72 38 Z" fill="url(#qr-infronix-grad)" />
  <circle cx="56" cy="50" r="3.5" fill="#FFFFFF" />
</svg>`;
};

export const getInfronixLogoDataUri = (): string => {
  const svg = getInfronixLogoSvg(140);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

