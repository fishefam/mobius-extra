<script lang="ts">
  import { Button, Toolbar, Tooltip } from 'flowbite-svelte'
  import { AtomSolid, HtmlSolid, SalePercentSolid } from 'flowbite-svelte-icons'
  import Grid, { GridItem } from 'svelte-grid-extended'
  import type { TextCategory, TextType } from 'types/mobius'

  import CodeEditor from './CodeEditor.svelte'

  export let category: TextCategory
  let items = [{ h: 10, w: 10, x: 0, y: 0 }]
  let tooltipText = 'HTML'
  let type: TextType = 'html'
  // const handler = () => {
  //   items =
  //     items.length === 1
  //       ? [
  //           { h: 10, w: 7, x: 0, y: 0 },
  //           { h: 10, w: 3, x: 7, y: 0 },
  //         ]
  //       : [{ h: 10, w: 10, x: 0, y: 0 }]
  // }
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
      <Toolbar color="blue" embedded={false} class="rounded-b-none sticky">
        <Button
          class={`hover:bg-indigo-200 w-6 h-10 m-1 ${type === 'html' ? 'bg-indigo-200' : ''}`}
          on:mouseenter={() => (tooltipText = 'HTML')}
          on:click={() => {
            type = 'html'
          }}
          name="toolbar-button-html"
        >
          <HtmlSolid color="indigo" class="w-4 h-w-4" />
        </Button>
        <Button
          class={`hover:bg-indigo-200 w-6 h-10 m-1 ${type === 'css' ? 'bg-indigo-200' : ''}`}
          on:mouseenter={() => (tooltipText = 'CSS')}
          on:click={() => {
            type = 'css'
          }}
          name="toolbar-button-css"
        >
          <AtomSolid color="indigo" class="w-4 h-w-4" />
        </Button>
        <Button
          class={`hover:bg-indigo-200 w-6 h-10 m-1 ${type === 'javascript' ? 'bg-indigo-200' : ''}`}
          on:mouseenter={() => (tooltipText = 'Javascript')}
          on:click={() => {
            type = 'javascript'
          }}
          name="toolbar-button-javascript"
        >
          <SalePercentSolid color="indigo" class="w-4 h-w-4" />
        </Button>
        <Tooltip triggeredBy="[name^='toolbar-button']" placement="bottom" class="z-40">
          {tooltipText}
        </Tooltip>
      </Toolbar>
      {#if category !== 'author-notes'}
        <CodeEditor {category} {type} />
      {:else}
        <div />
      {/if}
    </GridItem>
  {/each}
</Grid>
