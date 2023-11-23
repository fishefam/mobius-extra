import { html } from '@codemirror/lang-html'
import { EditorState } from '@codemirror/state'
import { createElement, selectElement } from '@lib/dom'
import {
  extractCssString,
  extractHtmlString,
  extractScriptString,
  removeWrapperTag,
} from '@lib/util'
import { basicSetup, EditorView } from 'codemirror'
import babelParser from 'prettier/plugins/babel'
import htmlParser from 'prettier/plugins/html'
import { format } from 'prettier/standalone'
import { onMount } from 'svelte'
import { ayuLight } from 'thememirror'
import type { TextCategory, TextType } from 'types/mobius'

export const useEditorSetup = (category: TextCategory, type: TextType, selector: string) => {
  const state = EditorState.create({ extensions: [html(), basicSetup, ayuLight] })
  const view = new EditorView({ state })
  onMount(async () => {
    const text = await useInitMobiusData(category, type)
    const parent = selectElement(selector) ?? createElement({ tag: 'div' })
    const transaction = view.state.update({ changes: { from: 0, insert: text } })
    view.dispatch(transaction)
    parent.appendChild(view.dom)
  })
  return { state, view }
}

export const useInitMobiusData = async (category: TextCategory, type: TextType) => {
  const data = webext.initMobiusData[category === 'question' ? 'editor' : 'commentEditor'] ?? ''
  const htmlString =
    category === 'algorithm' ? removeWrapperTag(extractHtmlString(data)).trim() : ''
  const scriptString = category === 'algorithm' ? removeWrapperTag(extractScriptString(data)) : ''
  const cssString = category === 'algorithm' ? removeWrapperTag(extractCssString(data)) : ''
  const text =
    category === 'algorithm'
      ? webext.initMobiusData.algorithm ?? ''
      : await format(
          type === 'html' ? htmlString : type === 'javascript' ? scriptString : cssString,
          {
            htmlWhitespaceSensitivity: 'ignore',
            parser: type === 'javascript' ? 'babel' : 'html',
            plugins: [htmlParser, babelParser],
            printWidth: 100,
          },
        )
  return text
}
