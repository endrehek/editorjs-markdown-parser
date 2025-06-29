import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
			name: 'editorjs-md-parser',
      entry: resolve(__dirname, 'src/index.js'),
      fileName: 'bundle',
    },
  },
});
