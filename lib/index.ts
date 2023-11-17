export const makePath = (path: string) => browser.runtime.getURL(path);
export const getQuillModuleName = (name: string) => `modules/${name}`;
