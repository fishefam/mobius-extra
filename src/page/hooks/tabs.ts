import { selectElement } from '@lib/dom'
import { onMount } from 'svelte'

export const useContentHeight = () =>
  onMount(() => {
    const container = selectElement('.editor')
    const tabs = selectElement<HTMLUListElement>('.editor__tabs')
    const separator = selectElement<HTMLDivElement>('.editor > *:nth-child(2)')
    const content = selectElement<HTMLDivElement>('.editor > *:nth-child(3)')
    if (container && tabs && separator && content)
      content.style.height =
        container.clientHeight - tabs.scrollHeight - separator.scrollHeight + 'px'
  })
