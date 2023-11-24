import { prettier } from 'lib/formatter'
import { getInitData } from 'lib/mobius'
import { extractCssStrings, extractHtmlString, extractScriptStrings } from 'lib/util'
import {
  store_algorithm_code_mirror_view,
  store_author_notes_code_mirror_view,
  store_data,
  store_feedback_css_code_mirror_view,
  store_feedback_html_code_mirror_view,
  store_feedback_javascript_code_mirror_view,
  store_is_initiating,
  store_question_css_code_mirror_view,
  store_question_html_code_mirror_view,
  store_question_javascript_code_mirror_view,
} from 'page/store'
import { onDestroy, onMount } from 'svelte'
import type { Unsubscriber } from 'svelte/motion'
import type { Readable, Subscriber, Writable } from 'svelte/store'

export const usePopulateData = () =>
  onMount(async () => {
    const initData = await getInitData()
    store_data.set(initData ?? { actionId: 'save' })
    store_is_initiating.set(false)
  })

export const usePrepareCodeEditor = () =>
  useSubscribe({
    func: async ({ algorithm, authorNotes, editor, commentEditor }) => {
      const codeMirrorViews = [
        store_algorithm_code_mirror_view,
        store_author_notes_code_mirror_view,
        store_question_html_code_mirror_view,
        store_question_css_code_mirror_view,
        store_question_javascript_code_mirror_view,
        store_feedback_html_code_mirror_view,
        store_feedback_css_code_mirror_view,
        store_feedback_javascript_code_mirror_view,
      ]
      codeMirrorViews.forEach(async (view, i) => {
        let text = ''
        if (i === 0) text = algorithm ?? ''
        if (i === 1) text = authorNotes ?? ''
        if (i === 2) text = await prettier(extractHtmlString(editor ?? ''), 'html')
        if (i === 3) text = await prettier(extractCssStrings(editor ?? '', true).join('\n'), 'css')
        if (i === 4)
          text = await prettier(extractScriptStrings(editor ?? '', true).join('\n'), 'javascript')
        if (i === 5) text = await prettier(extractHtmlString(commentEditor ?? ''), 'html')
        if (i === 6)
          text = await prettier(extractCssStrings(commentEditor ?? '', true).join('\n'), 'css')
        if (i === 7)
          text = await prettier(
            extractScriptStrings(commentEditor ?? '', true).join('\n'),
            'javascript',
          )
        const transaction = view.state.update({ changes: { from: 0, insert: text } })
        view.dispatch(transaction)
      })
    },
    store: store_data,
  })

export const useSubscribe = <T>(subscription: {
  store: Writable<T> | Readable<T>
  func: Subscriber<T>
  unsubscribeImmediately?: boolean
}) => {
  let unsubscriber: Unsubscriber
  onMount(() => {
    unsubscriber = subscription.store.subscribe(subscription.func)
    if (subscription.unsubscribeImmediately && unsubscriber) unsubscriber()
  })
  onDestroy(() => (unsubscriber ? unsubscriber() : null))
}
