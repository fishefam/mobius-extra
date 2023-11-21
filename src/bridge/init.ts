import { addAssets } from '@lib/dom'
import { initMobiusData } from '@lib/mobius'
import { getStorageItem } from '@lib/util'
import type { MobiusInitData } from 'types/mobius'

const main = async (data: MobiusInitData) => {
  window.webext = { initMobiusData: data }
  document.title = data.name ?? 'Mobius'
  addAssets(['interface.js'], 'js', getStorageItem('extensionUrl') ?? '')
}

initMobiusData(main)
