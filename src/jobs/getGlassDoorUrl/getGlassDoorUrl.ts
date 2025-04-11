import { fetchData } from '#shared/fetchData/fetchData.ts'

interface GetGlassDoorUrlProps {
  jobLocation: string
  jobPosition: string
  scraperApiUrl: string
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

export async function getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl }: GetGlassDoorUrlProps) {
  const cleanedJobLocation = jobLocation.toLowerCase().replace(/\s+/g, '-')

  const locationApiUrl = `https://www.glassdoor.com/autocomplete/location?locationTypeFilters=CITY,STATE,COUNTRY&caller=jobs&term=${cleanedJobLocation}`

  const locationApiData = await fetchData<LocationApi[]>({
    responseType: 'json',
    URL: scraperApiUrl + encodeURIComponent(locationApiUrl),
    retries: 3,
  })

  if (!locationApiData?.data) return
  const bestResult = locationApiData.data[0]

  //All these parameters are necessary to obtain good search results
  const locationType = bestResult.locationType
  const locationID = bestResult.locationId || bestResult.stateId || bestResult.countryId
  const locationCode = locationType + locationID
  const locationName = bestResult.longName.toLowerCase().replace(/[(),]/g, '').replace(/\s+/g, '-')
  const countryIdx = `0,${locationName.length}`
  const jobTitleIdx = `${locationName.length + 1},${locationName.length + 1 + jobPosition.length}`
  const cleanedJobTitle = jobPosition.toLowerCase().replace(/\s+/g, '-')
  const pageToScrape = `https://www.glassdoor.com/Job/${locationName}-${cleanedJobTitle}-jobs-SRCH_IL.${countryIdx}_I${locationCode}_KO${jobTitleIdx}.htm?sortBy=date_desc`

  return encodeURIComponent(pageToScrape)
}
