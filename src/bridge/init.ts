import { initCodeEditor } from '@lib/codemirror'
import { addAssets } from '@lib/dom'
import { initMobiusData } from '@lib/mobius'
import { getStorageItem } from '@lib/util'
import type { MobiusInitData } from 'types/mobius'

const main = async (data: MobiusInitData) => {
  window.webext = { codemirror: [], initMobiusData: data }
  const { editor, commentEditor, authorNotes, algorithm } = data
  webext.codemirror = await Promise.all([
    initCodeEditor('question', 'html', editor),
    initCodeEditor('question', 'css', editor),
    initCodeEditor('question', 'javascript', editor),
    initCodeEditor('feedback', 'html', commentEditor),
    initCodeEditor('feedback', 'css', commentEditor),
    initCodeEditor('feedback', 'javascript', commentEditor),
    initCodeEditor('author-notes', 'html', authorNotes),
    initCodeEditor('algorithm', 'html', algorithm),
  ])
  document.title = data.name ?? 'Mobius'
  addAssets(['interface.js'], 'js', getStorageItem('extensionUrl') ?? '')
}

initMobiusData(main)
