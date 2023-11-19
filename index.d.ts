import { getFormData } from '@lib/dom';
import { MobiusEditorFormDataKeys } from '@lib/types';

declare global {
  interface Window {
    webextprops: {
      isDoneInit: boolean;
      mobiusData?: ReturnType<typeof getFormData<MobiusEditorFormDataKeys>>;
      [key: string | number]: unknown;
    };
  }
}

export default global;
