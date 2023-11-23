<script lang="ts">
  import { appState } from '@bridge/init'
  import { onMount } from 'svelte'
  import type { TextCategory } from 'types/mobius'

  export let category: TextCategory

  // const html = webext.codemirror[getGlobalVarKey(category, 'html')].view.state.doc.toString()
  // const css = webext.codemirror[getGlobalVarKey(category, 'css')].view.state.doc.toString()
  // const script =
  //   webext.codemirror[getGlobalVarKey(category, 'javascript')].view.state.doc.toString()

  // const page = joinCode(html, css, script)

  // let kt = convertKatexToMathml(page)
  onMount(() => {
    console.log(appState.textChanged)
  })
</script>

<div style="padding: 1.25rem;" class="text-gray-600">
  <div class="my-preview-container"></div>
</div>
