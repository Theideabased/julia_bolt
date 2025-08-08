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
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
  });
} catch (error) {
  console.error('Build failed:', error?.message || error);
  process.exit(1);
}

// Paths
const clientBuildPath = path.join(__dirname, '..', 'build', 'client');
const assetsPath = path.join(clientBuildPath, 'assets');
const manifestPath = path.join(clientBuildPath, '.vite', 'manifest.json');

// Load Vite manifest to accurately include entry and CSS
/** @type {Record<string, any>} */
let manifest = {};
let entryFile = '';
let cssFiles = new Set();

function collectCssFromManifestEntry(entry) {
  if (!entry) return;
  if (Array.isArray(entry.css)) {
    entry.css.forEach((c) => cssFiles.add(c));
  }
  if (Array.isArray(entry.imports)) {
    entry.imports.forEach((imp) => collectCssFromManifestEntry(manifest[imp]));
  }
}

try {
  if (fs.existsSync(manifestPath)) {
    const raw = fs.readFileSync(manifestPath, 'utf-8');
    manifest = JSON.parse(raw);

    // Try to find Remix client entry
    // Prefer a key that includes 'entry.client' or the one marked as isEntry
    const candidates = Object.entries(manifest)
      .filter(([_, v]) => v && (v.isEntry || v.file?.includes('entry.client')));

    if (candidates.length > 0) {
      const best = candidates.find(([k]) => k.includes('entry.client')) || candidates[0];
      entryFile = best[1].file;
      collectCssFromManifestEntry(best[1]);
    }
  }
} catch (e) {
  console.warn('Warning: could not read Vite manifest, falling back to naive detection.', e?.message || e);
}

// Fallback: naive detection if manifest is missing
if (!entryFile) {
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    const jsFiles = files.filter((f) => f.includes('entry') && f.endsWith('.js'));
    if (jsFiles.length > 0) entryFile = path.posix.join('assets', jsFiles[0]);
  }
}

if (!entryFile) {
  console.error('Could not determine client entry file.');
  process.exit(1);
}

// Build index.html with proper CSS and JS
const cssLinks = Array.from(cssFiles)
  .map((href) => `  <link rel="stylesheet" href="/${href}">`)
  .join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Julia Bolt - No-Code Development Platform</title>
  <meta name="description" content="AI-powered no-code development platform powered by Julia agents" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
${cssLinks}
</head>
<body>
  <div id="root"></div>
  <noscript>JavaScript is required to run this application.</noscript>
  <script type="module" crossorigin src="/${entryFile}"></script>
</body>
</html>`;

fs.writeFileSync(path.join(clientBuildPath, 'index.html'), indexHtml);
console.log('✅ Generated index.html for SPA deployment (JS + CSS from manifest)');
console.log('✅ Build completed successfully for Vercel');
