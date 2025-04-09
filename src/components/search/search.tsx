import { SearchSVG } from '../SVG/SearchSVG'
import { LensSVG } from '../SVG/LensSVG'
import { LocationSVG } from '../SVG/LocationSVG'
import { SkillsSVG } from '../SVG/SkillsSVG'
import { useEffect, useState } from 'react'
import { handleSubmit } from './handleSubmit'
import { handleInputChange } from './handleInputChange'
import { InputSearch } from './InputSearch'
import { useAppSelector } from '#Context/hooks/storeHooks.ts'
import type { InputsSearchName } from '#data/types.ts'
import { useJobActions } from '#Context/hooks/useJobActions.ts'
import { languagei18n } from '#data/consts.ts'
import { CircularProgress } from '@heroui/progress'

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

  const [fetchStatus, setFetchStatus] = useState({ error: '', isLoading: false })
  const [loadingValue, setLoadingValue] = useState(0)

  useEffect(() => {
    if (!fetchStatus.isLoading) {
      setLoadingValue(0)
      return
    }
    const interval = setInterval(() => {
      setLoadingValue(prev => Math.min(prev + 3.5, 99))
    }, 1 * 1000)

    return () => clearInterval(interval)
  }, [fetchStatus.isLoading])

  const jobActions = useJobActions()

  return (
    <>
      <search>
        <form
          onSubmit={e => {
            handleSubmit({ e, formValues, setFormErrors, jobActions, setFetchStatus })
          }}
          className='gap-9 flex flex-col justify-center items-center  p-5'
        >
          <div className='flex '>
            <LensSVG className='w-20 mt-3 max-sm:w-12' />
            <h1 className='text-8xl text-center max-sm:text-6xl'>JobLens</h1>
          </div>

          <div className='flex flex-col gap-3 lg:flex-row'>
            <InputSearch
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
      {fetchStatus.isLoading && (
        <CircularProgress
          className='ml-auto mr-auto scale-125'
          size='lg'
          label={
            loadingValue < 30
              ? languagei18n[currentLanguage].search.loading.firstMsg
              : loadingValue < 60
                ? languagei18n[currentLanguage].search.loading.secondMsg
                : languagei18n[currentLanguage].search.loading.thirdMsg
          }
          showValueLabel
          color={loadingValue < 50 ? 'default' : 'success'}
          value={loadingValue}
        />
      )}
      {fetchStatus.error && (
        <p className='ml-auto mr-auto text-red-400 font-bold'>
          {languagei18n[currentLanguage].search.error} : {fetchStatus.error} :&#40;
        </p>
      )}
    </>
  )
}
