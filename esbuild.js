import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import postcss from 'esbuild-postcss'
import svelte from 'esbuild-svelte'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import sveltePreprocess from 'svelte-preprocess'

// Fix incompatibility with flowbite-svelte library
const flowbitePackageJsonPath = resolve('node_modules', 'flowbite-svelte', 'package.json')
const flowbitePackageJson = readFileSync(flowbitePackageJsonPath, { encoding: 'utf-8' })
const fixedPackageJson = flowbitePackageJson.replace(/,(.|\n|\r) {2}"exports(.|\n|\r)*/gim, '\n}')
writeFileSync(flowbitePackageJsonPath, fixedPackageJson)
// Fix incompatibility with flowbite-svelte-icon library
const flowbiteIconPackageJsonPath = resolve('node_modules', 'flowbite-svelte-icons', 'package.json')
const flowbiteIconPackageJson = readFileSync(flowbiteIconPackageJsonPath, { encoding: 'utf-8' })
const fixedIconPackageJson = flowbiteIconPackageJson.replace(
  /,(.|\n|\r) {2}"exports(.|\n|\r)*/gim,
  '\n}',
)
writeFileSync(flowbiteIconPackageJsonPath, fixedIconPackageJson)

const context = await esbuild.context({
  bundle: true,
  entryPoints: [
    { in: 'page/app.ts', out: 'app' },
    { in: 'page/index.html', out: 'index' },
    { in: 'manifest.json', out: 'manifest' },
    { in: 'index.ts', out: 'index' },
  ],
  format: 'iife',
  legalComments: 'none',
  loader: { '.html': 'copy', '.json': 'copy', '.ttf': 'text', '.woff': 'text', '.woff2': 'text' },
  logLevel: 'info',
  minify: true,
  minifyWhitespace: false,
  outdir: 'dist',
  plugins: [svelte({ preprocess: sveltePreprocess() }), clean({ patterns: ['dist'] }), postcss()],
  treeShaking: true,
})

context.serve({ port: 4224, servedir: 'dist' })
context.watch()
