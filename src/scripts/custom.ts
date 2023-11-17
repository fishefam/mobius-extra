import { addClasses } from 'lib/dom';

const overlay = document.createElement('main');

addClasses(overlay, 'extension-overlay');

overlay.textContent = 'HEllo';

document.body.append(overlay);
