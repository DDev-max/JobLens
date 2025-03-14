export interface JobDescription {
  jobTitle: string
  orgName: string
  location: string
  salary: string
  skills: string[]
  jobAge: string
  imgSrc: string
  jobLink: string
}

export enum SupportedLanguages {
  EN = 'English',
  ES = 'Español',
}

export type SupportedLanguageKeys = keyof typeof SupportedLanguages
