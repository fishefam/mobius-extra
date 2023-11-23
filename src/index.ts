import { injectScript, selectElement } from 'lib/dom'
import { resolveUrl } from 'lib/util'

window.stop()
;(selectElement('html') as HTMLElement).innerHTML = `
  <head>
    <link rel="stylesheet" href="${resolveUrl('app.css')}">
    <link rel="icon" href="../skins/default/favicon.ico">
    <title>Mobius</title>
  </head>
  <body><div id="app"></div></body>
`
injectScript(['app.js'])
