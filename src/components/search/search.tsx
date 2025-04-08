import { SearchSVG } from '../SVG/SearchSVG'
import { LensSVG } from '../SVG/LensSVG'
import { LocationSVG } from '../SVG/LocationSVG'
import { SkillsSVG } from '../SVG/SkillsSVG'
import { useState } from 'react'
import { handleSubmit } from './handleSubmit'
import { handleInputChange } from './handleInputChange'
import { InputSearch } from './InputSearch'
import { useAppSelector } from '#Context/hooks/storeHooks.ts'
import type { InputsSearchName } from '#data/types.ts'
import { useJobActions } from '#Context/hooks/useJobActions.ts'
import { languagei18n } from '#data/consts.ts'

export function Search() {
  const currentLanguage = useAppSelector(state => state.languageReducer.language)

  // position: 'Example',
  // skills: 'CSS,react, react  ',
  // location: 'Remote,Toronto',

  const formInputs: Record<InputsSearchName, string> = {
    position: '',
    skills: '',
    location: '',
  }
  const isInvalidInput: Record<InputsSearchName, boolean> = {
    position: false,
    skills: false,
    location: false,
  }

  const [formValues, setFormValues] = useState(formInputs)
  const [formErrors, setFormErrors] = useState(isInvalidInput)

  const [isLoading, setIsLoading] = useState(false)

  const jobActions = useJobActions()

  return (
    <search>
      <form
        onSubmit={e => {
          handleSubmit({ e, formValues, setFormErrors, jobActions, setIsLoading })
        }}
        className='gap-9 flex flex-col justify-center items-center  p-5'
      >
        <div className='flex '>
          <LensSVG className='w-20 mt-3 max-sm:w-12' />
          <h1 className='text-8xl text-center max-sm:text-6xl'>JobLens</h1>
        </div>

        <div className='flex flex-col gap-3 lg:flex-row'>
          <InputSearch
            required
            onChange={e => {
              handleInputChange({ e, setFormErrors, setFormValues })
            }}
            isInvalid={formErrors.position}
            errorMessage={languagei18n[currentLanguage].search.positionError}
            name='position'
            value={formValues.position}
            onClear={() => {
              setFormValues(prev => ({ ...prev, position: '' }))
            }}
            className='lg:w-[45rem]'
            size='lg'
            label={languagei18n[currentLanguage].search.positionLabel}
            startContent={<SearchSVG />}
            isClearable
            placeholder={`${languagei18n[currentLanguage].search.positionPlaceholder}...`}
          />
          <div className='flex gap-x-4'>
            <InputSearch
              required
              onChange={e => {
                handleInputChange({ e, setFormErrors, setFormValues })
              }}
              isInvalid={formErrors.skills}
              errorMessage={languagei18n[currentLanguage].search.skillsError}
              name='skills'
              value={formValues.skills}
              size='lg'
              label={languagei18n[currentLanguage].search.skillsLabel}
              startContent={<SkillsSVG className='w-6' />}
              onClear={() => {
                setFormValues(prev => ({ ...prev, skills: '' }))
              }}
              isClearable
              placeholder={`${languagei18n[currentLanguage].search.skillsPlaceHolder}...`}
            />
            <InputSearch
              required
              onChange={e => {
                handleInputChange({ e, setFormErrors, setFormValues })
              }}
              isInvalid={formErrors.location}
              errorMessage={languagei18n[currentLanguage].search.locationError}
              value={formValues.location}
              onClear={() => {
                setFormValues(prev => ({ ...prev, location: '' }))
              }}
              name='location'
              size='lg'
              label={languagei18n[currentLanguage].search.locationLabel}
              startContent={<LocationSVG className='w-6' />}
              isClearable
              placeholder={languagei18n[currentLanguage].search.locationPlaceHolder}
            />
          </div>
        </div>
        <p className='text-center text-sm text-gray-400'>{languagei18n[currentLanguage].search.info}</p>
        <button type='submit' />
      </form>
    </search>
  )
}
