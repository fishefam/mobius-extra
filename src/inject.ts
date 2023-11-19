import { createElement } from '@lib/dom';
import { initMobiusData } from '@lib/mobius/editor';
import { makePath } from '@lib/utils';

type AssetType = 'css' | 'js';

/**
 * Immediately intercept and stop all activities when page is starting to load resources from server.
 * Then asynchronously fetch data from Mobius server and store each property individually in localStorage.
 *
 * NOTE: For the optimal performance, DO NOT change the order of the top statements.
 */
window.stop();
initMobiusData().then(() => {
  /**
   * Adds the specified assets to the document upon window load.
   */
  addAssets(scripts, 'js');
  addAssets(css, 'css');
});
document.body = createElement({ tag: 'body' });

// Arrays storing the names of CSS and JS files to be added.
const scripts = ['editor-overlay.js', 'jquery.js'];
const css = ['editor-overlay.css', 'quill.core.css', 'quill.snow.css'];

/**
 * Adds an array of assets to the document.
 *
 * @param assets - An array of asset filenames to be added.
 * @param type - The type of the assets ('css' or 'js').
 */
function addAssets(assets: string[], type: AssetType) {
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
  document.body.append(element);
  // console.log(`Injection: ${path}`);
}

/**
 * Determines if the provided element is a HTMLScriptElement.
 *
 * @param element - The element to check.
 * @returns True if the element is a HTMLScriptElement, false otherwise.
 */
function isScript(element: HTMLScriptElement | unknown): element is HTMLScriptElement {
  return element instanceof HTMLScriptElement;
}

/**
 * Determines if the provided element is a HTMLLinkElement.
 *
 * @param element - The element to check.
 * @returns True if the element is a HTMLLinkElement, false otherwise.
 */
function isCSS(element: HTMLLinkElement | unknown): element is HTMLLinkElement {
  return element instanceof HTMLLinkElement;
}
