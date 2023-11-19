import $ from 'jquery';
import { createElement, getFormData, populateForm } from '@lib/dom';
import { MobiusEditorFormDataKeys, MobiusPostRequestParams } from '@lib/types';

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
    return data;
  }
};

export const makeMobiusData = () => {
  const form = createElement({ tag: 'form' });
  const localStorageKeys = Object.keys(localStorage) as MobiusEditorFormDataKeys[];
  const mobiusData: { [key in MobiusPostRequestParams]: string } = {
    actionId: '',
    adaptive: '',
    algorithm: '',
    AntiCsrfToken: '',
    authorNotes: '',
    authorNotesEditor: '',
    classId: '',
    comment: '',
    commentEditor: '',
    customCss: '',
    hasUnsavedQuestion: '',
    name: '',
    questionText: '',
    uid: '',
  };
  for (const key of localStorageKeys) {
    // if (key === 'editor') formData.append('questionText', localStorage.getItem(key) as string);
    // if (key === 'AntiCsrfToken') formData.append('AntiCsrfToken', document.cookie.replace('AntiCsrfToken=', ''));
    // if (key !== 'editor' && mobiusData[key as MobiusPostRequestParams] === '')
    //   formData.append(key, localStorage.getItem(key) as string);
    if (mobiusData.AntiCsrfToken === '') {
      populateForm(form, 'AntiCsrfToken', document.cookie.replace('AntiCsrfToken=', ''));
      mobiusData.AntiCsrfToken = document.cookie.replace('AntiCsrfToken=', '');
    }
    if (key === 'editor')
      populateForm(form, 'questionText', `THIS IS A TEST FROM VSCODE${localStorage.getItem(key) as string}`);
    if (key === 'actionId') populateForm(form, 'actionId', 'savedraft');
    if (
      key !== 'editor' &&
      key !== 'questionText' &&
      key !== 'actionId' &&
      mobiusData[key as MobiusPostRequestParams] === ''
    )
      populateForm(form, key, localStorage.getItem(key) as string);
  }
  return $(form).serialize();
};

export const saveMobiusDocument = (jQuerySerializedData: string) =>
  fetch('/qbeditor/SaveDynamicInline.do', {
    credentials: 'include',
    headers: {
      'Accept': 'text/plain, */*; q=0.01',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
    },
    body: jQuerySerializedData,
    method: 'POST',
    mode: 'cors',
  });
