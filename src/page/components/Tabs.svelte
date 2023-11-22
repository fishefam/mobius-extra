<script lang="ts">
  import { selectElement } from '@lib/dom'
  import { TabItem, Tabs } from 'flowbite-svelte'
  import {
    BookmarkSolid,
    CodeSolid,
    ExclamationCircleSolid,
    QuestionCircleSolid,
  } from 'flowbite-svelte-icons'
  import { onMount } from 'svelte'

  const { name } = webext.initMobiusData
  let mainAreaHeight = 0

  onMount(() => {
    const tabBarContainer = selectElement<HTMLUListElement>('.tab-bar-container')
    const questionNameTabItem = selectElement<HTMLLIElement>('.question-name-tabitem')
    if (questionNameTabItem) {
      questionNameTabItem.classList.add('absolute', 'right-0', 'top-0')
      const wrapper = questionNameTabItem.firstElementChild as HTMLButtonElement
      if (wrapper)
        wrapper.className =
          'inline-block text-sm font-medium text-center p-4 border-b-2 border-transparent text-gray-500 dark:text-gray-400'
    }
    if (tabBarContainer) mainAreaHeight = window.innerHeight - tabBarContainer.scrollHeight
  })
</script>

<Tabs style="underline" class="tab-bar-container">
  <TabItem disabled class="text-red-400 question-name-tabitem">
    <div slot="title" class="flex items-center gap-2 hover:cursor-default">
      {name}
    </div>
  </TabItem>
  <TabItem open class="question-tab-item">
    <div slot="title" class="flex items-center gap-2 hover:text-red-900">
      <QuestionCircleSolid size="sm" />
      Question
    </div>
    <div style="height: {mainAreaHeight}px;">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Dashboard:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
    </div>
  </TabItem>
  <TabItem>
    <div slot="title" class="flex items-center gap-2">
      <BookmarkSolid size="sm" />
      Feedback
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Settings:</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua.
    </p>
  </TabItem>
  <TabItem>
    <div slot="title" class="flex items-center gap-2">
      <CodeSolid size="sm" />
      Algorithm
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Contacts:</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua.
    </p>
  </TabItem>
  <TabItem>
    <div slot="title" class="flex items-center gap-2">
      <ExclamationCircleSolid size="sm" />
      Author Notes
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Contacts:</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua.
    </p>
  </TabItem>
</Tabs>
