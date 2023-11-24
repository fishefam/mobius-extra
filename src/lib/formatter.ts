import babelPlugin from 'prettier/plugins/babel'
import estreePlugin from 'prettier/plugins/estree'
import htmlPlugin from 'prettier/plugins/html'
import cssPlugin from 'prettier/plugins/postcss'
import { format } from 'prettier/standalone'
import type { Type } from 'types/utils'

export const prettier = (text: string, type: Type) =>
  format(text, {
    htmlWhitespaceSensitivity: 'ignore',
    parser: type === 'javascript' ? 'babel' : type,
    plugins:
      type === 'javascript'
        ? [babelPlugin, estreePlugin]
        : [type === 'html' ? htmlPlugin : cssPlugin],
    printWidth: 80,
  })
