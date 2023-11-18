import { customAlphabet } from 'nanoid';

export const makePath = (path: string) => browser.runtime.getURL(path);
export const nanoid = () => customAlphabet('qwertyuiopasdfghjklzxcvbnm', 5)();
