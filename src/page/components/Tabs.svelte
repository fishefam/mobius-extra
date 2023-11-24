<script lang="ts">
  import { TabItem, Tabs } from 'flowbite-svelte'
  import {
    BookSolid,
    CodeSolid,
    ExclamationCircleSolid,
    QuestionCircleSolid,
  } from 'flowbite-svelte-icons'
  import { useSubscribe } from 'page/hooks/store'
  import { store_data, store_section } from 'page/store'
  import type { Section } from 'types/mobius'

  export let classname: string
  let title: string

  const tabs: { section: Section; content: string; open?: boolean }[] = [
    { content: 'Question', open: true, section: 'question' },
    { content: 'Feedback', section: 'feedback' },
    { content: 'Algorithm', section: 'algorithm' },
    { content: 'Author Notes', section: 'authornotes' },
  ]

  useSubscribe({ func: (state) => (title = state.name ?? ''), store: store_data })
</script>

<Tabs class={classname} style="underline">
  <TabItem class="editor__tab-item editor__tab-item--disabled hover:bg-transparent" disabledv>
    <div slot="title" class="flex items-center gap-2 hover:cursor-default">
      {title}
    </div>
  </TabItem>
  {#each tabs as { section, content, open }}
    <TabItem
      class="editor__tab-item"
      {open}
      activeClasses="inline-block text-sm font-medium text-center p-4 text-red-600 border-b-2 border-red-600 active"
      on:click={() => store_section.set(section)}
    >
      <div slot="title" class="flex items-center gap-2">
        {#if section === 'question'}
          <QuestionCircleSolid size="sm" />
        {:else if section === 'feedback'}
          <BookSolid size="sm" />
        {:else if section === 'algorithm'}
          <CodeSolid size="sm" />
        {:else}
          <ExclamationCircleSolid size="sm" />
        {/if}
        {content}
      </div>
    </TabItem>
  {/each}
</Tabs>
