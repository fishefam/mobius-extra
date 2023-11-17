import { makePath } from '../lib';

window.addEventListener('load', main, false);

function main() {
  addScript('custom.js');
}

function addScripts(scripts: string[]) {
  for (const script of scripts) addScript(script);
}

function addScript(script: string) {
  const scriptPath = makePath(`assets/${script}`);
}
