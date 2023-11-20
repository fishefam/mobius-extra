<script lang="ts">
  import { EditorView, basicSetup } from 'codemirror';
  import { javascript } from '@codemirror/lang-javascript';

  let view = new EditorView({
    extensions: [basicSetup, javascript()],
    parent: document.body,
  });
</script>

<textarea name="code" id="code" cols="30" rows="10" />
