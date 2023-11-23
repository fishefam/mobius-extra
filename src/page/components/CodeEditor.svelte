<script lang="ts">
  import { selectElement } from '@lib/dom'
  import { getGlobalVarKey } from '@lib/util'
  import { onMount } from 'svelte'
  import type { TextCategory, TextType } from 'types/mobius'

  export let category: TextCategory
  export let type: TextType

  const containerClassname = 'editor__code-editor'

  onMount(() => {
    const container = selectElement<HTMLDivElement>('.' + containerClassname)
    const { view } = webext.codemirror[getGlobalVarKey(category, type)]
    container?.replaceChildren(view.dom)
  })

  $: {
    const container = selectElement<HTMLDivElement>('.' + containerClassname)
    const { view } = webext.codemirror[getGlobalVarKey(category, type)]
    container?.replaceChildren(view.dom)
  }
</script>

<div class={containerClassname} />
