import { createCodeEditor } from '@lib/components/code-editor';
import { createElement } from '@lib/dom';
import { getMobiusEditorData } from '@lib/mobius/editor';
import { extractHtmlString, extractScriptString, formatHtml } from '@lib/utils';

const main = async () => {
  const data = getMobiusEditorData('editor') as string;
  const [html, script] = await Promise.all(
    [extractHtmlString(data), extractScriptString(data)].map((d) => formatHtml(d)),
  );

  const overlayElement = createElement({ tag: 'main', classList: ['editor-overlay'], parent: document.body });
  const codeEditor = createCodeEditor({ parent: overlayElement, id: 'section-question-code', defaultContent: html });
};

main();
