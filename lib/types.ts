export type FunctionCreateElementParams<T extends keyof HTMLElementTagNameMap> = {
  id?: string;
  classList?: string[];
  attributes?: { key: string; value: string }[];
  parent?: HTMLElement | string;
  tag: T;
};
