import CopyPlugin from 'copy-webpack-plugin';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { URL, fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const sourceDir = 'src';
const assetDir = 'assets';

const sourceFiles = getFilenames(sourceDir);
const sourceFilenames = getFilenames(sourceDir, '', 'name');

const assetFiles = getFilenames(assetDir);

const entry = Object.fromEntries(sourceFilenames.map((n, i) => [n, makePath(sourceDir, sourceFiles[i])]));
const patterns = assetFiles.map((n, i) => ({ from: makePath(assetDir, n), to: '' }));

/** @type {import('webpack').Configuration} */
export default {
  entry,
  output: { filename: '[name].js', path: makePath('dist'), clean: true },
  plugins: [new CopyPlugin({ patterns })],
  mode: 'production',
  devtool: 'source-map',
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
};

/**
 *
 * @param {string} base
 * @param {string} path
 * @param {'name' | 'ext' | 'full'} part
 * @returns {string[]} Filenames in a directory
 */
function getFilenames(base, path = '', part = 'full') {
  return readdirSync(makePath(base, path)).map((f) =>
    f.replace(part === 'name' ? /\..*$/ : part === 'ext' ? /^.*\./ : '', ''),
  );
}

/**
 *
 * @param  {string[]} path
 * @returns {string}
 */
function makePath(...path) {
  return resolve(__dirname, ...path);
}
