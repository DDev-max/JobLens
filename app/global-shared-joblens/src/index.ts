import { HTML } from './__mocks__/pageHtml.js'
import locationApiJson from './__mocks__/locationApi.json'
import scrappedPageJson from './__mocks__/scrappedPage.json'
import {
  currencies,
  daysPerWeek,
  hoursPerDay,
  moneyRegex,
  thousandAbbreviation,
  weeksPerMonth,
} from './data/consts'
import { JobDescription } from './data/types'
import { ResponseTypeError } from './fetchData/ResponseTypeError'
import { fetchData } from './fetchData/fetchData'
import { normalizeString } from './normalizeString/normalizeString'
import { salaryConversion } from './salaryConversion/salaryConversion'

export {
  locationApiJson,
  HTML,
  scrappedPageJson,
  currencies,
  daysPerWeek,
  hoursPerDay,
  moneyRegex,
  thousandAbbreviation,
  weeksPerMonth,
  ResponseTypeError,
  fetchData,
  normalizeString,
  salaryConversion,
}

export type { JobDescription }
