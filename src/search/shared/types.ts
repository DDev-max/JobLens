export interface FiltersType {
  salaryDesc: [boolean] | []
  location: [string] | []
  skills: string[]
}

export enum SupportedLanguages {
  EN = 'English',
  ES = 'Español',
}

export type InputsSearchName = 'position' | 'skills' | 'location'

export type SupportedLanguageKeys = keyof typeof SupportedLanguages
