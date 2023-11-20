import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../dist/assets',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'svelte.js',
        assetFileNames: 'svelte.css',
      },
    },
  },
});
