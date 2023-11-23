export type Section = 'question' | 'feedback' | 'algorithm' | 'authornotes'

export type ActionEndpoint = '/qbeditor/SaveDynamicInline.do' | '/contentmanager/DisplayQuestion.do'

export interface SaveData {
  AntiCsrfToken?: string
  actionId: 'savedraft'
  adaptive?: string
  algorithm?: string
  authorNotes?: string
  authorNotesEditor?: string
  classId?: string
  comment?: string
  commentEditor?: string
  customCss?: string
  hasUnsavedQuestion?: string
  name?: string
  questionText?: string
  repositoryPath?: string
  uid?: string
}

export interface InitData extends Omit<SaveData, 'actionId'> {
  a1?: string
  a2?: string
  a3?: string
  a4?: string
  a5?: string
  actionId: 'save'
  algoLibname?: string
  appliedThemes?: string
  b1?: string
  b2?: string
  b3?: string
  b4?: string
  b5?: string
  b6?: string
  c1?: string
  c2?: string
  c3?: string
  editor?: string
  groupId?: string
  id?: string
  m1?: string
  m2?: string
  mapleMode?: string
}

export interface PreviewData extends Omit<SaveData, 'actionId'>, Omit<InitData, 'actionId'> {
  actionId: 'preview'
}

export interface DisplayData extends Pick<SaveData, 'AntiCsrfToken'> {
  actionID: 'display'
  algorithmic?: string
  baseUrl?: string
  error?: string
  errorMsg?: string
  questionDefinition?: string
  slideNumber?: string
  version?: string
}
