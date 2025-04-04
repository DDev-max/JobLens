import type { FiltersType, InputsSearchName } from '@/data/types'
import { getJobInfo } from '@/Utils/getJobInfo/getJobInfo'
import { getSalaryAvg } from '@/Utils/getSalaryAvg'
import { filterOffers } from '../JobOffers/Filters/filterOffers/filterOffers'
import { salaryConversion } from '@/Utils/salaryConversion/salaryConversion'
import { getMostUsedCurrency } from '@/Utils/getMostUsedCurrency/getMostUsedCurrency'
import type { useJobActions } from '@/Context/hooks/useJobActions'

interface HandleSubmitarams {
  e: React.FormEvent<HTMLFormElement>
  setFormErrors: React.Dispatch<React.SetStateAction<Record<InputsSearchName, boolean>>>
  formValues: Record<InputsSearchName, string>
  jobActions: ReturnType<typeof useJobActions>
}

export async function handleSubmit({ e, setFormErrors, formValues, jobActions }: HandleSubmitarams) {
  e.preventDefault()

  const newErrors = Object.fromEntries(Object.entries(formValues).map(([key, value]) => [key, !value]))

  setFormErrors(newErrors as Record<InputsSearchName, boolean>)

  const formIsValid = Object.values(newErrors).every(error => error === false)

  if (formIsValid) {
    const jobData = await getJobInfo({ jobLocation: formValues.location, jobPosition: formValues.position })
    if (!jobData || !jobData.length) return

    const salaryDescription = jobData.map(obj => obj.salary).filter(salary => salary)

    const mostUsedCurrency = getMostUsedCurrency({ salaryDescription })
    const salaryAvg = getSalaryAvg({ mostUsedCurrency, salaryDescription })

    const dataWithSalaryAvg = jobData.map(job => {
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
