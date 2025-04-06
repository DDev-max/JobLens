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

export interface LocationApi {
  id: number
  label: string
  locationId: number
  metroId: number
  stateId: number
  countryId: number
  locationType: string
  locationName: string
  longName: string
  cityName: null | string
  stateName: null | string
  countryName: string
  stateAbbreviation: null | string
  country2LetterIso: string
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
