import EditorJS from '@editorjs/editorjs';
import { createElement } from '@lib/dom';

const container = createElement({ tag: 'div', id: 'question-text-editor' });
const editor = new EditorJS({
  holder: 'question-text-editor',
});

console.log(editor);
