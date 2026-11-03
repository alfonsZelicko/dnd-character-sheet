import { defineConfig } from 'vitest/config';
import { readFileSync } from 'node:fs';

const appVersion = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')).version;

// Keep the test runner independent from Vite's SWC-based React plugin. Vite's
// built-in esbuild transform is enough for the TSX used by the test suite.
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    clearMocks: true,
    restoreMocks: true,
  },
});
