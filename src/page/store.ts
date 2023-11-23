import { writable } from 'svelte/store'
import type { InitData, Section } from 'types/mobius'
import type { Type } from 'types/utils'

export const store_data = writable<InitData>({ actionId: 'save' })
export const store_section = writable<Section>('question')
export const store_type = writable<Type>('html')
export const store_preview_html = writable('')
