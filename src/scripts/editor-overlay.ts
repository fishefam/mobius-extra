import { getMobiusEditorData } from '@lib/mobius/editor';
import { extractHtmlString, extractScriptString, makeVarsGlobal } from '@lib/utils';

const b = getMobiusEditorData('editor') as string;
const script = extractScriptString(b);
const html = extractHtmlString(b);

makeVarsGlobal({ key: 'script', value: script }, { key: 'html', value: html });
