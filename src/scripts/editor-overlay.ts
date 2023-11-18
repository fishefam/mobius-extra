import { getMobiusEditorData } from '@lib/mobius/editor';
import { extractScriptString, makeVarsGlobal } from '@lib/utils';

const b = getMobiusEditorData('editor') as string;
const script = extractScriptString(b);

makeVarsGlobal({ key: 'script', value: script });
