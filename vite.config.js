import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'fs';

const buildUtilsFolderName = 'dev-utils';

// Paths to critical files
const buildUtilsDir = join(import.meta.dirname, buildUtilsFolderName);
const distDir = join(import.meta.dirname, 'dist');
const appIconPath = join(buildUtilsDir, 'app-icon.png');
const manifestPath = join(buildUtilsDir, 'manifest.json');
const backgroundScriptPath = join(buildUtilsDir, 'background.js');
const appVersion = JSON.parse(readFileSync(join(import.meta.dirname, 'package.json'), 'utf8')).version;

// https://vite.dev/config/
const basePath = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base: basePath,
  build: {
    outDir: 'dist',
  },
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  plugins: [
    react(),
    {
      apply: 'build',
      closeBundle() {
        if (!existsSync(distDir)) mkdirSync(distDir);

        // Copy manifest.json into dist
        if (existsSync(manifestPath)) {
          copyFileSync(manifestPath, join(distDir, 'manifest.json'));
          console.log('manifest.json copied successfully');
        } else {
          console.error('Error: manifest.json not found.');
        }

        // Copy background.js into dist
        if (existsSync(backgroundScriptPath)) {
          copyFileSync(backgroundScriptPath, join(distDir, 'background.js'));
          console.log('background.js copied successfully');
        } else {
          console.error('Error: background.js not found.');
        }

        // Copy app-icon.png into dist
        if (existsSync(appIconPath)) {
          copyFileSync(appIconPath, join(distDir, 'app-icon.png'));
        } else {
          console.log('Error: app-icon not found.');
        }
      },
      name: 'copy-chrome-extension-files',
    },
  ],
  test: {
    clearMocks: true,
    environment: 'jsdom',
    restoreMocks: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
