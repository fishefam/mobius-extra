import { makePath } from '../lib';

type AssetType = 'css' | 'js';

const scripts = ['custom.js'];
const css = ['custom.css'];

window.addEventListener(
  'load',
  () => {
    addAssets(scripts, 'js');
    addAssets(css, 'css');
  },
  false,
);

function addAssets(scripts: string[], type: AssetType) {
  for (const script of scripts) addAsset(script, type);
}

function addAsset(script: string, type: AssetType) {
  const scriptPath = makePath(`assets/${script}`);
  const element = document.createElement(type === 'js' ? 'script' : 'link');
  if (isScript(element)) element.src = scriptPath;
  if (isCSS(element)) {
    element.rel = 'stylesheet';
    element.href = scriptPath;
  }
  document.head.append(element);
  console.log(`Injection: ${scriptPath}`);
}

function isScript(element: HTMLScriptElement | unknown): element is HTMLScriptElement {
  return (element as HTMLScriptElement) != document.body;
}

function isCSS(element: HTMLLinkElement | unknown): element is HTMLLinkElement {
  return (element as HTMLLinkElement) != document.body;
}
