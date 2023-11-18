import type { FunctionCreateElementParams } from './types';

/**
 * Adds one or more class names to an element.
 *
 * @param {HTMLElement} element - The HTML element to which classes will be added.
 * @param {...string} classnames - One or more class names to add to the element.
 */
export const addClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.add(c));

/**
 * Removes one or more class names from an element.
 *
 * @param {HTMLElement} element - The HTML element from which classes will be removed.
 * @param {...string} classnames - One or more class names to remove from the element.
 */
export const removeClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.remove(c));

/**
 * Selects the first element within the document that matches the specified selector.
 *
 * @template T - The type of the HTML element to be selected.
 * @param {string} selector - A DOMString containing one or more selectors to match.
 * @returns {T | null} The first element that matches the specified selector, or null if no matches are found.
 */
export const selectElement = <T extends HTMLElement>(selector: string): T | null => document.querySelector(selector);

/**
 * Retrieves the string value of a named field from a form.
 *
 * @param {HTMLFormElement | string} form - A reference to the form element or a string selector for the form.
 * @param {string} key - The name of the form field whose value is to be retrieved.
 * @returns {string | undefined} The string value of the form field if found, or undefined if not found.
 */
export const getFormData = (form: HTMLFormElement | string, key: string): string | undefined =>
  new FormData(typeof form === 'string' ? (selectElement<HTMLFormElement>(form) as HTMLFormElement | undefined) : form)
    .get(key)
    ?.toString();

/**
 * Appends a specified node (HTMLElement) to a target HTMLElement.
 *
 * @param {HTMLElement} node - The node to be appended.
 * @param {HTMLElement} target - The target HTMLElement to which the node will be appended.
 *
 * @example
 * const newDiv = document.createElement('div');
 * const parentDiv = document.getElementById('parentDiv');
 * attachElement(newDiv, parentDiv);
 */
export const attachElement = (node: HTMLElement, target: HTMLElement) => target.appendChild(node);

/**
 * Creates a new HTML element of a given type with specified attributes, classes, an ID, and optionally appends it to a specified parent.
 *
 * @template T - A generic type extending keyof HTMLElementTagNameMap, representing the tag name of the element.
 * @param {Object} params - An object containing parameters for creating the element.
 * @param {keyof HTMLElementTagNameMap} params.tag - The tag name of the element to create.
 * @param {string} [params.id] - Optional ID for the element.
 * @param {string[]} [params.classList] - Optional array of class names for the element.
 * @param {Array<{key: string, value: string}>} [params.attributes] - Optional array of attributes to set on the element.
 * @param {HTMLElement | string} [params.parent] - Optional parent element or selector to which the created element will be appended.
 * @returns {HTMLElementTagNameMap[T]} The newly created element.
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
}: FunctionCreateElementParams<T>): HTMLElementTagNameMap[T] => {
  const element = document.createElement<T>(tag as T);
  if (id) element.id = id;
  if (classList) classList.forEach((c) => element.classList.add(c));
  if (attributes) attributes.forEach(({ key, value }) => element.setAttribute(key, value));
  if (parent && typeof parent === 'string') {
    const parentElement = selectElement(parent);
    if (parentElement) attachElement(element, parentElement);
  }
  if (parent && typeof parent !== 'string') attachElement(element, parent);
  return element;
};
