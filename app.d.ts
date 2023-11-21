/// <reference types="svelte" />

import type { MobiusInitData } from 'types/mobius'

declare global {
  interface Window {
    webext: { initMobiusData: MobiusInitData; IS_PRODUCTION?: boolean }
  }
  const webext: { initMobiusData: MobiusInitData; IS_PRODUCTION?: boolean }
}

export {}
