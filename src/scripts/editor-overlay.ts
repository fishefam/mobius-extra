import EditorJS from '@editorjs/editorjs';
import { createElement, getFormData } from '@lib/dom';
import Header from '@editorjs/header';
import okatool from '@editorjs/list';
import { MobiusEditorFormDataKeys } from '@lib/types';
import { getMobiusEditorData } from '@lib/mobius/editor';

const a = getMobiusEditorData('algorithm');
console.log(a);
