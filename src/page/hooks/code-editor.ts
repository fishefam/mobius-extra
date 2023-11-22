import { html } from '@codemirror/lang-html'
import { EditorState } from '@codemirror/state'
import { createElement, selectElement } from '@lib/dom'
import { extractHtmlString, extractScriptString } from '@lib/util'
import { basicSetup, EditorView } from 'codemirror'
import htmlParser from 'prettier/plugins/html'
import { format } from 'prettier/standalone'
import { onMount } from 'svelte'
import { ayuLight } from 'thememirror'

export const useEditorSetup = (
  type: 'question' | 'feedback' | 'algorithm',
  isHtml: boolean,
  selector: string,
) =>
  onMount(async () => {
    const text =
      type === 'algorithm'
        ? webext.initMobiusData.algorithm
        : await format(
            webext.initMobiusData[type === 'question' ? 'editor' : 'commentEditor'] ?? '',
            {
              htmlWhitespaceSensitivity: 'ignore',
              parser: 'html',
              plugins: [htmlParser],
            },
          )
    if (type === 'algorithm') console.log(text)
    const htmlString = type !== 'algorithm' ? extractHtmlString(text) : ''
    const scriptString = type !== 'algorithm' ? extractScriptString(text) : ''
    const parent = selectElement(selector) ?? createElement({ tag: 'div' })
    const state = EditorState.create({
      doc: type === 'algorithm' ? text : isHtml ? htmlString : scriptString,
      extensions: [html(), basicSetup, ayuLight],
    })
    new EditorView({ parent, state })
  })
