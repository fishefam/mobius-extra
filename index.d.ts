/**
 * TypeScript declarations for the `@editorjs/header` package.
 * Provides heading blocks for Editor.js with configurable levels, placeholder text, and default levels.
 *
 * @see {@link https://github.com/editor-js/header}
 */

declare module '@editorjs/header' {
  /**
   * Configuration parameters for the Header tool.
   *
   * @property {string} [placeholder] - Placeholder text for the header.
   * @property {number[]} [levels] - Enabled heading levels (e.g., [2, 3, 4] for <h2>, <h3>, and <h4>).
   * @property {number} [defaultLevel] - Default level of the header (e.g., 3 for <h3>).
   */
  interface HeaderConfig {
    placeholder?: string;
    levels?: number[];
    defaultLevel?: number;
  }

  /**
   * The Header block tool for Editor.js, used to create and manage header blocks.
   *
   * @example
   * // To initialize the Header tool with Editor.js
   * const editor = new EditorJS({
   *   tools: {
   *     header: {
   *       class: Header,
   *       shortcut: 'CMD+SHIFT+H',
   *       config: {
   *         placeholder: 'Enter a header',
   *         levels: [2, 3, 4],
   *         defaultLevel: 3
   *       }
   *     }
   *   }
   * });
   */
  export default class Header {
    constructor(config?: HeaderConfig);

    // Additional methods and properties can be added here if the Header class
    // provides more functionality as per its implementation.
  }
}

declare module '@editorjs/list' {
  export default class List {}
}
