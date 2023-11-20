import { initMobiusData } from '@lib/mobius/editor';
import { MobiusInitData } from '@lib/types';

initMobiusData(main);

async function main(initMobiusData: MobiusInitData) {
  window.webext = { initMobiusData };
}
