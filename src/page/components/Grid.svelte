<script lang="ts">
  import Grid, { GridItem } from 'svelte-grid-extended'

  import CodeEditor from './CodeEditor.svelte'

  export let type: 'question' | 'feedback' | 'algorithm' | 'author-notes'
  let items = [{ h: 10, w: 10, x: 0, y: 0 }]
  // const handler = () => {
  //   items =
  //     items.length === 1
  //       ? [
  //           { h: 10, w: 7, x: 0, y: 0 },
  //           { h: 10, w: 3, x: 7, y: 0 },
  //         ]
  //       : [{ h: 10, w: 10, x: 0, y: 0 }]
  // }
  $: type
</script>

<Grid cols={10} rows={10} itemSize={{ height: 54 }}>
  {#each items as item}
    <GridItem
      bind:x={item.x}
      bind:y={item.y}
      bind:w={item.w}
      bind:h={item.h}
      max={{ h: 10, w: 7 }}
      min={{ h: 5, w: 3 }}
      class="editor__text-panel bg-white rounded-lg shadow overflow-y-scroll"
      resizerClass="pointer-event-none hidden"
      movable={false}
    >
      {#if type !== 'author-notes'}
        <CodeEditor {type} />
      {:else}
        <div />
      {/if}
    </GridItem>
  {/each}
</Grid>
