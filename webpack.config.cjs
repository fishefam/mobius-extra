const CopyPlugin = require('copy-webpack-plugin');
const { readdirSync } = require('fs');
const { resolve } = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const RemovePlugin = require('remove-files-webpack-plugin');

const scriptDir = 'src/scripts';
const sourceDir = 'src';
const assetDir = 'assets';

const scriptFiles = getFilenames(scriptDir);
const scriptFilenames = getFilenames(scriptDir, '', 'name');

const sourceFiles = getFilenames(sourceDir);
const sourceFilenames = getFilenames(sourceDir, '', 'name');

const entry = {
  ...Object.fromEntries(sourceFilenames.map((n, i) => [n, makePath(sourceDir, sourceFiles[i])])),
  ...Object.fromEntries(scriptFilenames.map((n, i) => [`${assetDir}/${n}`, makePath(scriptDir, scriptFiles[i])])),
};

/** @type {import('webpack').Configuration} */
const config = {
  watch: true,
  entry,
  output: {
    filename: '[name].js',
    path: makePath('dist'),
  },
  stats: { warnings: false },
  mode: 'production',
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: { scripts: ['npm run webpack:svelte'], parallel: true },
      onBuildEnd: process.env.MODULES === 'part' ? {} : { scripts: ['npm run webext'], parallel: true },
    }),
    new CopyPlugin({
      patterns: [
        { from: makePath(sourceDir, 'manifest.json'), to: '' },
        { from: `./${assetDir}/**/*`, to: '[path][name][ext]' },
      ],
    }),
    new WatchExternalFilesPlugin({
      files: [
        './svelte/**/*.svelte',
        './svelte/**/*.ts',
        './svelte/**/*.css',
        './svelte/**/*.svg',
        './svelte/**/*.html',
        './src/**/*.ts',
        './src/**/*.json',
        './src/**/*.svg',
        './src/**/*.html',
        './lib/**/*.ts',
        './lib/**/*.svg',
        './lib/**/*.html',
        './assets/**/*.js',
        './assets/**/*.css',
        './assets/**/*.svg',
        './assets/**/*.html',
      ],
    }),
    new RemovePlugin({
      after: {
        include: ['./dist/assets/index.html', './dist/manifest.js'],
        test: [
          {
            folder: './dist',
            method: (absoluteItemPath) => {
              return new RegExp(/\.LICENSE\./, 'mg').test(absoluteItemPath);
            },
            recursive: true,
          },
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: { minify: true, jsc: { parser: { syntax: 'typescript' } } },
        },
      },
    ],
  },
  resolve: {
    alias: { '@lib': resolve(__dirname, './lib/') },
    extensions: ['.ts', '.js'],
  },
};

module.exports = config;

/**
 *
 * @param {string} base
 * @param {string} path
 * @param {'name' | 'ext' | 'full'} part
 * @returns {string[]} Filenames in a directory
 */
function getFilenames(base, path = '', part = 'full') {
  return readdirSync(makePath(base, path))
    .filter((f) => /\..*$/.test(f))
    .map((f) => f.replace(part === 'name' ? /\..*$/ : part === 'ext' ? /^.*\./ : '', ''));
}

/**
 *
 * @param  {string[]} path
 * @returns {string}
 */
function makePath(...path) {
  return resolve(__dirname, ...path);
}
