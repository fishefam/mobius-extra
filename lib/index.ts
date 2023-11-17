import { customAlphabet } from 'nanoid';

export const makePath = (path: string) => browser.runtime.getURL(path);
export const getQuillModuleName = (name: string) => `modules/${name}`;
export const nanoid = () => customAlphabet('qwertyuiopasdfghjklzxcvbnm1234567890', 13)();
