<script lang="ts">
  import { hotReload } from '@lib/util'

  import Tabs from './components/Tabs.svelte'
  import { useStore } from './hooks/state'

  // Remove this call in production
  hotReload()

  useStore()
</script>

<main class="editor h-screen font-sans">
  <Tabs />
</main>
