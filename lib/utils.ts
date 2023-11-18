import { customAlphabet } from 'nanoid';

/**
 * Constructs a fully qualified URL for an internal resource in the extension.
 *
 * @param path - The specific path to be converted into a fully qualified URL.
 * @returns The fully qualified URL.
 */
export const makePath = (path: string): string => browser.runtime.getURL(path);

/**
 * Generates a random alphanumeric string of length 5.
 *
 * @returns A random string of length 5.
 */
export const nanoid = (): string => customAlphabet('qwertyuiopasdfghjklzxcvbnm', 5)();

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
    .join('\n') ?? '';

/**
 * Extracts text content outside of script tags from the provided HTML string.
 *
 * @param text - The HTML string to be processed.
 * @returns Text content outside of script tags.
 */
export const extractHtmlString = (text: string): string => {
  let temp = text.slice();
  const firstMatch = temp.match(/<script>(.|\n)*<\/script>/gim)?.[0] ?? '';
  temp = temp.replace(firstMatch, '').trim();
  if (temp.match(/<script>(.|\n)*<\/script>/gim)?.length) extractHtmlString(temp);
  return temp;
};

/**
 * Sets the provided variables as properties on a global `WebExtension` object.
 *
 * @param vars - Variables to be set globally.
 */
export const makeVarsGlobal = (...vars: { key: string | number; value: unknown }[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).WebExtension = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vars.forEach(({ key, value }) => ((window as any).WebExtension[`${key}`] = value));
};
