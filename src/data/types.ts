export interface JobDescription {
  jobTitle: string | null | undefined
  orgName: string | null | undefined
  location: string | null | undefined
  salary: string | null | undefined
  skills: string[] | null | undefined
  jobAge: string | null | undefined
  imgSrc: string | null | undefined
}

export type SupportedLanguages = 'ES' | 'EN'
