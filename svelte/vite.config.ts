import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'wrap-in-iife',
      generateBundle(outputOptions, bundle) {
        Object.keys(bundle).forEach((fileName) => {
          const file = bundle[fileName];
          if (fileName.slice(-3) === '.js' && 'code' in file) {
            file.code = `(() => {\n${file.code}})()`;
          }
        });
      },
    },
  ],
  build: {
    emptyOutDir: true,
    watch: {},
    outDir: '../dist/assets',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'svelte.js',
        assetFileNames: 'svelte.css',
      },
    },
  },
  resolve: {
    alias: {
      '@lib': resolve(__dirname, '..', 'lib'),
      '@assets': resolve(__dirname, '..', 'assets'),
      '@src': resolve(__dirname, '..', 'src'),
    },
  },
});
