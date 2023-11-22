/// <reference types="svelte" />

import { EditorState } from '@codemirror/state'
import type { EditorView } from 'codemirror'
import type { MobiusInitData } from 'types/mobius'
import type { TextCategory, TextType } from 'types/mobius'

declare global {
  interface Window {
    webext: {
      initMobiusData: MobiusInitData
      codemirror: { category: TextCategory; type: TextType; view: EditorView; state: EditorState }[]
    }
  }
  const webext: {
    initMobiusData: MobiusInitData
    codemirror: { category: TextCategory; type: TextType; view: EditorView; state: EditorState }[]
  }
}

export {}
