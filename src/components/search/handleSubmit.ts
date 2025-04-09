import type { FiltersType, InputsSearchName, JobDescription } from '#data/types'
import { getSalaryAvg } from '#Utils/getSalaryAvg/getSalaryAvg'
import { filterOffers } from '../JobOffers/Filters/filterOffers/filterOffers'
import { salaryConversion } from '#Utils/salaryConversion/salaryConversion'
import { getMostUsedCurrency } from '#Utils/getMostUsedCurrency/getMostUsedCurrency'
import type { useJobActions } from '#Context/hooks/useJobActions'
import { fetchData } from '#Utils/fetchData/fetchData'

interface HandleSubmitarams {
  e: React.FormEvent<HTMLFormElement>
  setFormErrors: React.Dispatch<React.SetStateAction<Record<InputsSearchName, boolean>>>
  formValues: Record<InputsSearchName, string>
  jobActions: ReturnType<typeof useJobActions>
  setFetchStatus: React.Dispatch<
    React.SetStateAction<{
      error: string
      isLoading: boolean
    }>
  >
}

export async function handleSubmit({
  e,
  setFormErrors,
  formValues,
  jobActions,
  setFetchStatus,
}: HandleSubmitarams) {
  e.preventDefault()

  const newErrors = Object.fromEntries(Object.entries(formValues).map(([key, value]) => [key, !value]))

  setFormErrors(newErrors as Record<InputsSearchName, boolean>)

  const formIsValid = Object.values(newErrors).every(error => error === false)

  if (formIsValid) {
    setFetchStatus({ error: '', isLoading: true })

    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve('aaa')
    //   }, 3 * 1000)
    // })

    const jobInfo = await fetchData<JobDescription[]>({
      URL: `http://localhost:777/jobs?location=${formValues.location}&position=${formValues.position}`,
      responseType: 'json',
      retries: 3,
    })

    setFetchStatus({ error: jobInfo?.error || '', isLoading: false })

    if (!jobInfo?.data) return

    const salaryDescription = jobInfo.data.map(obj => obj.salary).filter(salary => salary)

    const mostUsedCurrency = getMostUsedCurrency({ salaryDescription })
    const salaryAvg = getSalaryAvg({ mostUsedCurrency, salaryDescription })

    const dataWithSalaryAvg = jobInfo.data.map(job => {
      job.salaryPerMonth = salaryConversion({
        currency: mostUsedCurrency || '',
        salaryDescription: job.salary,
      })
      return job
    })

    const defaultFilters: FiltersType = {
      location: [],
      salaryDesc: [false],
      skills: [],
    }

    const { setFilters, setJobData, setSharedValues } = jobActions

    setFilters(defaultFilters)

    setSharedValues({
      location: formValues.location.split(','),
      skills: formValues.skills.split(','),
      salaryInfo: { average: salaryAvg || '', currency: mostUsedCurrency },
    })

    setJobData(filterOffers({ newFilters: defaultFilters, originalData: dataWithSalaryAvg }))
  }
}
