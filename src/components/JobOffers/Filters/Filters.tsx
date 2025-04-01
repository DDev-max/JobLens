import { languagei18n } from '@/data/consts'
import { normalizeString } from '@/Utils/normalizeString'
import type { ButtonProps } from '@heroui/button'
import { Button } from '@heroui/button'
import { useRef } from 'react'
import { handlePress } from './handlePress'
import type { FiltersType } from '@/data/types'
import { useAppSelector } from '@/Context/hooks/storeHooks'
import { useJobActions } from '@/Context/hooks/useJobActions'

interface FilterButtons extends Omit<FiltersType, 'location'> {
  location: string[]
}

export function Filters() {
  const jobActions = useJobActions()

  const { skills, location, currentFilters, data } = useAppSelector(state => state.jobDataReducer)
  const currentLanguage = useAppSelector(state => state.languageReducer.language)

  const cleanedLocations = [...new Set(location.map(str => normalizeString(str)))]
  const cleanedSkills = [...new Set(skills.map(str => normalizeString(str)))]
  const filterButtons: FilterButtons = {
    salaryDesc: [false],
    skills: cleanedSkills,
    location: cleanedLocations,
  }

  const originalDataRef = useRef(data)
  const originalData = originalDataRef.current

  return (
    <div className='flex my-4'>
      <p className='m-2'>{languagei18n[currentLanguage].filters.filterName}</p>
      <div className='gap-2 flex flex-wrap'>
        {Object.entries(filterButtons).map(([filterName, valuesArray]) =>
          valuesArray.map((value: string | boolean, index: number) => {
            const cleanedString = normalizeString(String(value))
            const name = filterName as keyof FilterButtons

            let color: ButtonProps['color'] = 'primary'

            const isActive =
              name === 'skills'
                ? currentFilters.skills.some(el => normalizeString(el) === cleanedString)
                : normalizeString(String(currentFilters[name][0])) === cleanedString

            if (name === 'location') {
              color = 'secondary'
            } else if (name === 'salaryDesc') {
              color = isActive ? 'success' : 'danger'
            }

            const salaryText = isActive
              ? languagei18n[currentLanguage].filters.salaryAsc
              : languagei18n[currentLanguage].filters.salaryDesc

            const uiString = String(value).trim().charAt(0).toUpperCase() + String(value).trim().slice(1)

            let variant: ButtonProps['variant'] = 'solid'
            if (name === 'salaryDesc') {
              variant = 'solid'
            } else if (!isActive) {
              variant = 'flat'
            }

            return (
              <Button
                onPress={() => {
                  handlePress({
                    isActive,
                    filterName: name,
                    value: String(value),
                    filters: currentFilters,
                    originalData,
                    jobActions,
                  })
                }}
                key={index}
                variant={variant}
                color={color}
                size='sm'
                radius='md'
              >
                {name === 'salaryDesc' ? salaryText : uiString}
              </Button>
            )
          })
        )}
      </div>
    </div>
  )
}
