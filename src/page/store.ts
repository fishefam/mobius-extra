import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { writable } from 'svelte/store'
import type { InitData, Section } from 'types/mobius'
import type { Type } from 'types/utils'

const sharedExtensions = [
  basicSetup,
  EditorView.updateListener.of((v: ViewUpdate) => {
    if (v.docChanged) store_is_code_changed.update((state) => !state)
  }),
]

export const store_is_initiating = writable(true)
export const store_data = writable<InitData>({ actionId: 'save' })
export const store_section = writable<Section>('question')
export const store_type = writable<Type>('html')
export const store_preview_html = writable('')
export const store_is_code_changed = writable(false)

export const store_question_html_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions, html()],
})
export const store_question_css_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions, css()],
})
export const store_question_javascript_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions, javascript()],
})
export const store_feedback_html_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions, html()],
})
export const store_feedback_css_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions, css()],
})
export const store_feedback_javascript_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions, javascript()],
})
export const store_algorithm_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions],
})
export const store_author_notes_code_mirror_state = EditorState.create({
  extensions: [...sharedExtensions],
})

export const store_question_html_code_mirror_view = new EditorView({
  state: store_question_html_code_mirror_state,
})
export const store_question_css_code_mirror_view = new EditorView({
  state: store_question_css_code_mirror_state,
})
export const store_question_javascript_code_mirror_view = new EditorView({
  state: store_question_javascript_code_mirror_state,
})
export const store_feedback_html_code_mirror_view = new EditorView({
  state: store_feedback_html_code_mirror_state,
})
export const store_feedback_css_code_mirror_view = new EditorView({
  state: store_feedback_css_code_mirror_state,
})
export const store_feedback_javascript_code_mirror_view = new EditorView({
  state: store_feedback_javascript_code_mirror_state,
})
export const store_algorithm_code_mirror_view = new EditorView({
  state: store_algorithm_code_mirror_state,
})
export const store_author_notes_code_mirror_view = new EditorView({
  state: store_author_notes_code_mirror_state,
})
