import type { FiltersType, JobDescription } from '@/data/types'
import { normalizeString } from '@/Utils/normalizeString'
import { filterOffers } from './filterOffers/filterOffers'
import { setFilters, setJobData } from '@/Context/jobDataSlice'
import type { Dispatch, UnknownAction } from '@reduxjs/toolkit'

interface handlePressParams {
  isActive: boolean
  filterName: keyof FiltersType
  value: string
  dispatch: Dispatch<UnknownAction>
  originalData: readonly JobDescription[]
  filters: FiltersType
}

export function handlePress({
  filterName,
  isActive,
  value,
  dispatch,
  originalData,
  filters,
}: handlePressParams) {
  let newFilters: FiltersType = { location: [], salaryDesc: [], skills: [] }

  if (filterName === 'location') {
    newFilters = isActive ? { ...filters, location: [] } : { ...filters, location: [value] }
  } else if (filterName === 'salaryDesc') {
    newFilters = { ...filters, salaryDesc: [!filters.salaryDesc[0]] }
  } else if (filterName === 'skills') {
    newFilters = isActive
      ? {
          ...filters,
          skills: filters.skills.filter(skill => normalizeString(skill) !== normalizeString(value)),
        }
      : { ...filters, skills: [...filters.skills, value] }
  }

  dispatch(setFilters(newFilters))

  const sortedData = filterOffers({ newFilters, originalData })
  dispatch(setJobData(sortedData))
}
