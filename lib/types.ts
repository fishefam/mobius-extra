export type AssetType = 'css' | 'js';

export type CreateElementFunctionParams<T extends keyof HTMLElementTagNameMap> = {
  id?: string;
  classList?: string[];
  attributes?: { name: string; value: string }[];
  parent?: HTMLElement | string;
  tag: T;
  text?: string;
};

export type MobiusEditorQueryEndpoint = '/qbeditor/SaveDynamicInline.do' | '/contentmanager/DisplayQuestion.do';

export interface MobiusSaveData {
  AntiCsrfToken?: string;
  actionId: 'savedraft';
  adaptive?: string;
  algorithm?: string;
  authorNotes?: string;
  authorNotesEditor?: string;
  classId?: string;
  comment?: string;
  commentEditor?: string;
  customCss?: string;
  hasUnsavedQuestion?: string;
  name?: string;
  questionText?: string;
  repositoryPath?: string;
  uid?: string;
}

export interface MobiusInitData extends Omit<MobiusSaveData, 'actionId'> {
  a1?: string;
  a2?: string;
  a3?: string;
  a4?: string;
  a5?: string;
  actionId: 'save';
  algoLibname?: string;
  appliedThemes?: string;
  b1?: string;
  b2?: string;
  b3?: string;
  b4?: string;
  b5?: string;
  b6?: string;
  c1?: string;
  c2?: string;
  c3?: string;
  editor?: string;
  groupId?: string;
  id?: string;
  m1?: string;
  m2?: string;
  mapleMode?: string;
}

export interface MobiusPreviewData extends Omit<MobiusSaveData, 'actionId'>, Omit<MobiusInitData, 'actionId'> {
  actionId: 'preview';
}

export interface MobiusDisplayData extends Pick<MobiusSaveData, 'AntiCsrfToken'> {
  actionID: 'display';
  algorithmic?: string;
  baseUrl?: string;
  error?: string;
  errorMsg?: string;
  questionDefinition?: string;
  slideNumber?: string;
  version?: string;
}
