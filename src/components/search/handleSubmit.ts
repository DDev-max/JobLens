import { defaultFilters, setFilters, setJobData, setJobLocation, setJobSalary, setJobSkills } from '@/Context/jobDataSlice'
import type { InputsSearch } from '@/data/types'
import { getJobInfo } from '@/Utils/getJobStats/getJobInfo'
import { getSalaryAvg } from '@/Utils/getSalaryAvg'
import type { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { filterOffers } from '../JobOffers/Filters/filterOffers'

interface HandleSubmitarams {
  e: React.FormEvent<HTMLFormElement>
  setFormErrors: React.Dispatch<React.SetStateAction<Record<InputsSearch, boolean>>>
  formValues: Record<InputsSearch, string>
  dispatch: Dispatch<UnknownAction>
}

export async function handleSubmit({ e, setFormErrors, formValues, dispatch }: HandleSubmitarams) {
  e.preventDefault()

  const newErrors = Object.fromEntries(Object.entries(formValues).map(([key, value]) => [key, !value]))

  setFormErrors(newErrors as Record<InputsSearch, boolean>)

  const formIsValid = Object.values(newErrors).every(error => error === false)

  if (formIsValid) {
    const jobData = await getJobInfo({ jobLocation: formValues.location, jobPosition: formValues.position })

    // const jobData = MOCK_OBJ_SCRAPPING

    if (!jobData) return
    dispatch(setJobLocation(formValues.location.split(',')))
    dispatch(setJobSkills(formValues.skills.split(',')))
    dispatch(setFilters(defaultFilters))
    dispatch(setJobData(filterOffers({ newFilters: defaultFilters, originalData: jobData })))

    const { currency, salaryAvg } = getSalaryAvg({ data: jobData })
    dispatch(setJobSalary({ currency: currency || '', salaryAvg: salaryAvg || '' }))
  }
}
