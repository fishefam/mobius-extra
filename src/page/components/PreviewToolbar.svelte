<script lang="ts">
  import { Toolbar } from 'flowbite-svelte'
  export let classname: string
</script>

<Toolbar
  class={`${classname} rounded-none p-2 sticky top-0 left-0 z-10`}
  color="indigo"
  embedded={false}
>
  <div class="p-1.5 text-green-500 m-0">Preview</div>
</Toolbar>
