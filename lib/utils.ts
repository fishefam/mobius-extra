import { customAlphabet } from 'nanoid';

/**
 * Constructs a fully qualified URL for an internal resource in the extension.
 *
 * @param {string} path - The specific path to be converted into a fully qualified URL.
 * @returns {string} The fully qualified URL.
 */
export const makePath = (path: string): string => browser.runtime.getURL(path);

/**
 * Generates a random alphanumeric string of length 5.
 *
 * @returns {string} A random string of length 5.
 */
export const nanoid = (): string => customAlphabet('qwertyuiopasdfghjklzxcvbnm', 5)();

/**
 * Extracts text content outside of script tags from the provided HTML string.
 *
 * @param {string} text - The HTML string to be processed.
 * @returns {string} Text content outside of script tags.
 */
export const extractHtmlString = (text: string): string =>
  text
    .match(/(.|\n)*<script>|<\/script>(.|\n)*/gim)
    ?.map((m) => m.replace(/<\/?script>/g, ''))
    .join('\n') ?? '';

/**
 * Extracts content within script tags from the provided HTML string.
 *
 * @param {string} text - The HTML string to be processed.
 * @returns {string} Script content from the HTML string.
 */
export const extractScriptString = (text: string): string =>
  text.match(/<script>(.|\n)*<\/script>/gim)?.join('\n') ?? '';

/**
 * Sets the provided variables as properties on a global `WebExtension` object.
 *
 * @param {...{ key: string | number; value: unknown }} vars - Variables to be set globally.
 */
export const makeVarsGlobal = (...vars: { key: string | number; value: unknown }[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).WebExtension = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vars.forEach(({ key, value }) => ((window as any).WebExtension[`${key}`] = value));
};
