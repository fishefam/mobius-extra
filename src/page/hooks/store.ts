import { getInitData } from 'lib/mobius'
import { extractCssStrings, extractHtmlString, extractScriptStrings } from 'lib/util'
import {
  store_algorithm_code_mirror_view,
  store_author_notes_code_mirror_view,
  store_data,
  store_feedback_css_code_mirror_view,
  store_feedback_html_code_mirror_view,
  store_feedback_javascript_code_mirror_view,
  store_question_css_code_mirror_view,
  store_question_html_code_mirror_view,
  store_question_javascript_code_mirror_view,
} from 'page/store'
import babelPlugin from 'prettier/plugins/babel'
import estreePlugin from 'prettier/plugins/estree'
import htmlPlugin from 'prettier/plugins/html'
import cssPlugin from 'prettier/plugins/postcss'
import { format } from 'prettier/standalone'
import { onMount } from 'svelte'
import type { Type } from 'types/utils'

export const usePopulateData = () =>
  onMount(async () => {
    const initData = await getInitData()
    store_data.set(initData ?? { actionId: 'save' })
  })

export const usePopulateCodeEditorState = () =>
  onMount(() =>
    store_data.subscribe(({ algorithm, authorNotes, editor, commentEditor }) => {
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
        if (i === 2) text = await prettierFormat(extractHtmlString(editor ?? ''), 'html')
        if (i === 3)
          text = await prettierFormat(extractCssStrings(editor ?? '', true).join('\n'), 'css')
        if (i === 4)
          text = await prettierFormat(
            extractScriptStrings(editor ?? '', true).join('\n'),
            'javascript',
          )
        if (i === 5) text = await prettierFormat(extractHtmlString(commentEditor ?? ''), 'html')
        if (i === 6)
          text = await prettierFormat(
            extractCssStrings(commentEditor ?? '', true).join('\n'),
            'css',
          )
        if (i === 7)
          text = await prettierFormat(
            extractScriptStrings(commentEditor ?? '', true).join('\n'),
            'javascript',
          )
        const transaction = view.state.update({ changes: { from: 0, insert: text } })
        view.dispatch(transaction)
      })
    }),
  )

const prettierFormat = (text: string, type: Type) =>
  format(text, {
    htmlWhitespaceSensitivity: 'ignore',
    parser: type === 'javascript' ? 'babel' : type,
    plugins:
      type === 'javascript'
        ? [babelPlugin, estreePlugin]
        : [type === 'html' ? htmlPlugin : cssPlugin],
    printWidth: 80,
  })
