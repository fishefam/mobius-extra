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
 * Creates a new HTML element of a given type with specified attributes, classes, and an ID.
 *
 * @template T - The type of the HTML element to be created. It extends from HTMLElement.
 * @param {Object} param0 - An object containing properties to define the element.
 * @param {keyof HTMLElementTagNameMap} param0.tag - The tag name of the element to be created.
 * @param {string} [param0.id] - The ID to assign to the element. Optional.
 * @param {string[]} [param0.classList] - An array of class names to add to the element. Optional.
 * @param {Object[]} [param0.attributes] - An array of attribute objects to set on the element. Optional.
 * @param {string} param0.attributes[].key - The attribute name.
 * @param {string} param0.attributes[].value - The attribute value.
 * @returns {T} - The created HTML element, typed as T.
 *
 * @example
 * // Creating a button with an ID, class, and custom attribute
 * const button = createElement<HTMLButtonElement>({
 *   tag: 'button',
 *   id: 'submitBtn',
 *   classList: ['btn', 'btn-primary'],
 *   attributes: [{ key: 'type', value: 'submit' }],
 * });
 * document.body.appendChild(button);
 */
export const createElement = <T extends HTMLElement>({
  tag,
  id,
  classList,
  attributes,
}: FunctionCreateElementParams): T => {
  const element = document.createElement(tag);
  if (id) element.id = id;
  if (classList) classList.forEach((c) => element.classList.add(c));
  if (attributes) attributes.forEach(({ key, value }) => element.setAttribute(key, value));
  return element as T;
};
