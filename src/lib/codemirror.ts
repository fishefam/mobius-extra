import { EditorState } from '@codemirror/state'
import { EditorView } from 'codemirror'
import { basicSetup } from 'codemirror'
import htmlParser from 'prettier/plugins/html'
import { format } from 'prettier/standalone'
import type { TextCategory, TextType } from 'types/mobius'

import { extractCssString, extractHtmlString, extractScriptString, removeWrapperTag } from './util'

export const initCodeEditor = async (
  category: TextCategory,
  type: TextType,
  text: string = '',
): Promise<{
  category: TextCategory
  type: TextType
  view: EditorView
  state: EditorState
}> => {
  const state = EditorState.create({ doc: await prepareCodeText(text, category, type) })
  const view = new EditorView({ extensions: [basicSetup], state })
  return { category, state, type, view }
}

export const prepareCodeText = async (rawText: string, category: TextCategory, type: TextType) => {
  const isWebCode = /algorithm|author-notes/gi.test(category)
  const htmlString = !isWebCode ? removeWrapperTag(extractHtmlString(rawText)).trim() : ''
  const scriptString = !isWebCode ? removeWrapperTag(extractScriptString(rawText)).trim() : ''
  const cssString = !isWebCode ? removeWrapperTag(extractCssString(rawText)).trim() : ''
  return await format(
    type === 'html' ? htmlString : type === 'javascript' ? scriptString : cssString,
    {
      htmlWhitespaceSensitivity: 'ignore',
      parser: 'html',
      plugins: [htmlParser],
      printWidth: 100,
    },
  )
}
