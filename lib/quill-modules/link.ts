import { selectElement } from '@lib/dom';
import Quill from 'quill';

export const quillModuleLink = (q: Quill, __: unknown) => {
  q.on('text-change', () => {
    const html = q.getText();
    const iframe = selectElement<HTMLIFrameElement>('#cke_1_contents iframe');
    const textarea = selectElement<HTMLTextAreaElement>('#cke_1_contents textarea');

    if (iframe && iframe.contentDocument) eval('CKEDITOR.tools.callFunction(4,this)');
    if (textarea) textarea.value = html;
  });
};
