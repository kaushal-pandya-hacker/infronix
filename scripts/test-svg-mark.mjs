// Generate exact vector SVG for the Infronix Network Hub Icon
function generateInfronixNetworkMarkSvg(size = 100) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const cx = 50;
  const cy = 50;
  const rInner = 8.5;
  const rMid = 24;
  const rOuter = 40;
  const nodeInnerR = 3.2;
  const nodeOuterR = 4.2;

  let spokesSvg = '';
  for (const deg of angles) {
    const rad = (deg * Math.PI) / 180;
    const x1 = cx + rInner * Math.cos(rad);
    const y1 = cy + rInner * Math.sin(rad);
    const x2 = cx + rOuter * Math.cos(rad);
    const y2 = cy + rOuter * Math.sin(rad);

    const xMid = cx + rMid * Math.cos(rad);
    const yMid = cy + rMid * Math.sin(rad);

    // Spoke line
    spokesSvg += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="#F0F6FF" stroke-width="2.6" stroke-linecap="round" />\n`;
    // Middle node
    spokesSvg += `<circle cx="${xMid.toFixed(2)}" cy="${yMid.toFixed(2)}" r="${nodeInnerR}" fill="#040914" stroke="#00D4FF" stroke-width="2" />\n`;
    // Outer node
    spokesSvg += `<circle cx="${x2.toFixed(2)}" cy="${y2.toFixed(2)}" r="${nodeOuterR}" fill="#F0F6FF" stroke="#0066FF" stroke-width="1.8" />\n`;
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="infronix-hub-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#0066FF" stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="48" fill="url(#infronix-hub-glow)" />
  ${spokesSvg}
  <!-- Central Hub -->
  <circle cx="50" cy="50" r="10.5" fill="#040914" stroke="#00D4FF" stroke-width="2.5" />
  <circle cx="50" cy="50" r="5" fill="#0066FF" />
</svg>`;
}

console.log(generateInfronixNetworkMarkSvg(80));

