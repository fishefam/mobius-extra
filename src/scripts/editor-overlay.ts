import { createElement } from '@lib/dom';
import { initMobiusData } from '@lib/mobius/editor';

initMobiusData(main);

async function main() {
  const container = createElement({ tag: 'main', parent: document.body, classList: ['main-container'] });
  const leftPanel = createElement({ tag: 'div', parent: container });
  const rightPanel = createElement({ tag: 'div', parent: container });
}
