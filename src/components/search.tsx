import { Input } from '@heroui/input'
import { SearchSVG } from './SVG/SearchSVG'
import { LensSVG } from './SVG/LensSVG'
import { LocationSVG } from './SVG/LocationSVG'
import { SkillsSVG } from './SVG/SkillsSVG'
import { useSelector } from 'react-redux'
import type { RootState } from '@/Context/store'
import { languagei18n } from '@/data/consts'
import React, { useState } from 'react'

type InputsNames = 'position' | 'skills' | 'location'

export function Search() {
  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)

  const formInputs: Record<InputsNames, string> = {
    position: '',
    skills: '',
    location: '',
  }
  const isInvalidInput: Record<InputsNames, boolean> = {
    position: false,
    skills: false,
    location: false,
  }

  const validators: Record<InputsNames, (value: string) => boolean> = {
    position: value => value.trim().length <= 3,
    skills: value => !/\S+,\S+/.test(value.replaceAll(' ', '')),
    location: value => value.trim().length <= 2,
  }

  const [formValues, setFormValues] = useState(formInputs)
  const [formErrors, setFormErrors] = useState(isInvalidInput)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [name]: value }))

    if (validators[name as InputsNames]) {
      setFormErrors(prev => ({ ...prev, [name]: validators[name as InputsNames](value) }))
    }
  }

  function validateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newErrors = Object.fromEntries(Object.entries(formValues).map(([key, value]) => [key, !value]))

    setFormErrors(newErrors as typeof formErrors)

    const formIsValid = Object.values(newErrors).every(error => error === false)

    if (formIsValid) {
      console.log('ENVIADO')
    }
  }

  return (
    <search>
      <form
        onSubmit={e => {
          validateForm(e)
        }}
        className='gap-9 flex flex-col justify-center items-center  p-5'
      >
        <div className='flex '>
          <LensSVG className='w-20 mt-3 max-sm:w-12' />
          <h1 className='text-8xl text-center max-sm:text-6xl'>JobLens</h1>
        </div>

        <div className='flex flex-col gap-3 lg:flex-row'>
          <Input
            required
            onChange={e => {
              handleInputChange(e)
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
            <Input
              onChange={e => {
                handleInputChange(e)
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
            <Input
              onChange={e => {
                handleInputChange(e)
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
