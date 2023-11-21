export type AssetType = 'css' | 'js'

export type CreateElementFunctionParams<T extends keyof HTMLElementTagNameMap> = {
  id?: string
  classList?: string[]
  attributes?: { name: string; value: string }[]
  parent?: HTMLElement | string
  tag: T
  text?: string
}
