<script lang="ts">
  import { useEditorSetup } from '@page/hooks/code-editor'

  export let type: 'question' | 'feedback' | 'algorithm' = 'question'
  export let isHtml = true

  useEditorSetup(type, isHtml, '.editor__code-editor')
</script>

<div class="editor__code-editor" />
