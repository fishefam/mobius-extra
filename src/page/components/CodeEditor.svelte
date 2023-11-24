<script lang="ts">
  import { useSubscribe } from 'page/hooks/store'
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
  import { get } from 'svelte/store'

  export let classname: string
  let sectionClassname = 'editor__question-feedback-code-editor'
  let div: HTMLDivElement

  useSubscribe({
    func: (section) =>
      (sectionClassname = ['question', 'feedback'].includes(section)
        ? 'editor__question-feedback-code-editor'
        : 'editor__algorithm-authornotes-code-editor'),
    store: store_section,
  })

  useSubscribe({
    func: (section) => {
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
    },
    store: store_section,
  })

  useSubscribe({
    func: (type) => {
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
    },
    store: store_type,
  })
</script>

<div class={`${classname} ${sectionClassname} text-gray-600`} bind:this={div}></div>

<style>
  :global(.editor__question-feedback-code-editor .cm-scroller) {
    height: 560px !important;
  }
  :global(.editor__algorithm-authornotes-code-editor .cm-scroller) {
    height: 600px !important;
  }
</style>
