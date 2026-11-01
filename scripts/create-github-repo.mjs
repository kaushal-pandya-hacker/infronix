import { execSync } from 'node:child_process';

const input = 'protocol=https\nhost=github.com\n\n';
const out = execSync('git credential fill', { input, encoding: 'utf-8' });
const token = out.split('\n').find(l => l.startsWith('password=')).replace('password=', '').trim();

async function createRepo() {
  console.log('Creating GitHub repository "infronix" for kaushal-pandya-hacker...');
  const res = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'User-Agent': 'Infronix-Deployer',
    },
    body: JSON.stringify({
      name: 'infronix',
      description: 'INFRONIX WEB AGENCY — Smart QR Landing Page & QR Studio',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: false,
    }),
  });

  const data = await res.json();
  if (res.status === 201) {
    console.log('✓ Successfully created repository:', data.html_url);
    console.log('Clone URL:', data.clone_url);
    return data;
  } else if (res.status === 422) {
    console.log('Repo already exists or validation issue:', data.message);
    return { html_url: 'https://github.com/kaushal-pandya-hacker/infronix' };
  } else {
    throw new Error(`GitHub API error ${res.status}: ${JSON.stringify(data)}`);
  }
}

createRepo().catch(console.error);

