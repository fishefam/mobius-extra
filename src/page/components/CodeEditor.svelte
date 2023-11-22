<script lang="ts">
  import { selectElement } from '@lib/dom'
  import { onMount } from 'svelte'
  import type { TextCategory, TextType } from 'types/mobius'

  export let category: TextCategory
  export let type: TextType

  let block = /algorithm|author-notes/gi.test(category)
    ? webext.codemirror.filter((block) => block.category === category)[0]
    : webext.codemirror.filter((block) => block.category === category && block.type === type)[0]
  onMount(() => {
    block.view.dispatch(block.view.state.update({ changes: { from: 0, insert: block.state.doc } }))
    selectElement('.editor__code-editor')?.appendChild(block.view.dom)
  })

  // console.log(webext.codemirror.forEach((b) => console.log(b.state.doc.toString())))
  $: {
    block = /algorithm|author-notes/gi.test(category)
      ? webext.codemirror.filter((block) => block.category === category)[0]
      : webext.codemirror.filter((block) => block.category === category && block.type === type)[0]
    selectElement('.editor__code-editor')?.appendChild(block.view.dom)
    block.view.dispatch(block.view.state.update({ changes: { from: 0, insert: block.state.doc } }))
  }
</script>

<div class="editor__code-editor" />
