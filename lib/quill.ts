import type { QuillOptionsStatic } from 'quill';
import jsPrettify from 'js-beautify';
import htmlPrettify from 'pretty';
import Quill from 'quill';
import { selectElement } from './dom';
import { quillModuleLink } from './quill-modules/link';
import { getQuillModuleName } from '.';

type MakeQuillParams = {
  container: string | Element;
  defaultValue?: string;
  options?: QuillOptionsStatic;
  isScriptEditor?: boolean;
};

/* 
    ALWAYS DECLARE NEW QUILL CUSTOM MODULES HERE
    THEN SET THE MODULE TO TRUE IN QUILL'S MODULE'S OBJECT 
*/
const modules: [string, Function][] = [['link', quillModuleLink]];

// All default options should go here
const defaultOptions: QuillOptionsStatic = {
  modules: { toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']] },
  theme: 'snow',
};

const setEditorText = (quill: Quill, text: string, isScriptEditor = false) => {
  const scripts = text.match(/<script>(.|\n)*<\/script>/gim) ?? [];

  let html = '';
  for (const s of scripts) html += text.replace(s, '');

  const beautifiedScripts = scripts
    .map((s) => jsPrettify(s.replace(/<\/?script>/gim, ''), { indent_size: 8 }))
    .join('\n');
  const beautifiedHtml = htmlPrettify(html.trim(), { ocd: true });

  if (isScriptEditor) quill.setText(`${beautifiedScripts}`);
};

const setDefaultEditorText = (quill: Quill, defaultValue: MakeQuillParams['defaultValue'], isScriptEditor = false) =>
  defaultValue && setEditorText(quill, defaultValue, isScriptEditor);

// Register all modules
modules.forEach(([name, callback]) => Quill.register(getQuillModuleName(name), callback));

const makeQuill = ({ container, defaultValue, isScriptEditor, options }: MakeQuillParams) => {
  const wrapper = document.createElement('div');

  wrapper.style.width = '100%';
  wrapper.style.height = '100%';

  if (container && typeof container === 'string') selectElement(container)?.append(wrapper);
  if (container && typeof container !== 'string') container.append(wrapper);

  /* REMEMBER TO ENABLE NEW MODULES HERE */
  const quill = new Quill(wrapper, { ...defaultOptions, ...options, modules: { link: true } });

  setDefaultEditorText(quill, defaultValue, isScriptEditor);
};

export { setEditorText, makeQuill };
