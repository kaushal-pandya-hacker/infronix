import { execSync } from 'node:child_process';

const input = 'protocol=https\nhost=github.com\n\n';
const out = execSync('git credential fill', { input, encoding: 'utf-8' });
const token = out.split('\n').find(l => l.startsWith('password=')).replace('password=', '').trim();

async function enablePages() {
  console.log('Enabling GitHub Pages on kaushal-pandya-hacker/infronix...');
  const res = await fetch('https://api.github.com/repos/kaushal-pandya-hacker/infronix/pages', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'User-Agent': 'Infronix-Deployer',
      'Accept': 'application/vnd.github+json',
    },
    body: JSON.stringify({
      source: {
        branch: 'gh-pages',
        path: '/',
      },
    }),
  });

  const data = await res.json();
  console.log('Response status:', res.status);
  console.log('Data:', data);

  // Check Pages status
  const pageRes = await fetch('https://api.github.com/repos/kaushal-pandya-hacker/infronix/pages', {
    headers: {
      'Authorization': 'Bearer ' + token,
      'User-Agent': 'Infronix-Deployer',
      'Accept': 'application/vnd.github+json',
    },
  });
  const pageData = await pageRes.json();
  console.log('Pages URL:', pageData.html_url);
}

enablePages().catch(console.error);

