import CopyPlugin from 'copy-webpack-plugin';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { URL, fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
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
export default {
  entry,
  output: {
    filename: '[name].js',
    path: makePath('dist'),
    clean: true,
  },
  mode: 'production',
  devtool: 'source-map',
  watch: true,
  plugins: [
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
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: { minify: true, sourceMaps: true, jsc: { parser: { syntax: 'typescript' } } },
        },
      },
    ],
  },
  resolve: {
    alias: { lib: resolve(__dirname, 'lib/') },
    extensions: ['.ts'],
  },
};

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
