import { AssetType } from '@lib/types';
import { isCSS, isScript, makePath } from '@lib/utils';

/**
 * Immediately intercept and stop all activities when page is starting to load resources from server.
 * Then asynchronously fetch data from Mobius server and store each property individually in localStorage.
 *
 * NOTE: For the optimal performance, DO NOT change the order of the top statements.
 */
window.stop();
localStorage.setItem('extensionUrl', makePath(''));
const html = document.querySelector('html');
if (html) html.innerHTML = `<head></head><body><div id="svelte-app"></div></body>`;

// Arrays storing the names of CSS and JS files to be added.
const scripts = ['global-vars.js'];
const css = ['quill.core.css', 'quill.snow.css', 'svelte.css'];

addAssets(scripts, 'js');
addAssets(css, 'css');

/**
 * Adds an array of assets to the document.
 *
 * @param assets - An array of asset filenames to be added.
 * @param type - The type of the assets ('css' or 'js').
 */
export function addAssets(assets: string[], type: AssetType) {
  for (const asset of assets) addAsset(asset, type);
}

/**
 * Creates and appends a script or link element to the document head for the given asset.
 *
 * @param asset - The filename of the asset to be added.
 * @param type - The type of the asset ('css' or 'js').
 */
function addAsset(asset: string, type: AssetType) {
  const path = makePath(`assets/${asset}`);
  const element = document.createElement(type === 'js' ? 'script' : 'link');
  if (isScript(element)) element.src = path;
  if (isCSS(element)) {
    element.rel = 'stylesheet';
    element.href = path;
  }
  document.head.append(element);
  console.log(`Injection: ${path}`);
}
