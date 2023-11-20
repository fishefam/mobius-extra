const CopyPlugin = require('copy-webpack-plugin');
const { readdirSync } = require('fs');
const { resolve } = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

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
  entry,
  output: {
    filename: '[name].js',
    path: makePath('dist'),
    clean: true,
  },
  stats: { warnings: false },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new WatchExternalFilesPlugin({
      files: [
        './svelte/**/*.svelte',
        './svelte/**/*.ts',
        './svelte/**/*.css',
        './src/**/*.ts',
        './src/**/*.json',
        './lib/**/*.ts',
        './assets/**/*.js',
        './assets/**/*.css',
      ],
    }),
    new WebpackShellPlugin({ onBuildEnd: { scripts: ['npm run build:svelte'], blocking: true } }),
    new CopyPlugin({
      patterns: [
        { from: makePath(sourceDir, 'manifest.json'), to: '' },
        { from: `./${assetDir}/**/*`, to: '[path][name][ext]' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: { minify: true, sourceMaps: true, jsc: { parser: { syntax: 'typescript' } } },
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
