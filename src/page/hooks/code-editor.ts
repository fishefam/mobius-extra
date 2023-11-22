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
import htmlParser from 'prettier/plugins/html'
import { format } from 'prettier/standalone'
import { onMount } from 'svelte'
import { ayuLight } from 'thememirror'

export const useEditorSetup = (
  type: 'question' | 'feedback' | 'algorithm',
  mode: 'css' | 'html' | 'script',
  selector: string,
) => {
  const state = EditorState.create({ extensions: [html(), basicSetup, ayuLight] })
  const view = new EditorView({ state })
  onMount(async () => {
    const text = await useInitMobiusData(type, mode)
    const parent = selectElement(selector) ?? createElement({ tag: 'div' })
    const transaction = view.state.update({ changes: { from: 0, insert: text } })
    view.dispatch(transaction)
    parent.appendChild(view.dom)
  })
  return { state, view }
}

export const useInitMobiusData = async (
  type: 'question' | 'feedback' | 'algorithm',
  mode: 'css' | 'html' | 'script',
) => {
  const data = webext.initMobiusData[type === 'question' ? 'editor' : 'commentEditor'] ?? ''
  const htmlString = type !== 'algorithm' ? removeWrapperTag(extractHtmlString(data)).trim() : ''
  const scriptString = type !== 'algorithm' ? removeWrapperTag(extractScriptString(data)) : ''
  const cssString = type !== 'algorithm' ? removeWrapperTag(extractCssString(data)) : ''
  const text =
    type === 'algorithm'
      ? webext.initMobiusData.algorithm ?? ''
      : await format(mode === 'html' ? htmlString : mode === 'script' ? scriptString : cssString, {
          htmlWhitespaceSensitivity: 'ignore',
          parser: 'html',
          plugins: [htmlParser],
          printWidth: 100,
        })
  return text
}
