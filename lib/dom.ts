import type { FunctionCreateElementParams } from './types';

/**
 * Adds one or more class names to an element.
 *
 * @param element - The HTML element to which classes will be added.
 * @param classnames - One or more class names to add to the element.
 */
export const addClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.add(c));

/**
 * Removes one or more class names from an element.
 *
 * @param element - The HTML element from which classes will be removed.
 * @param classnames - One or more class names to remove from the element.
 */
export const removeClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.remove(c));

/**
 * Selects the first element within the document that matches the specified selector.
 *
 * @template T - The type of the HTML element to be selected.
 * @param selector - A DOMString containing one or more selectors to match.
 * @returns The first element that matches the specified selector, or null if no matches are found.
 */
export const selectElement = <T extends HTMLElement>(selector: string): T | null => document.querySelector(selector);

/**
 * Retrieves the string value of a named field from a form.
 *
 * @param form - A reference to the form element or a string selector for the form.
 * @param key - The name of the form field whose value is to be retrieved.
 * @returns The string value of the form field if found, or all values.
 */
export const getFormData = <T extends string | number, U = { [k in T]: FormDataEntryValue }>(
  form: HTMLFormElement | string,
  key?: T,
): U => {
  const data = Object.fromEntries(
    new FormData(
      typeof form === 'string' ? (selectElement<HTMLFormElement>(form) as HTMLFormElement | undefined) : form,
    ),
  ) as { [k in T]: FormDataEntryValue };
  if (key) return data[key] as U;
  return data as U;
};

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
export const attachElement = (node: HTMLElement, target: HTMLElement) => target.appendChild(node);

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
}: FunctionCreateElementParams<T>): HTMLElementTagNameMap[T] => {
  const element = document.createElement<T>(tag as T);
  if (id) element.id = id;
  if (classList) classList.forEach((c) => element.classList.add(c));
  if (attributes) attributes.forEach(({ key, value }) => element.setAttribute(key, value));
  if (parent && typeof parent === 'string') {
    const parentElement = selectElement(parent);
    if (parentElement) attachElement(element, parentElement);
    if (!parentElement) console.log(`The parent element of the new element below is null\n`, element);
  }
  if (parent && typeof parent !== 'string') attachElement(element, parent);
  return element;
};
