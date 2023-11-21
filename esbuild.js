import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import postcss from 'esbuild-postcss'
import svelte from 'esbuild-svelte'

const context = await esbuild.context({
  bundle: true,
  entryPoints: [
    // { in: 'page/app.css', out: 'interface' },
    { in: 'page/index.ts', out: 'interface' },
    { in: 'page/index.html', out: 'index' },
    { in: 'bridge/init.ts', out: 'init' },
    { in: 'bridge/manifest.json', out: 'manifest' },
    { in: 'bridge/interceptor.ts', out: 'interceptor' },
  ],
  format: 'iife',
  legalComments: 'none',
  loader: { '.html': 'copy', '.json': 'copy' },
  logLevel: 'info',
  minify: true,
  minifyWhitespace: false,
  outdir: 'dist',
  plugins: [svelte(), clean({ patterns: ['dist'] }), postcss()],
  treeShaking: true,
})

context.serve({ port: 4224, servedir: 'dist' })
context.watch()
