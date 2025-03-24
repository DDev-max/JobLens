import type { RootState } from '@/Context/store'
import { languagei18n } from '@/data/consts'
import { normalizeString } from '@/Utils/normalizeString'
import type { ButtonProps } from '@heroui/button'
import { Button } from '@heroui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { handlePress } from './handlePress'
import type { FiltersType } from '@/data/types'

interface FilterButtons extends Omit<FiltersType, 'location'> {
  location: string[]
}

export function Filters() {
  const jobData = useSelector((state: RootState) => state.jobDataReducer.data)

  const originalDataRef = useRef(jobData)

  const originalData = originalDataRef.current

  const skillsInput = useSelector((state: RootState) => state.jobDataReducer.skills)
  const cleanedSkills = [...new Set(skillsInput.map(str => normalizeString(str)))]
  const locations = useSelector((state: RootState) => state.jobDataReducer.location)
  const cleanedLocations = [...new Set(locations.map(str => normalizeString(str)))]

  const dispatch = useDispatch()

  const filters = useSelector((state: RootState) => state.jobDataReducer.currentFilters)
  const filterButtons: FilterButtons = {
    salaryDesc: [false],
    skills: cleanedSkills,
    location: cleanedLocations,
  }

  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)

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
                ? filters.skills.some(el => normalizeString(el) === cleanedString)
                : normalizeString(String(filters[name][0])) === cleanedString

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
                    dispatch,
                    filters,
                    originalData,
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
