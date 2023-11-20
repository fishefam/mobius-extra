import { initMobiusData } from '@lib/mobius/editor';
import { AssetType, MobiusInitData } from '@lib/types';
import { isScript, isCSS } from '@lib/utils';

initMobiusData(main);

async function main(initMobiusData: MobiusInitData) {
  window.webext = { initMobiusData };
  addAssets(['svelte.js'], 'js');
  document.title = initMobiusData.name ?? 'Newbius';
}

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
  const path = `${localStorage.getItem('extensionUrl')}assets/${asset}`;
  const element = document.createElement(type === 'js' ? 'script' : 'link');
  if (isScript(element)) element.src = path;
  if (isCSS(element)) {
    element.rel = 'stylesheet';
    element.href = path;
  }
  document.head.append(element);
  // console.log(`Injection: ${path}`);
}
