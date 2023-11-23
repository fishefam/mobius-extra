<script lang="ts">
  import { TabItem, Tabs } from 'flowbite-svelte'
  import {
    BookSolid,
    CodeSolid,
    ExclamationCircleSolid,
    QuestionCircleSolid,
  } from 'flowbite-svelte-icons'
  import type { TextCategory } from 'types/mobius'

  const tabs: { category: TextCategory; content: string; open?: boolean }[] = [
    { category: 'question', content: 'Question', open: true },
    { category: 'feedback', content: 'Feedback' },
    { category: 'algorithm', content: 'Algorithm' },
    { category: 'author-notes', content: 'Author Notes' },
  ]

  // useContentHeight()
</script>

<Tabs class="editor__tabs" style="underline">
  <TabItem class="editor__tab-item editor__tab-item--disabled" disabled>
    <div slot="title" class="flex items-center gap-2 hover:cursor-default">
      {name}
    </div>
  </TabItem>
  {#each tabs as { category, content, open }}
    <TabItem
      class="editor__tab-item"
      activeClasses="transition-all inline-block text-sm font-medium text-center p-4 text-red-500 border-b-2 border-red-500"
      {open}
    >
      <div slot="title" class="flex items-center gap-2">
        {#if category === 'question'}
          <QuestionCircleSolid size="sm" />
        {:else if category === 'feedback'}
          <BookSolid size="sm" />
        {:else if category === 'algorithm'}
          <CodeSolid size="sm" />
        {:else}
          <ExclamationCircleSolid size="sm" />
        {/if}
        {content}
      </div>
      <!-- <Grid {category} /> -->
    </TabItem>
  {/each}
</Tabs>
