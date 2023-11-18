import { getFormData } from '@lib/dom';
import { MobiusEditorFormDataKeys } from '@lib/types';

export const MobiusEditorFormClassname = '.editQuestionForm';
export const getAllMobiusEditorData = () => getFormData<MobiusEditorFormDataKeys>(MobiusEditorFormClassname);
export const getMobiusEditorData = <T extends MobiusEditorFormDataKeys, U = FormDataEntryValue>(key: T) =>
  getFormData<T, U>(MobiusEditorFormClassname, key);
