<script lang="ts">
  import { createElement } from 'lib/dom'
  import { extractCssStrings, extractHtmlString, extractScriptStrings } from 'lib/util'
  import { store_data } from 'page/store'

  let div: HTMLDivElement

  store_data.subscribe(({ editor }) => {
    if (div && editor) {
      const scripts = extractScriptStrings(editor, true)
      const html = extractHtmlString(editor)
      const cssStrings = extractCssStrings(editor)
      div.innerHTML = html + cssStrings.join('')
      for (const script of scripts)
        createElement({ id: 'what', parent: document.body, tag: 'script', text: `{${script}}` })
    }
  })
</script>

<div
  class="editor__preview-content grid place-items-center h-full py-6 px-3 text-gray-600"
  bind:this={div}
></div>
