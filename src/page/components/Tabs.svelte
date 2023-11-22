<script lang="ts">
  import { useContentHeight } from '@page/hooks/tabs'
  import { TabItem, Tabs } from 'flowbite-svelte'
  import {
    BookmarkSolid,
    CodeSolid,
    ExclamationCircleSolid,
    QuestionCircleSolid,
  } from 'flowbite-svelte-icons'

  import Grid from './Grid.svelte'

  const { name } = webext.initMobiusData
  useContentHeight()
</script>

<Tabs class="editor__tabs" style="underline">
  <TabItem class="editor__tab-item editor__tab-item--disabled" disabled>
    <div slot="title" class="flex items-center gap-2 hover:cursor-default">
      {name}
    </div>
  </TabItem>
  <TabItem class="editor__tab-item" open>
    <div slot="title" class="flex items-center gap-2">
      <QuestionCircleSolid size="sm" />
      Question
    </div>
    <Grid type="question" />
  </TabItem>
  <TabItem class="editor__tab-item">
    <div slot="title" class="flex items-center gap-2">
      <BookmarkSolid size="sm" />
      Feedback
    </div>
    <Grid type="feedback" />
  </TabItem>
  <TabItem class="editor__tab-item">
    <div slot="title" class="flex items-center gap-2">
      <CodeSolid size="sm" />
      Algorithm
    </div>
    <Grid type="algorithm" />
  </TabItem>
  <TabItem class="editor__tab-item">
    <div slot="title" class="flex items-center gap-2">
      <ExclamationCircleSolid size="sm" />
      Author Notes
    </div>
    <Grid type="author-notes" />
  </TabItem>
</Tabs>
