import type { JobDescription } from 'global-shared-joblens'
import { normalizeString } from 'global-shared-joblens'
import type { FiltersType } from '#shared/types.ts'

interface FilterOffersParams {
  originalData: readonly JobDescription[]
  newFilters: FiltersType
}

export function filterOffers({ originalData, newFilters }: FilterOffersParams) {
  const filteredData = originalData.filter(job => {
    const regexpArray = newFilters.skills.map(skill => `(?=.*\\b${normalizeString(skill)}\\b)`).join('')
    const skillRegexp = new RegExp(`^${regexpArray}.*`, 'gi')
    const locationRegexp = new RegExp(`\\b${normalizeString(newFilters.location[0] || '')}\\b`, 'i')
    const hasSameLocation = normalizeString(job.location).match(locationRegexp)
    const isSkillInDescription = skillRegexp.test(normalizeString(job.skills.toString()))
    const isSkillInTitle = skillRegexp.test(normalizeString(job.jobTitle.toString()))
    const hasSameSkills = isSkillInDescription || isSkillInTitle
    return (
      (newFilters.location.length ? hasSameLocation : true) &&
      (newFilters.skills.length ? hasSameSkills : true)
    )
  })

  const sortedData = filteredData.toSorted((a, b) => {
    return newFilters.salaryDesc[0]
      ? a.salaryPerMonth - b.salaryPerMonth
      : b.salaryPerMonth - a.salaryPerMonth
  })

  return sortedData
}
