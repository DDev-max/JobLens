import type { RootState } from '@/Context/store'
import { languagei18n } from '@/data/consts'
import { normalizeString } from '@/Utils/normalizeString'
import type { ButtonProps } from '@heroui/button'
import { Button } from '@heroui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import type { Filters } from '@/data/types'
import { handlePress } from './handlePress'

export function Filters() {
  const jobData = useSelector((state: RootState) => state.jobDataReducer.data)

  const originalDataRef = useRef(jobData)

  const originalData = originalDataRef.current

  const skillsInput = useSelector((state: RootState) => state.jobDataReducer.skills)

  const locations = useSelector((state: RootState) => state.jobDataReducer.location)
  const dispatch = useDispatch()

  const filters = useSelector((state: RootState) => state.jobDataReducer.defaultFilters)
  const filterButtons = {
    salaryDesc: [false],
    skills: skillsInput,
    location: locations,
  }

  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)

  return (
    <div className='flex my-4'>
      <p className='m-2'>{languagei18n[currentLanguage].filters.filterName}</p>
      <div className='gap-2 flex flex-wrap'>
        {Object.entries(filterButtons).map(([filterName, valuesArray]) =>
          valuesArray.map((value, index) => {
            const cleanedString = normalizeString(String(value))
            const name = filterName as keyof Filters

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

            const salaryText = isActive ? languagei18n[currentLanguage].filters.salaryAsc : languagei18n[currentLanguage].filters.salaryDesc

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
                  handlePress({ isActive, filterName: name, value: String(value), dispatch, filters, originalData })
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
