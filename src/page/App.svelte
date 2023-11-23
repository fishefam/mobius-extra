<script lang="ts">
  import { hotReload } from 'lib/util'

  import Editor from './components/Editor.svelte'
  import Grid from './components/Grid.svelte'
  import Preview from './components/Preview.svelte'
  import Tabs from './components/Tabs.svelte'
  import { usePopulateData } from './hooks/store'

  // Remove this call in production
  hotReload()
  usePopulateData()
</script>

<div class="editor font-sans h-screen">
  <Tabs />
  <Grid>
    <Editor slot="left" />
    <Preview slot="right" />
  </Grid>
</div>
