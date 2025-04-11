import { ResponseTypeError } from './ResponseTypeError.ts'
interface FetchFnProps {
  URL: string
  responseType: ResponseTypes
  retries: number
}
type ResponseTypes = 'json' | 'text'

export async function fetchData<TFetchReturn>({ URL, responseType, retries }: FetchFnProps) {
  const validTypes: readonly [ResponseTypes, ResponseTypes] = ['json', 'text']
  let attemptCounter = 0

  while (attemptCounter < retries) {
    try {
      attemptCounter++
      if (!validTypes.includes(responseType)) {
        throw new ResponseTypeError(`"${responseType}" is an invalid response type.`)
      }

      const response = await fetch(URL)

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}, ${response.statusText}`)
      }

      const format: TFetchReturn = await response[responseType]()
      return { data: format }
    } catch (error) {
      /* eslint-disable no-console */
      if (error instanceof Error) {
        console.error(`Error: ${error.name}, ${error.message} \n URL: ${URL}`)
        if (error instanceof ResponseTypeError || attemptCounter >= retries) {
          if (attemptCounter >= retries) {
            console.error(`Fetch has failed after ${retries} tries`)
          }
          return { error: error.name }
        }
      }
    }
    console.log(`Retrying... Attempt ${attemptCounter + 1} of ${retries}`)
  }
}
