export type FunctionCreateElementParams = {
  id?: string;
  classList?: string[];
  attributes?: { key: string; value: string }[];
  tag: keyof HTMLElementTagNameMap;
};
