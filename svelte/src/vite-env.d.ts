/// <reference types="svelte" />
/// <reference types="vite/client" />
import { MobiusInitData } from '../../lib/types';

declare global {
  interface Window {
    webext: {
      initMobiusData: MobiusInitData;
    };
  }
  const webext: {
    initMobiusData: MobiusInitData;
  };
}

export {};
