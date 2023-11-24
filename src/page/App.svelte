<script lang="ts">
  import { hotReload } from 'lib/util'
  import { Circle2 } from 'svelte-loading-spinners'
  import type { Section } from 'types/mobius'

  import CodeEditor from './components/CodeEditor.svelte'
  import CodeToolbar from './components/CodeToolbar.svelte'
  import Editor from './components/Editor.svelte'
  import Grid from './components/Grid.svelte'
  import Preview from './components/Preview.svelte'
  import PreviewContent from './components/PreviewContent.svelte'
  import PreviewToolbar from './components/PreviewToolbar.svelte'
  import Tabs from './components/Tabs.svelte'
  import { usePopulateData, usePrepareCodeEditor, useSubscribe } from './hooks/store'
  import { store_is_initiating, store_section } from './store'

  // Remove this call in production
  hotReload()

  let showCodeToolbar = true
  let isInitiating = true

  useSubscribe({
    func: (state) => {
      if (!state) isInitiating = false
    },
    store: store_is_initiating,
  })
  usePopulateData()
  usePrepareCodeEditor()
  useSubscribe({
    func: (state) => {
      const codeSections: Section[] = ['question', 'feedback']
      if (codeSections.includes(state)) showCodeToolbar = true
      if (!codeSections.includes(state)) showCodeToolbar = false
    },
    store: store_section,
  })
</script>

{#if isInitiating}
  <div class="loader--full-screen h-screen w-screen grid place-items-center">
    <Circle2 size="120" unit="px" />
  </div>
{/if}
{#if !isInitiating}
  <div class="editor font-sans h-screen">
    <Tabs classname="editor__tabs" />
    <Grid classname="editor__grid">
      <Editor classname="editor__editor-wrapper" slot="left">
        <CodeToolbar classname="editor__code-toolbar" slot="top" show={showCodeToolbar} />
        <CodeEditor classname="editor__code-editor" slot="bottom" />
      </Editor>
      <Preview classname="editor__preview-wrapper" slot="right">
        <PreviewToolbar classname="editor__preview-toolbar" slot="top" />
        <PreviewContent classname="editor__preview-content" slot="bottom" />
      </Preview>
    </Grid>
  </div>
{/if}
