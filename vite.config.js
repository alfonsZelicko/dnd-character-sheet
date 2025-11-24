import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { join } from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

const buildUtilsFolderName = 'dev-utils';
// Paths to critical files
const buildUtilsDir = join(__dirname, buildUtilsFolderName);
const distDir = join(__dirname, 'dist');
const appIconPath = join(buildUtilsDir, 'app-icon.png');
const manifestPath = join(buildUtilsDir, 'manifest.json');
const backgroundScriptPath = join(buildUtilsDir, 'background.js');

// https://vitejs.dev/config/
const basePath = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base: basePath,
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    /*visualizer({
      open: false,
      filename: join(buildUtilsFolderName, 'stats-visualization.html'),
      template: 'treemap',
    }),*/
    {
      name: 'copy-chrome-extension-files',
      apply: 'build',
      closeBundle() {
        if (!existsSync(distDir)) mkdirSync(distDir);

        /* copying manifest.json into the dist */
        if (existsSync(manifestPath)) {
          copyFileSync(manifestPath, join(distDir, 'manifest.json'));
          console.log('manifest.json copied successfully');
        } else {
          console.error('Error: manifest.json not found.');
        }

        /* copying background.js into the dist */
        if (existsSync(backgroundScriptPath)) {
          copyFileSync(backgroundScriptPath, join(distDir, 'background.js'));
          console.log('background.js copied successfully');
        } else {
          console.error('Error: background.js not found.');
        }

        /* copying app-icon.png into the dist */
        if (existsSync(appIconPath)) {
          copyFileSync(appIconPath, join(distDir, 'app-icon.png'));
        } else {
          console.log('Error: app-icon not found.');
        }
      },
    },
  ],
});
