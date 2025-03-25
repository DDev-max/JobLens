import { setFilters, setJobData, setJobLocation, setJobSalary, setJobSkills } from '@/Context/jobDataSlice'
import type { FiltersType, InputsSearchName } from '@/data/types'
import { getJobInfo } from '@/Utils/getJobStats/getJobInfo'
import { getSalaryAvg } from '@/Utils/getSalaryAvg'
import type { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { filterOffers } from '../JobOffers/Filters/filterOffers/filterOffers'
import { salaryConversion } from '@/Utils/salaryConversion/salaryConversion'
import { getMostUsedCurrency } from '@/Utils/getMostUsedCurrency/getMostUsedCurrency'

interface HandleSubmitarams {
  e: React.FormEvent<HTMLFormElement>
  setFormErrors: React.Dispatch<React.SetStateAction<Record<InputsSearchName, boolean>>>
  formValues: Record<InputsSearchName, string>
  dispatch: Dispatch<UnknownAction>
}

export async function handleSubmit({ e, setFormErrors, formValues, dispatch }: HandleSubmitarams) {
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

    dispatch(setJobLocation(formValues.location.split(',')))
    dispatch(setJobSkills(formValues.skills.split(',')))
    dispatch(setFilters(defaultFilters))
    dispatch(setJobData(filterOffers({ newFilters: defaultFilters, originalData: dataWithSalaryAvg })))
    dispatch(setJobSalary({ currency: mostUsedCurrency || '', salaryAvg: salaryAvg || '' }))
  }
}
