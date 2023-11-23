import katex from 'katex'

export const getKatexStrings = (rawText: string) =>
  rawText
    .match(/\\\((.|\n|\r)*?\\\)/g)
    ?.map((v) => katex.renderToString(v.replace(/\\\(|\\\)/g, '').replace(/\$/g, '\\$')))

export const replaceResursively = (katexes: string[], text: string) => {
  let temp = text.slice()
  const clone = katexes.slice()
  temp = temp.replace(/\\\((.|\n|\r)*?\\\)/, clone[0])
  clone.shift()
  if (katexes.length > 0) temp = replaceResursively(clone, temp)
  return temp
}

export const convertKatexToMathml = (katex: string) =>
  replaceResursively(getKatexStrings(katex) ?? [], katex)
