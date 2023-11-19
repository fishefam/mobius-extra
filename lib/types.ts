export type FunctionCreateElementParams<T extends keyof HTMLElementTagNameMap> = {
  id?: string;
  classList?: string[];
  attributes?: { key: string; value: string }[];
  parent?: HTMLElement | string;
  tag: T;
};

export type MobiusEditorFormDataKeys =
  | 'AntiCsrfToken'
  | 'a1'
  | 'a2'
  | 'a3'
  | 'a4'
  | 'a5'
  | 'actionId'
  | 'adaptive'
  | 'algoLibname'
  | 'algorithm'
  | 'appliedThemes'
  | 'authorNotes'
  | 'authorNotesEditor'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'b4'
  | 'b5'
  | 'b6'
  | 'c1'
  | 'c2'
  | 'c3'
  | 'classId'
  | 'comment'
  | 'commentEditor'
  | 'customCss'
  | 'editor'
  | 'groupId'
  | 'hasUnsavedQuestion'
  | 'id'
  | 'm1'
  | 'm2'
  | 'mapleMode'
  | 'name'
  | 'questionText'
  | 'repositoryPath'
  | 'uid';

export type MobiusPostRequestParams =
  | 'classId'
  | 'adaptive'
  | 'name'
  | 'questionText'
  | 'authorNotes'
  | 'authorNotesEditor'
  | 'algorithm'
  | 'customCss'
  | 'comment'
  | 'commentEditor'
  | 'uid'
  | 'actionId'
  | 'hasUnsavedQuestion'
  | 'AntiCsrfToken';
