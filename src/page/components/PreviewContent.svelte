<script lang="ts">
  import { createElement, selectElement } from 'lib/dom'
  import { extractCssStrings, extractHtmlString, extractScriptStrings } from 'lib/util'
  import {
    store_data,
    store_feedback_css_code_mirror_view,
    store_feedback_html_code_mirror_view,
    store_feedback_javascript_code_mirror_view,
    store_question_css_code_mirror_view,
    store_question_html_code_mirror_view,
    store_question_javascript_code_mirror_view,
    store_section,
  } from 'page/store'
  import { onDestroy, onMount } from 'svelte'
  import type { Unsubscriber } from 'svelte/motion'

  let div: HTMLDivElement
  let unsubscribeStoreSection: Unsubscriber

  onMount(() => {
    store_data.subscribe(({ editor }) => {
      selectElement('#editor__preview-script-container')?.remove()
      div.replaceChildren('')
      if (editor) {
        const script = extractScriptStrings(editor, true).join('')
        const html = extractHtmlString(editor)
        const css = extractCssStrings(editor, true)
        div.innerHTML = `${html}<style>${css}<\/style>`
        const scriptContainer = createElement({
          id: 'editor__preview-script-container',
          parent: document.body,
          tag: 'div',
        })
        createElement({ parent: scriptContainer, tag: 'script', text: script })
      }
    })
    unsubscribeStoreSection = store_section.subscribe((section) => {
      selectElement('#editor__preview-script-container')?.remove()
      div.replaceChildren('')
      if (section === 'question') {
        const html = store_question_html_code_mirror_view.state.doc.toString()
        const css = store_question_css_code_mirror_view.state.doc.toString()
        const script = store_question_javascript_code_mirror_view.state.doc.toString()
        // eslint-disable-next-line no-useless-escape
        div.innerHTML = `${html}<style>${css}<\/style>`
        const scriptContainer = createElement({
          id: 'editor__preview-script-container',
          parent: document.body,
          tag: 'div',
        })
        createElement({ parent: scriptContainer, tag: 'script', text: script })
      }
      if (section === 'feedback') {
        const html = store_feedback_html_code_mirror_view.state.doc.toString()
        const css = store_feedback_css_code_mirror_view.state.doc.toString()
        const script = store_feedback_javascript_code_mirror_view.state.doc.toString()
        // eslint-disable-next-line no-useless-escape
        div.innerHTML = `${html}<style>${css}<\/style>`
        const scriptContainer = createElement({
          id: 'editor__preview-script-container',
          parent: document.body,
          tag: 'div',
        })
        createElement({ parent: scriptContainer, tag: 'script', text: script })
      }
    })
  })

  onDestroy(() => {
    if (unsubscribeStoreSection) unsubscribeStoreSection()
  })
</script>

<div class="editor__preview-content h-full p-6 text-gray-600" bind:this={div}></div>
