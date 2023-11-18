import { getMobiusEditorData } from '@lib/mobius/editor';
import { extractHtmlString, extractScriptString } from '@lib/utils';

const data = getMobiusEditorData('editor') as string;
const script = extractScriptString(data);
const html = extractHtmlString(data);
