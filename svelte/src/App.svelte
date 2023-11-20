<script lang="ts">
  import { EditorView, basicSetup } from 'codemirror';
  import { javascript } from '@codemirror/lang-javascript';
  import { selectElement } from '@lib/dom';
  import { onMount } from 'svelte';

  onMount(() => {
    let view = new EditorView({
      extensions: [basicSetup, javascript()],
      parent: selectElement('.js-editor-container') as HTMLDivElement,
    });
  });
</script>

<div class="js-editor-container" />
