<script lang="ts">
  import {
    store_algorithm_code_mirror_view,
    store_author_notes_code_mirror_view,
    store_feedback_css_code_mirror_view,
    store_feedback_html_code_mirror_view,
    store_feedback_javascript_code_mirror_view,
    store_question_css_code_mirror_view,
    store_question_html_code_mirror_view,
    store_question_javascript_code_mirror_view,
    store_section,
    store_type,
  } from 'page/store'
  import { onDestroy, onMount } from 'svelte'
  import { get, type Unsubscriber } from 'svelte/store'

  let div: HTMLDivElement
  let unsubscribeStoreSection: Unsubscriber
  let unsubscribeStoreType: Unsubscriber
  let wrapperClassname: string

  onMount(() => {
    unsubscribeStoreSection = store_section.subscribe((section) => {
      let isNotSet = true
      const type = get(store_type)
      div.replaceChildren('')
      if (isNotSet && div && section === 'algorithm') {
        div.appendChild(store_algorithm_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'authornotes') {
        div.appendChild(store_author_notes_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'question' && type === 'html') {
        div.appendChild(store_question_html_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'question' && type === 'css') {
        div.appendChild(store_question_css_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'question' && type === 'javascript') {
        div.appendChild(store_question_javascript_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'feedback' && type === 'html') {
        div.appendChild(store_feedback_html_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'feedback' && type === 'css') {
        div.appendChild(store_feedback_css_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'feedback' && type === 'javascript') {
        div.appendChild(store_feedback_javascript_code_mirror_view.dom)
        isNotSet = false
      }
      wrapperClassname =
        section === 'question' || section === 'feedback'
          ? 'editor__code-editor-container'
          : 'editor__text-editor-container'
    })
    unsubscribeStoreType = store_type.subscribe((type) => {
      let isNotSet = true
      const section = get(store_section)
      div.replaceChildren('')
      if (isNotSet && div && section === 'algorithm') {
        div.appendChild(store_algorithm_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'authornotes') {
        div.appendChild(store_author_notes_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'question' && type === 'html') {
        div.appendChild(store_question_html_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'question' && type === 'css') {
        div.appendChild(store_question_css_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'question' && type === 'javascript') {
        div.appendChild(store_question_javascript_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'feedback' && type === 'html') {
        div.appendChild(store_feedback_html_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'feedback' && type === 'css') {
        div.appendChild(store_feedback_css_code_mirror_view.dom)
        isNotSet = false
      }
      if (isNotSet && div && section === 'feedback' && type === 'javascript') {
        div.appendChild(store_feedback_javascript_code_mirror_view.dom)
        isNotSet = false
      }
    })
  })

  onDestroy(() => {
    if (unsubscribeStoreType) unsubscribeStoreType()
    if (unsubscribeStoreSection) unsubscribeStoreSection()
  })
</script>

<div class={`text-gray-600 ${wrapperClassname}`} bind:this={div}></div>

<style>
  :global(.editor__code-editor-container .cm-scroller) {
    height: 560px !important;
  }
  :global(.editor__text-editor-container .cm-scroller) {
    height: 600px !important;
  }
</style>
