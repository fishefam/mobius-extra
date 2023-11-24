<script lang="ts">
  import { hotReload } from 'lib/util'

  import CodeEditor from './components/CodeEditor.svelte'
  import CodeToolbar from './components/CodeToolbar.svelte'
  import Editor from './components/Editor.svelte'
  import Grid from './components/Grid.svelte'
  import Preview from './components/Preview.svelte'
  import PreviewContent from './components/PreviewContent.svelte'
  import PreviewToolbar from './components/PreviewToolbar.svelte'
  import Tabs from './components/Tabs.svelte'
  import { usePopulateCodeEditorState, usePopulateData } from './hooks/store'
  import { store_section } from './store'

  // Remove this call in production
  hotReload()

  let showCodeToolbar = true

  usePopulateData()
  usePopulateCodeEditorState()

  store_section.subscribe((state) => {
    if (state === 'question' || state === 'feedback') showCodeToolbar = true
    if (state === 'algorithm' || state === 'authornotes') showCodeToolbar = false
  })
</script>

<div class="editor font-sans h-screen">
  <Tabs />
  <Grid>
    <Editor slot="left">
      <CodeToolbar slot="top" show={showCodeToolbar} />
      <CodeEditor slot="bottom" />
    </Editor>
    <Preview slot="right">
      <PreviewToolbar slot="top" />
      <PreviewContent slot="bottom" />
    </Preview>
  </Grid>
</div>
