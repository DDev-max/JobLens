import type { JobDescription } from '#globalShared/types.ts'
import { normalizeString } from '#globalShared/normalizeString/normalizeString.ts'
import { filterOffers } from './logic/filterOffers'
import type { useJobActions } from '#state/actions/useJobActions.ts'
import type { FiltersType } from '#shared/types.ts'

interface handlePressParams {
  isActive: boolean
  filterName: keyof FiltersType
  value: string
  originalData: readonly JobDescription[]
  filters: FiltersType
  jobActions: ReturnType<typeof useJobActions>
}

export function handlePress({
  filterName,
  isActive,
  value,
  originalData,
  filters,
  jobActions,
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

  const { setFilters, setJobData } = jobActions

  setFilters(newFilters)
  setJobData(filterOffers({ newFilters, originalData }))
}
