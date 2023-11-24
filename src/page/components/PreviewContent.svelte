<script lang="ts">
  import type { EditorView } from 'codemirror'
  import { createElement, selectElement } from 'lib/dom'
  import { extractCssStrings, extractHtmlString, extractScriptStrings } from 'lib/util'
  import { useSubscribe } from 'page/hooks/store'
  import {
    store_data,
    store_feedback_css_code_mirror_view,
    store_feedback_html_code_mirror_view,
    store_feedback_javascript_code_mirror_view,
    store_is_code_changed,
    store_question_css_code_mirror_view,
    store_question_html_code_mirror_view,
    store_question_javascript_code_mirror_view,
    store_section,
  } from 'page/store'
  import { get } from 'svelte/store'
  import type { Section } from 'types/mobius'

  export let classname: string
  let div: HTMLDivElement

  const resetContent = () => {
    selectElement('#editor__preview-script-container')?.remove()
    div.replaceChildren('')
  }

  const attachContent = (htmlView: EditorView, cssView: EditorView, javascriptView: EditorView) => {
    const html = htmlView.state.doc.toString()
    const css = cssView.state.doc.toString()
    const script = javascriptView.state.doc.toString()
    // eslint-disable-next-line no-useless-escape
    div.innerHTML = `${html}<style>${css}<\/style>`
    const scriptContainer = createElement({
      id: 'editor__preview-script-container',
      parent: document.body,
      tag: 'div',
    })
    createElement({ parent: scriptContainer, tag: 'script', text: `{${script}}` })
  }

  const setContentOnChange = (section: Section) => {
    if (section === 'question')
      attachContent(
        store_question_html_code_mirror_view,
        store_question_css_code_mirror_view,
        store_question_javascript_code_mirror_view,
      )
    if (section === 'feedback')
      attachContent(
        store_feedback_html_code_mirror_view,
        store_feedback_css_code_mirror_view,
        store_feedback_javascript_code_mirror_view,
      )
  }

  useSubscribe({
    func: ({ editor }) => {
      resetContent()
      if (editor) {
        const script = extractScriptStrings(editor, true).join('')
        const html = extractHtmlString(editor)
        const css = extractCssStrings(editor)
        div.innerHTML = html + css
        const scriptContainer = createElement({
          id: 'editor__preview-script-container',
          parent: document.body,
          tag: 'div',
        })
        createElement({ parent: scriptContainer, tag: 'script', text: `{${script}}` })
      }
    },
    store: store_data,
  })

  useSubscribe({
    func: (section) => {
      resetContent()
      setContentOnChange(section)
    },
    store: store_section,
  })

  useSubscribe({
    func: () => setContentOnChange(get(store_section)),
    store: store_is_code_changed,
  })
</script>

<div class={`${classname} h-full p-6 text-gray-600`} bind:this={div}></div>
