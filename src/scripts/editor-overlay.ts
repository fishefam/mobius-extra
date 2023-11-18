import { getMobiusEditorData } from '@lib/mobius/editor';
import { extractHtmlString, extractScriptString, formatHtml, makeVarsGlobal } from '@lib/utils';

const b = getMobiusEditorData('editor') as string;
const script = extractScriptString(b);
const html = extractHtmlString(b);

formatHtml(script).then((r) => makeVarsGlobal(['formatted', r]));

makeVarsGlobal(['script', script], ['html', html]);
