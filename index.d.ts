import { getFormData } from '@lib/dom';

declare global {
  interface Window {
    webextprops: {
      initMobiusData: ReturnType<typeof getFormData<keyof MobiusInitData>>;
    };
  }
  const webextprops: {
    initMobiusData: ReturnType<typeof getFormData<keyof MobiusInitData>>;
  };
}

export {};
