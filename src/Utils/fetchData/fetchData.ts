import { ResponseTypeError } from './ResponseTypeError.ts'
interface FetchFnProps {
  URL: string
  responseType: ResponseTypes
  retries: number
}
type ResponseTypes = 'json' | 'text'

let attemptCounter = 0

export async function fetchData<TFetchReturn>({ URL, responseType, retries }: FetchFnProps) {
  const validTypes: readonly [ResponseTypes, ResponseTypes] = ['json', 'text']

  try {
    attemptCounter++

    const response = await fetch(URL)

    if (!validTypes.includes(responseType)) {
      throw new ResponseTypeError(`"${responseType}" is an invalid response type.`)
    }

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}, ${response.statusText}`)
    }

    const format: TFetchReturn = await response[responseType]()

    return format
  } catch (error) {
    /* eslint-disable no-console */

    if (error instanceof Error) {
      console.error(`Error: ${error.name}, ${error.message} \n URL: ${URL}`)
      if (error instanceof ResponseTypeError) return
    }

    if (attemptCounter < retries) {
      console.log(`Retrying... Attempt ${attemptCounter + 1} of ${retries}`)
      return await fetchData({ responseType, retries, URL })
    }

    console.error(`Fetch has failed after ${retries} tries`)
  }
}
