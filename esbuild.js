import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import postcss from 'esbuild-postcss'
import svelte from 'esbuild-svelte'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import sveltePreprocess from 'svelte-preprocess'

const fixLibExports = (name) => {
  const path = resolve('node_modules', name, 'package.json')
  const file = readFileSync(path, { encoding: 'utf-8' })
  const fix = file.replace(/,(.|\n|\r) {2}"exports(.|\n|\r)*/gi, '\n}')
  writeFileSync(path, fix)
}

fixLibExports('flowbite-svelte')
fixLibExports('flowbite-svelte-icons')

const context = await esbuild.context({
  bundle: true,
  chunkNames: 'name',
  entryPoints: [
    { in: './src/page/app.ts', out: 'app' },
    { in: './src/page/index.html', out: 'index' },
    { in: './src/manifest.json', out: 'manifest' },
    { in: './src/index.ts', out: 'index' },
  ],
  format: 'iife',
  legalComments: 'none',
  loader: { '.html': 'copy', '.json': 'copy' },
  logLevel: 'info',
  minify: true,
  minifyWhitespace: false,
  outdir: 'dist',
  plugins: [svelte({ preprocess: sveltePreprocess() }), clean({ patterns: ['dist'] }), postcss({})],
  sourcemap: true,
  treeShaking: true,
})

context.serve({ port: 4224, servedir: 'dist' })
context.watch()
