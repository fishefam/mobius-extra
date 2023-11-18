import EditorJS from '@editorjs/editorjs';
import { createElement, getFormData } from '@lib/dom';
import Header from '@editorjs/header';
import okatool from '@editorjs/list';
import { MobiusEditorFormDataKeys } from '@lib/types';

const container = createElement({ tag: 'main', id: 'editor-overlay', parent: document.body });
const questionTextEditorContainer = createElement({ tag: 'div', id: 'question-text-editor', parent: container });
const editor = new EditorJS({
  holder: 'question-text-editor',
  tools: {
    header: Header,
    whathere: okatool,
  },
  onReady: () => console.log('Editor ready'),
  onChange: (a, b) => {
    a.saver.save().then((r) => console.log(r.blocks));
  },
});

const a = getFormData<MobiusEditorFormDataKeys>('.editQuestionForm');
console.log(a.algorithm);
