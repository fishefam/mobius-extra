import { addAssets, selectElement } from '@lib/dom'
import { resolveUrl, setStorageItems } from '@lib/util'

window.stop()
setStorageItems(['extensionUrl', resolveUrl('')])
;(selectElement('html') as HTMLElement).innerHTML =
  '<head><link rel="icon" href="../skins/default/favicon.ico"><title>Mobius</title></head><body></body>'

addAssets(['init.js'], 'js')
addAssets(['interface.css'], 'css')
