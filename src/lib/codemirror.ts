import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'
import { isWebCode as _isWebCode, removeWrapperTag } from '@lib/util'
import { EditorView } from 'codemirror'
import { basicSetup } from 'codemirror'
import babelParser from 'prettier/plugins/babel'
import estreeParser from 'prettier/plugins/estree'
import htmlParser from 'prettier/plugins/html'
import cssParser from 'prettier/plugins/postcss'
import { format } from 'prettier/standalone'
import type { TextCategory, TextType } from 'types/mobius'

import { extractCssString, extractHtmlString, extractScriptString } from './util'

export const createCodeEditor = async (
  category: TextCategory,
  type: TextType,
  text: string = '',
): Promise<{
  category: TextCategory
  type: TextType
  view: EditorView
  state: EditorState
}> => {
  const state = EditorState.create({
    doc: await prepareCodeText(text, category, type),
    extensions: [basicSetup, type === 'html' ? html() : type === 'css' ? css() : javascript()],
  })
  const view = new EditorView({ state })
  return { category, state, type, view }
}

export const prepareCodeText = async (rawText: string, category: TextCategory, type: TextType) => {
  const isWebCode = _isWebCode(category)
  const isHtml = isWebCode && type === 'html'
  const isScript = isWebCode && type === 'javascript'
  const isCss = isWebCode && type === 'css'

  const htmlString = isHtml ? removeWrapperTag(extractHtmlString(rawText).trim()) : ''
  const scriptString = isScript ? removeWrapperTag(extractScriptString(rawText).trim()) : ''
  const cssString = isCss ? removeWrapperTag(extractCssString(rawText).trim()) : ''

  return isWebCode
    ? await format(isHtml ? htmlString : isScript ? scriptString : cssString, {
        htmlWhitespaceSensitivity: 'ignore',
        parser: isHtml ? 'html' : isCss ? 'css' : 'babel',
        plugins: [htmlParser, babelParser, estreeParser, cssParser],
        printWidth: 100,
      })
    : rawText
}
