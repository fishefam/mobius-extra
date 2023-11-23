import { getInitData } from 'lib/mobius'
import { store_data } from 'page/store'
import { onMount } from 'svelte'

export const usePopulateData = () =>
  onMount(async () => {
    const initData = await getInitData()
    store_data.set(initData ?? { actionId: 'save' })
  })
