import type { TextCategory } from 'types/mobius'

export const resolveUrl = (path: string) => browser.runtime.getURL(path)
export const setStorageItems = (...items: [string, string][]) =>
  items.forEach(([key, value]) => localStorage.setItem(key, value))
export const getStorageItem = (key: string) => localStorage.getItem(key)

/**
 * extracts content within script tags from the provided html string.
 *
 * @param text - The HTML string to be processed.
 * @returns Script content from the HTML string.
 */
export const extractCssString = (text: string): string =>
  text
    .match(/<style(.|\n)*\/style>/gim)
    ?.map((s) => s.trim())
    .join('\n') ?? ''

/**
 * extracts content within script tags from the provided html string.
 *
 * @param text - The HTML string to be processed.
 * @returns Script content from the HTML string.
 */
export const extractScriptString = (text: string): string =>
  text
    .match(/<script(.|\n)*\/script>/gim)
    ?.map((s) => s.trim())
    .join('\n') ?? ''

/**
 * Extracts text content outside of script tags from the provided HTML string.
 *
 * @param text - The HTML string to be processed.
 * @returns Text content outside of script tags.
 */
export const extractHtmlString = (text: string): string => {
  let temp = text.slice()
  const firstScriptMatch = temp.match(/<script(.|\n)*\/script>/gim)?.[0] ?? ''
  const firstCssMatch = temp.match(/<style(.|\n)*\/style>/gim)?.[0] ?? ''
  temp = temp.replace(firstScriptMatch, '').replace(firstCssMatch, '').trim()
  if (temp.match(/<script>(.|\n)*<\/script>/gim)?.length) extractHtmlString(temp)
  return temp
}

export const removeWrapperTag = (html: string, markingAttribute = 'data--wrapper') => {
  const openingTag = html
    .trim()
    .match(new RegExp(`^<.* ${markingAttribute}`, 'gi'))?.[0]
    .slice(1)
    .replace(markingAttribute, '')
    .trim()
  const closingTag = html
    .trim()
    .match(/<\/.*>$/gi)?.[0]
    .slice(2, -1)
  if (openingTag && closingTag && openingTag === closingTag)
    return html
      .trim()
      .replace(/(^<.*>)|(<\/.*>$)/gi, '')
      .trim()
  return html
    .trim()
    .replace(/<style.*>|<\/style>|<script.*>|<\/script>/gim, '')
    .trim()
}

export const wrapHtml = (html: string, uid: string, markingAttribute = 'data--wrapper') =>
  `<div ${markingAttribute}="${uid}">${html}</div>`

export const wrapCss = (css: string) => `<style>${css}</style>`
export const wrapJavascript = (script: string) => `<script>${script}</script>`

/**
 * Determines if the provided element is a HTMLScriptElement.
 *
 * @param element - The element to check.
 * @returns True if the element is a HTMLScriptElement, false otherwise.
 */
export const isScript = (element: HTMLScriptElement | unknown): element is HTMLScriptElement => {
  return element instanceof HTMLScriptElement
}

/**
 * Determines if the provided element is a HTMLLinkElement.
 *
 * @param element - The element to check.
 * @returns True if the element is a HTMLLinkElement, false otherwise.
 */
export const isCSS = (element: HTMLLinkElement | unknown): element is HTMLLinkElement => {
  return element instanceof HTMLLinkElement
}

export const hotReload = () => {
  console.clear()
  console.log('Development Session Started.\n\nRemove hotReload() in App.svelte in production.')
  new EventSource('http://localhost:4224/esbuild').addEventListener(
    'change',
    () => (window.location = window.location),
  )
}

export const getGlobalVarKey = (...names: string[]) => names.join('_')

export const isWebCode = (category: TextCategory) => /question|feedback/gi.test(category)

export const joinCode = (html: string, css?: string, script?: string) =>
  `${wrapHtml(html, webext.initMobiusData.uid ?? '')}\n${wrapCss(css ?? '')}\n${wrapJavascript(
    script ?? '',
  )}`
