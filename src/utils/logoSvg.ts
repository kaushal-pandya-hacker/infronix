/**
 * Official Infronix Network Hub Vector SVG for QR Code Center Embedding
 */
export const getInfronixLogoSvg = (size = 120): string => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="qr-hub-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#040914" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="#040914" stroke="#00D4FF" stroke-width="3" />
  <circle cx="50" cy="50" r="44" fill="url(#qr-hub-glow)" />
  
  <!-- 8 Radial Spokes -->
  <line x1="58.50" y1="50.00" x2="88.00" y2="50.00" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="73.00" cy="50.00" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="88.00" cy="50.00" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <line x1="56.01" y1="56.01" x2="76.87" y2="76.87" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="66.27" cy="66.27" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="76.87" cy="76.87" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <line x1="50.00" y1="58.50" x2="50.00" y2="88.00" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="50.00" cy="73.00" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="50.00" cy="88.00" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <line x1="43.99" y1="56.01" x2="23.13" y2="76.87" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="33.73" cy="66.27" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="23.13" cy="76.87" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <line x1="41.50" y1="50.00" x2="12.00" y2="50.00" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="27.00" cy="50.00" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="12.00" cy="50.00" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <line x1="43.99" y1="43.99" x2="23.13" y2="23.13" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="33.73" cy="33.73" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="23.13" cy="23.13" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <line x1="50.00" y1="41.50" x2="50.00" y2="12.00" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="50.00" cy="27.00" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="50.00" cy="12.00" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <line x1="56.01" y1="43.99" x2="76.87" y2="23.13" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="66.27" cy="33.73" r="3.2" fill="#040914" stroke="#00D4FF" stroke-width="2" />
  <circle cx="76.87" cy="23.13" r="4.2" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />

  <!-- Center Hub Node -->
  <circle cx="50" cy="50" r="11" fill="#040914" stroke="#00D4FF" stroke-width="2.5" />
  <circle cx="50" cy="50" r="5" fill="#0066FF" />
</svg>`;
};

export const getInfronixLogoDataUri = (): string => {
  const svg = getInfronixLogoSvg(140);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
