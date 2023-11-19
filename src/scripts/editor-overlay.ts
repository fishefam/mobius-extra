import {
  initMobiusData,
  makeMobiusDisplayData,
  makeMobiusPreviewData,
  queryMobiusDocument,
  serializeMobiusData,
} from '@lib/mobius/editor';
import { MobiusInitData } from '@lib/types';

initMobiusData(main);

async function main(data: MobiusInitData) {
  const saveData = makeMobiusPreviewData(data, {
    algorithm: data.algorithm,
    questionText: data.editor,
  });
  const serializedData = serializeMobiusData(saveData);
  const response = await queryMobiusDocument('save-or-get-preview-data', serializedData);
  const previewData = await response.json();
  const displayData = makeMobiusDisplayData(data, previewData);
  const response1 = await queryMobiusDocument('display', serializeMobiusData(displayData));
  const display = await response1.text();
  console.log(display);
}
