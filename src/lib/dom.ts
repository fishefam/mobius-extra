import type { Params_createElement } from 'types/utils'

import { isCSS, isScript, resolveUrl } from './util'

/**
 * Adds one or more class names to an element.
 *
 * @param element - The HTML element to which classes will be added.
 * @param classnames - One or more class names to add to the element.
 */
export const addClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.add(c))

/**
 * Removes one or more class names from an element.
 *
 * @param element - The HTML element from which classes will be removed.
 * @param classnames - One or more class names to remove from the element.
 */
export const removeClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.remove(c))

/**
 * Selects the first element within the document that matches the specified selector.
 *
 * @template T - The type of the HTML element to be selected.
 * @param selector - A DOMString containing one or more selectors to match.
 * @returns The first element that matches the specified selector, or null if no matches are found.
 */
export const selectElement = <T extends HTMLElement>(selector: string): T | null =>
  document.querySelector<T>(selector)

/**
 * Retrieves the string value of a named field from a form.
 *
 * @param form - A reference to the form element or a string selector for the form.
 * @param key - The name of the form field whose value is to be retrieved.
 * @returns The string value of the form field if found, or all values.
 */
export const getFormData = <T>(form: HTMLFormElement | string): T => {
  const data = Object.fromEntries(
    new FormData(
      typeof form === 'string'
        ? (selectElement<HTMLFormElement>(form) as HTMLFormElement | undefined)
        : form,
    ),
  )
  return data as T
}

/**
 * Appends a specified node (HTMLElement) to a target HTMLElement.
 *
 * @param node - The node to be appended.
 * @param target - The target HTMLElement to which the node will be appended.
 *
 * @example
 * const newDiv = document.createElement('div');
 * const parentDiv = document.getElementById('parentDiv');
 * attachElement(newDiv, parentDiv);
 */
export const attachElement = (node: HTMLElement, target: HTMLElement) => target.appendChild(node)

/**
 * Creates a new HTML element of a given type with specified attributes, classes, an ID, and optionally appends it to a specified parent.
 *
 * @template T - A generic type extending keyof HTMLElementTagNameMap, representing the tag name of the element.
 * @param params - An object containing parameters for creating the element.
 * @param params.tag - The tag name of the element to create.
 * @param [params.id] - Optional ID for the element.
 * @param [params.classList] - Optional array of class names for the element.
 * @param [params.attributes] - Optional array of attributes to set on the element.
 * @param [params.parent] - Optional parent element or selector to which the created element will be appended.
 * @returns The newly created element.
 *
 * @example
 * // Example of creating a button element with classes and appending it to a parent div
 * const button = createElement({
 *   tag: 'button',
 *   classList: ['btn', 'btn-primary'],
 *   parent: '#parentDiv'
 * });
 */
export const createElement = <T extends keyof HTMLElementTagNameMap>({
  tag,
  id,
  classList,
  attributes,
  parent,
  text,
}: Params_createElement<T>): HTMLElementTagNameMap[T] => {
  const element = document.createElement<T>(tag as T)
  if (id) element.id = id
  if (text) element.textContent = text
  if (classList) classList.forEach((c) => element.classList.add(c))
  if (attributes) attributes.forEach(({ name, value }) => element.setAttribute(name, value))
  if (parent && typeof parent === 'string') {
    const parentElement = selectElement(parent)
    if (parentElement) attachElement(element, parentElement)
  }
  if (parent && typeof parent !== 'string') attachElement(element, parent)
  return element
}

/**
 * Adds a hidden input field to a specified form.
 *
 * @param form - The form element to which the new input field will be added.
 * @param name - The name attribute for the new input field.
 * @param value - The value to be set for the new input field.
 *
 * @example
 * // Assuming there is a form element with the ID 'myForm'
 * const formElement = document.getElementById('myForm');
 * populateForm(formElement, 'hiddenFieldName', 'hiddenFieldValue');
 */
export const populateForm = (form: HTMLFormElement, name: string, value: string) => {
  const input = createElement({
    attributes: [
      { name: 'type', value: 'hidden' },
      { name: 'name', value: name },
      { name: 'value', value },
    ],
    tag: 'input',
  })
  form.appendChild(input)
}

/**
 * Adds an array of assets to the document.
 *
 * @param assets - An array of asset filenames to be added.
 * @param ext - The type of the assets ('css' or 'js').
 */
export function injectScript(assets: string[]) {
  for (const asset of assets) addAsset(asset)
}

/**
 * Creates and appends a script or link element to the document head for the given asset.
 *
 * @param asset - The filename of the asset to be added.
 * @param ext - The type of the asset ('css' or 'js').
 */
function addAsset(asset: string) {
  const path = resolveUrl(asset)
  const element = document.createElement('script')
  if (isScript(element)) element.src = path
  if (isCSS(element)) {
    element.rel = 'stylesheet'
    element.href = path
  }
  document.head.append(element)
  // console.log(`Injection: ${path}`);
}
