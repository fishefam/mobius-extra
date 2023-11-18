import { createElement } from '@lib/dom';
import Quill from 'quill';

export const createCodeEditor = ({
  parent,
  id,
  defaultContent,
}: {
  parent: HTMLElement;
  defaultContent?: string;
  id?: string;
}) => {
  const outerContainer = createElement({ tag: 'div', id, classList: ['quill-code-container'], parent });
  const innerContainer = createElement({ tag: 'div', parent: outerContainer });
  const quill = new Quill(innerContainer, { theme: 'snow' });
  if (defaultContent) quill.setText(defaultContent);
  return [quill, outerContainer];
};
