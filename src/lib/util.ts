export const resolveUrl = (path: string) => browser.runtime.getURL(path)
export const setStorageItems = (...items: [string, string][]) =>
  items.forEach(([key, value]) => localStorage.setItem(key, value))
export const getStorageItem = (key: string) => localStorage.getItem(key)
/**
 * Extracts content within script tags from the provided HTML string.
 *
 * @param text - The HTML string to be processed.
 * @returns Script content from the HTML string.
 */
export const extractScriptString = (text: string): string =>
  text
    .match(/<script>(.|\n)*<\/script>/gim)
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
  const firstMatch = temp.match(/<script>(.|\n)*<\/script>/gim)?.[0] ?? ''
  temp = temp.replace(firstMatch, '').trim()
  if (temp.match(/<script>(.|\n)*<\/script>/gim)?.length) extractHtmlString(temp)
  return temp
}

/**
 * Sets the provided variables as properties on a global `WebExtProps` object.
 *
 * @param vars - Variables to be set globally.
 */
export const makeVarsGlobal = (...vars: [string | number, PropertyDescriptor][]) => {
  if (!webext) window.webext = { initMobiusData: { actionId: 'save' } }
  vars.forEach(([key, value]) => Object.defineProperty(webext, key, value))
}

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
