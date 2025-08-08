import { defineConfig } from 'vite';
import { remixVitePlugin } from '@remix-run/dev';
import UnoCSS from 'unocss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  build: {
    target: 'esnext',
    outDir: 'build/client',
    rollupOptions: {
      input: 'app/entry.client.spa.tsx',
    },
  },
  plugins: [
    nodePolyfills({
      include: ['buffer', 'process', 'util', 'stream'],
      globals: {
        Buffer: true,
        process: true,
        global: true,
      },
      protocolImports: true,
      exclude: ['child_process', 'fs', 'path'],
    }),
    UnoCSS(),
    tsconfigPaths(),
    optimizeCssModules({ apply: 'build' }),
  ],
  envPrefix: [
    'VITE_',
    'OPENAI_LIKE_API_BASE_URL',
    'OLLAMA_API_BASE_URL',
    'LMSTUDIO_API_BASE_URL',
    'TOGETHER_API_BASE_URL',
  ],
});
