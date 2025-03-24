export interface JobDescription {
  id: string
  jobTitle: string
  orgName: string
  location: string
  salary: string
  skills: string[]
  jobAge: string
  imgSrc: string
  jobLink: string
  salaryPerMonth: number
}

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
