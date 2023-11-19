import { createElement, getFormData, populateForm } from '@lib/dom';
import { MobiusDisplayData, MobiusInitData, MobiusPreviewData, MobiusSaveData } from '@lib/types';
import { serializeForm } from '@lib/utils';

/* THIS REGEX PATTERN BELOW IS DEFINITIVE. ONLY CHANGE IF MOBIUS MAKES BREAK CHANGES TO THEIR HTML STRUCTURE */
const MOBIUS_DATA_REGEX = /<form.*editQuestionForm(.|\n|\r|\n)*<\/form>/gi;

export const initMobiusData = async <T = ReturnType<typeof getFormData<keyof MobiusInitData>>, U = unknown>(
  onSuccess?: (data: T) => void,
  onFailure?: (error: U) => void,
) => {
  try {
    const container = createElement({ tag: 'div' });
    const response = await fetch(location.href);
    const text = await response.text();
    const formHtml = text.match(MOBIUS_DATA_REGEX);
    container.innerHTML = formHtml?.[0] ?? '';
    const form = container.firstElementChild as HTMLFormElement;
    if (form) {
      const data = getFormData<keyof MobiusInitData>(form);
      const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== ''));
      if (onSuccess) onSuccess(filteredData as T);
    }
  } catch (error) {
    if (onFailure) onFailure(error as U);
  }
};

export const makeMobiusSaveData = <T extends MobiusSaveData = MobiusSaveData>(
  { editor: _, ...initData }: MobiusInitData,
  {
    algorithm = '',
    authorNotes = '',
    authorNotesEditor = '',
    comment = '',
    commentEditor = '',
    customCss = '',
    questionText = '',
    name = '',
  }: Pick<
    MobiusSaveData,
    | 'algorithm'
    | 'authorNotes'
    | 'authorNotesEditor'
    | 'comment'
    | 'commentEditor'
    | 'customCss'
    | 'questionText'
    | 'name'
  >,
): T =>
  ({
    ...initData,
    actionId: 'savedraft',
    AntiCsrfToken: initData.AntiCsrfToken ?? (document.cookie.match(/AntiCsrfToken=.*&?$/)?.[0] ?? '').split('=')[1],
    algorithm,
    authorNotes,
    authorNotesEditor,
    comment,
    commentEditor,
    customCss,
    name,
    questionText,
  }) as T;

export const makeMobiusPreviewData = <T extends MobiusPreviewData = MobiusPreviewData>(
  { editor: _, ...initData }: MobiusInitData,
  {
    algorithm = '',
    authorNotes = '',
    authorNotesEditor = '',
    comment = '',
    commentEditor = '',
    customCss = '',
    questionText = '',
    name = '',
  }: Pick<
    MobiusSaveData,
    | 'algorithm'
    | 'authorNotes'
    | 'authorNotesEditor'
    | 'comment'
    | 'commentEditor'
    | 'customCss'
    | 'questionText'
    | 'name'
  >,
): T =>
  ({
    ...initData,
    actionId: 'preview',
    AntiCsrfToken: initData.AntiCsrfToken ?? (document.cookie.match(/AntiCsrfToken=.*&?$/)?.[0] ?? '').split('=')[1],
    algorithm,
    authorNotes,
    authorNotesEditor,
    comment,
    commentEditor,
    customCss,
    name,
    questionText,
    editor: questionText,
  }) as T;

export const makeMobiusDisplayData = <T extends MobiusDisplayData = MobiusDisplayData>(
  { editor: _, ...initData }: MobiusInitData,
  { questionDefinition, version }: Pick<MobiusDisplayData, 'version' | 'questionDefinition'>,
): T =>
  ({
    actionID: 'display',
    algorithmic: 'true',
    AntiCsrfToken: initData.AntiCsrfToken ?? (document.cookie.match(/AntiCsrfToken=.*&?$/)?.[0] ?? '').split('=')[1],
    baseUrl: location.origin,
    error: 'false',
    errorMsg: '',
    questionDefinition,
    slideNumber: '',
    version,
  }) as T;

export const serializeMobiusData = (data: MobiusSaveData | MobiusInitData | MobiusPreviewData | MobiusDisplayData) => {
  const form = createElement({ tag: 'form' });
  Object.entries(data).forEach(([key, value]) => populateForm(form, key, value));
  return serializeForm(form);
};

export const queryMobiusDocument = (actionType: 'display' | 'save-or-get-preview-data', jQuerySerializedData: string) =>
  fetch(
    actionType === 'save-or-get-preview-data' ? '/qbeditor/SaveDynamicInline.do' : '/contentmanager/DisplayQuestion.do',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'text/plain, */*; q=0.01',
      },
      body: jQuerySerializedData,
      method: 'POST',
    },
  );
