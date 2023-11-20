import { getFormData } from '@lib/dom';

declare global {
  interface Window {
    webext: {
      initMobiusData: ReturnType<typeof getFormData<keyof MobiusInitData>>;
    };
  }
  const webext: {
    initMobiusData: ReturnType<typeof getFormData<keyof MobiusInitData>>;
  };
}

export {};
