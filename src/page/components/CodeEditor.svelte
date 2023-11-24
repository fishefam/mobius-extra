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
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'

  let div: HTMLDivElement

  onMount(() => {
    store_section.subscribe((section) => {
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
    })
    store_type.subscribe((type) => {
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
</script>

<div class="text-gray-600" bind:this={div}></div>
