#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building for Vercel deployment...');

// Build the project normally
try {
  execSync('remix vite:build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
  });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Find the entry file in the client build
const clientBuildPath = path.join(__dirname, '..', 'build', 'client');
const assetsPath = path.join(clientBuildPath, 'assets');

let entryFile = '';
if (fs.existsSync(assetsPath)) {
  const files = fs.readdirSync(assetsPath);
  const entryFiles = files.filter(f => f.includes('entry') && f.endsWith('.js'));
  entryFile = entryFiles.length > 0 ? entryFiles[0] : 'entry.client.js';
}

// Generate index.html for SPA deployment
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Julia Bolt - No-Code Development Platform</title>
  <meta name="description" content="AI-powered no-code development platform powered by Julia agents">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <script type="module" crossorigin src="/assets/${entryFile}"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;

const indexPath = path.join(clientBuildPath, 'index.html');
fs.writeFileSync(indexPath, indexHtml);

console.log('✅ Generated index.html for SPA deployment');
console.log('✅ Build completed successfully for Vercel');
