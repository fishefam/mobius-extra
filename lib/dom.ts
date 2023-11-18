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
