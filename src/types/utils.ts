export type Type = 'html' | 'css' | 'javascript'
export type AssetExt = 'css' | 'js'

export type Params_createElement<T extends keyof HTMLElementTagNameMap> = {
  id?: string
  classList?: string[]
  attributes?: { name: string; value: string }[]
  parent?: HTMLElement | string
  tag: T
  text?: string
}
