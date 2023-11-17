export const addClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.add(c));

export const removeClasses = (element: HTMLElement, ...classnames: string[]) =>
  classnames.forEach((c) => element.classList.remove(c));

export const selectElement = <T extends HTMLElement>(selector: string): T | null => document.querySelector(selector);

export const getFormData = (form: HTMLFormElement | string, key: string) =>
  new FormData(typeof form === 'string' ? (selectElement<HTMLFormElement>(form) as HTMLFormElement | undefined) : form)
    .get(key)
    ?.toString();
