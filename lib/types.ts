export type FunctionCreateElementParams<T extends keyof HTMLElementTagNameMap> = {
  id?: string;
  classList?: string[];
  attributes?: { key: string; value: string }[];
  tag: T;
};
