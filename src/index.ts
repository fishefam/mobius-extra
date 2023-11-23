import { addAssets, selectElement } from '@lib/dom'

window.stop()
;(selectElement('html') as HTMLElement).innerHTML =
  '<head><link rel="icon" href="../skins/default/favicon.ico"><title>Mobius</title></head><body></body>'

addAssets(['app.js'], 'js')
addAssets(['app.css'], 'css')
