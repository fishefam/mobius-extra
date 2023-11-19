import { makeMobiusData, saveMobiusDocument } from '@lib/mobius/editor';

const queryData = makeMobiusData();
console.log(queryData);

saveMobiusDocument(queryData);
