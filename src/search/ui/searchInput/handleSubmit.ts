import type { JobDescription } from '#shared/types.ts'
import { filterOffers } from '../Filters/logic/filterOffers'
import type { useJobActions } from '#search/state/actions/useJobActions.ts'
import { fetchData } from '#shared/fetchData/fetchData.ts'
import { getSalaryAvg } from '#search/ui/searchInput/getSalaryAvg/getSalaryAvg.ts'
import { getMostUsedCurrency } from '#search/ui/searchInput/getMostUsedCurrency/getMostUsedCurrency.ts'
import { salaryConversion } from '#shared/salaryConversion/salaryConversion.ts'
import type { FiltersType, InputsSearchName } from '#search/shared/types.ts'

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
      location: formValues.location.split(',').filter(el => el),
      skills: formValues.skills.split(',').filter(el => el),
      salaryInfo: { average: salaryAvg || '', currency: mostUsedCurrency },
    })

    setJobData(filterOffers({ newFilters: defaultFilters, originalData: dataWithSalaryAvg }))
  }
}
