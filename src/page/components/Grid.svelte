<script lang="ts">
  import { isWebCode } from '@lib/util'
  import { Badge, Button, Toolbar, Tooltip } from 'flowbite-svelte'
  import { AtomSolid, HtmlSolid, SalePercentSolid } from 'flowbite-svelte-icons'
  import Grid, { GridItem } from 'svelte-grid-extended'
  import type { TextCategory, TextType } from 'types/mobius'

  import CodeEditor from './CodeEditor.svelte'
  import PreviewHtml from './PreviewHtml.svelte'

  export let category: TextCategory
  // let items = [{ h: 10, w: 10, x: 0, y: 0 }]
  let items = [
    { h: 10, w: 6, x: 0, y: 0 },
    { h: 10, w: 4, x: 6, y: 0 },
  ]
  let tooltipText = 'HTML'
  let selected: TextType = 'html'
  // const handler = () => {
  //   items =
  //     items.length === 1
  //       ? [
  //           { h: 10, w: 7, x: 0, y: 0 },
  //           { h: 10, w: 3, x: 7, y: 0 },
  //         ]
  //       : [{ h: 10, w: 10, x: 0, y: 0 }]
  // }

  let buttons: TextType[] = ['html', 'css', 'javascript']
</script>

<Grid cols={10} rows={10} itemSize={{ height: 54 }}>
  {#each items as item, i}
    <GridItem
      bind:x={item.x}
      bind:y={item.y}
      bind:w={item.w}
      bind:h={item.h}
      max={{ h: 10, w: 7 }}
      min={{ h: 5, w: 3 }}
      class="editor__text-panel bg-white rounded-lg shadow overflow-y-scroll !select-text"
      resizerClass="pointer-event-none hidden"
      movable={false}
    >
      {#if isWebCode(category)}
        <Toolbar
          color="indigo"
          embedded={false}
          class="bg-indigo-200 rounded-b-none sticky top-0 z-40"
        >
          {#each buttons as btn}
            {#if i === 0}
              <Button
                class={`editor__toolbar-button w-6 h-10 m-1 focus:ring-2 transition-all ${
                  btn === selected ? 'bg-slate-700' : 'hover:bg-indigo-300'
                }`}
                on:mouseenter={() =>
                  (tooltipText = btn === 'html' ? 'HTML' : btn === 'css' ? 'CSS' : 'JavaScript')}
                on:click={() => (selected = btn)}
              >
                {#if btn === 'html'}
                  <HtmlSolid
                    color="indigo"
                    size="sm"
                    class={btn === selected ? 'text-white' : ''}
                  />
                {:else if btn === 'css'}
                  <AtomSolid
                    color="indigo"
                    size="sm"
                    class={btn === selected ? 'text-white' : ''}
                  />
                {:else}
                  <SalePercentSolid
                    color="indigo"
                    size="sm"
                    class={btn === selected ? 'text-white' : ''}
                  />
                {/if}
              </Button>
            {/if}
          {/each}
          <Badge class={`right-0 ${i === 0 ? 'absolute' : 'rounded-b-none h-12'}`} large>
            {i !== 0
              ? 'Preview'
              : selected === 'html'
                ? 'HTML'
                : selected === 'css'
                  ? 'CSS'
                  : 'JavaScript'}
          </Badge>

          {#if i === 0}
            <Tooltip triggeredBy=".editor__toolbar-button" placement="bottom" class="z-40">
              {tooltipText}
            </Tooltip>
          {/if}
        </Toolbar>
      {/if}

      {#if i === 0}
        <CodeEditor {category} type={selected} />
      {:else}
        <PreviewHtml {category} />
      {/if}
    </GridItem>
  {/each}
</Grid>
