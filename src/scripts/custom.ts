import { addClasses } from 'lib/dom';

const overlay = document.createElement('main');

addClasses(overlay, 'extension-overlay');

document.body.append(overlay);
