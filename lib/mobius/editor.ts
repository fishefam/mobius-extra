import { createElement, getFormData, populateForm } from '@lib/dom';
import { MobiusDisplayData, MobiusInitData, MobiusPreviewData, MobiusSaveData } from '@lib/types';
import { serializeForm } from '@lib/utils';

/* THIS REGEX PATTERN BELOW IS DEFINITIVE. ONLY CHANGE IF MOBIUS MAKES BREAK CHANGES TO THEIR HTML STRUCTURE */
const MOBIUS_DATA_REGEX = /<form.*editQuestionForm(.|\n|\r|\n)*<\/form>/gi;

/**
 * Initializes Mobius data by fetching the current page, extracting the Mobius form, and parsing its data.
 * @param onSuccess - Callback function to execute when initialization is successful.
 * @param onFailure - Callback function to execute when initialization fails.
 * @template T - The type of data to be returned.
 * @template U - The type of error data in case of failure.
 */
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

/**
 * Creates Mobius save data by merging the provided data with initial Mobius data.
 * @param initData - The initial Mobius data.
 * @param data - The additional data to include in the save data.
 * @returns The Mobius save data.
 * @template T - The type of Mobius save data.
 */
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

/**
 * Creates Mobius preview data by merging the provided data with initial Mobius data.
 * @param initData - The initial Mobius data.
 * @param data - The additional data to include in the preview data.
 * @returns The Mobius preview data.
 * @template T - The type of Mobius preview data.
 */
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

/**
 * Creates Mobius display data by merging the provided data with initial Mobius data.
 * @param initData - The initial Mobius data.
 * @param data - The additional data to include in the display data.
 * @returns The Mobius display data.
 * @template T - The type of Mobius display data.
 */
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

/**
 * Serializes Mobius data to a jQuery serialized string.
 * @param data - The Mobius data to serialize.
 * @returns The serialized Mobius data.
 */
export const serializeMobiusData = (data: MobiusSaveData | MobiusInitData | MobiusPreviewData | MobiusDisplayData) => {
  const form = createElement({ tag: 'form' });
  Object.entries(data).forEach(([key, value]) => populateForm(form, key, value));
  return serializeForm(form);
};

/**
 * Queries Mobius document based on the action type and serialized data.
 * @param actionType - The type of action to perform.
 * @param jQuerySerializedData - The jQuery serialized data to send in the request.
 * @returns The fetch response.
 */
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
