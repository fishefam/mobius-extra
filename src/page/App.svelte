<script lang="ts">
  import { hotReload } from '@lib/util'

  import Tabs from './components/Tabs.svelte'

  // Remove this call in production
  hotReload()
</script>

<Tabs />

<style>
  :global(body) {
    font-family: 'Lucida Sans', Arial, sans-serif;
    height: 100vh;
  }
</style>
