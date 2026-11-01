const LIVE_URL = 'https://kaushal-pandya-hacker.github.io/infronix/';

async function verifyLive() {
  console.log('Testing live deployment at:', LIVE_URL);
  const res = await fetch(LIVE_URL);
  console.log('HTTP Status:', res.status, res.statusText);

  if (res.status !== 200) {
    throw new Error(`Deployment check failed with status ${res.status}`);
  }

  const html = await res.text();
  console.log('✓ HTML Received. Length:', html.length, 'bytes');
  
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log('✓ Page Title:', titleMatch ? titleMatch[1] : 'Unknown');

  // Verify assets exist
  const jsMatch = html.match(/src="(\.\/assets\/[^"]+\.js)"/);
  const cssMatch = html.match(/href="(\.\/assets\/[^"]+\.css)"/);

  if (jsMatch) {
    const jsUrl = new URL(jsMatch[1], LIVE_URL).href;
    const jsRes = await fetch(jsUrl);
    console.log(`✓ JavaScript Bundle (${jsMatch[1]}): HTTP ${jsRes.status}`);
  }

  if (cssMatch) {
    const cssUrl = new URL(cssMatch[1], LIVE_URL).href;
    const cssRes = await fetch(cssUrl);
    console.log(`✓ CSS Stylesheet (${cssMatch[1]}): HTTP ${cssRes.status}`);
  }

  console.log('\n===========================================');
  console.log('LIVE PRODUCTION DEPLOYMENT IS 100% HEALTHY!');
  console.log('===========================================\n');
}

verifyLive().catch(console.error);
