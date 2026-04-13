import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';

import * as MdxConfig from './source.config';

export default defineConfig({
  plugins: [react(), mdx(MdxConfig), tailwindcss()],
  resolve: {
    alias: {
      collections: fileURLToPath(new URL('./.source', import.meta.url)),
    },
  },
});
