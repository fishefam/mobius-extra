import { createElement, getFormData } from '@lib/dom';
import { MobiusEditorFormDataKeys } from '@lib/types';

/* THIS REGEX PATTERN BELOW IS DEFINITIVE. ONLY CHANGE IF MOBIUS MAKES BREAK CHANGES TO THEIR HTML STRUCTURE */
export const MOBIUS_DATA_FORM_REGEX = /<form.*editQuestionForm(.|\n|\r|\n)*<\/form>/gi;

export const MobiusEditorFormClassname = '.editQuestionForm';
export const getAllMobiusEditorData = () => getFormData<MobiusEditorFormDataKeys>(MobiusEditorFormClassname);
export const getMobiusEditorData = <T extends MobiusEditorFormDataKeys, U = FormDataEntryValue>(key: T) =>
  getFormData<T, U>(MobiusEditorFormClassname, key);
export const saveMobiusEdit = () => eval('saveDraftQuestion({})');
export const saveMobiusEditAndExit = () => eval('saveQuestion()');
export const previewQuestion = () => eval('previewQuestion()');

export const initMobiusData = async () => {
  const container = createElement({ tag: 'div' });
  const response = await fetch(location.href);
  const text = await response.text();
  const formHtml = text.match(MOBIUS_DATA_FORM_REGEX);
  container.innerHTML = formHtml?.[0] ?? '';
  const form = container.firstElementChild as HTMLFormElement;
  if (form) {
    const data = getFormData<MobiusEditorFormDataKeys>(form);
    for (const key of Object.keys(data))
      localStorage.setItem(key, data[key as MobiusEditorFormDataKeys].toString().trim());
  }
};
