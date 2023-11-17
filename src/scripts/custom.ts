import { addClasses, getFormData } from '@lib/dom';
import { makeQuill } from '@lib/quill';

const overlay = document.createElement('main');
const questionText = getFormData('.editQuestionForm', 'editor');

document.body.append(overlay);

addClasses(overlay, 'extension-overlay');
makeQuill({ container: overlay, defaultValue: questionText, isScriptEditor: true });
