<script lang="ts">
  import { Toolbar, ToolbarButton, ToolbarGroup, Tooltip } from 'flowbite-svelte'
  import { AtomOutline, HtmlSolid, SalePercentOutline, UploadOutline } from 'flowbite-svelte-icons'
  import { selectElement } from 'lib/dom'
  import { store_type } from 'page/store'
  import type { Type } from 'types/utils'

  export let show = true
  let tooltipText = 'HTML'

  const typeButtons: { type: Type; tooltip: string }[] = [
    { tooltip: 'HTML', type: 'html' },
    { tooltip: 'CSS', type: 'css' },
    { tooltip: 'JavaScript', type: 'javascript' },
  ]

  store_type.subscribe((state) => {
    const classname = 'bg-indigo-300'
    const otherTypes = ['html', 'css', 'javascript'].filter((type) => type !== state)
    otherTypes.forEach((type) =>
      selectElement(`.editor__button-${type}`)?.classList.remove(classname),
    )
    selectElement(`.editor__button-${state}`)?.classList.add(classname)
  })
</script>

{#if show}
  <Toolbar color="indigo" embedded={false} class="rounded-none p-2 sticky top-0 left-0 z-10">
    <ToolbarGroup>
      {#each typeButtons as { tooltip, type }}
        <div
          class={`editor__toolbar-button editor__button-${type} rounded ${
            type === 'html' ? 'bg-indigo-300' : ''
          }`}
          role="button"
          tabindex="-1"
          on:mouseenter={() => (tooltipText = tooltip)}
        >
          <ToolbarButton
            class="focus:ring-4 m-0"
            color="indigo"
            on:click={() => store_type.set(type)}
          >
            {#if type === 'html'}
              <HtmlSolid class="w-6 h-6" />
            {:else if type === 'css'}
              <AtomOutline class="w-6 h-6" />
            {:else}
              <SalePercentOutline class="w-6 h-6" />
            {/if}
          </ToolbarButton>
        </div>
      {/each}
    </ToolbarGroup>
    <div
      class="editor__toolbar-button rounded"
      slot="end"
      role="button"
      tabindex="-1"
      on:mouseenter={() => (tooltipText = 'Save')}
    >
      <ToolbarButton class="focus:ring-4 m-0" color="green">
        <UploadOutline class="w-6 h-6" />
      </ToolbarButton>
    </div>
    <Tooltip
      triggeredBy=".editor__toolbar-button"
      placement="bottom"
      arrow={false}
      defaultClass="rounded-lg shadow-md tooltip py-2 px-3 text-sm font-medium bg-gray-600 text-gray-200 z-[10000]"
    >
      {tooltipText}
    </Tooltip>
  </Toolbar>
{/if}
