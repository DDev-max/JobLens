import { Input } from '@heroui/input'
import { SearchSVG } from './SVG/SearchSVG'
import { LensSVG } from './SVG/LensSVG'
import { LocationSVG } from './SVG/LocationSVG'
import { SkillsSVG } from './SVG/SkillsSVG'
import { useSelector } from 'react-redux'
import type { RootState } from '@/Context/store'
import { languagei18n } from '@/data/consts'

export function Search() {
  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)

  return (
    <search>
      <form className='gap-9 flex flex-col justify-center items-center  p-5'>
        <div className='flex '>
          <LensSVG className='w-20 mt-3 max-sm:w-12' />
          <h1 className='text-8xl text-center max-sm:text-6xl'>JobLens</h1>
        </div>

        <div className='flex flex-col gap-3 lg:flex-row'>
          <Input
            className='lg:w-[45rem]'
            size='lg'
            label={languagei18n[currentLanguage].search.jobLabel}
            startContent={<SearchSVG />}
            isClearable
            placeholder={`${languagei18n[currentLanguage].search.jobPlaceHolder}...`}
          />
          <div className='flex gap-x-4'>
            <Input
              size='lg'
              label={languagei18n[currentLanguage].search.skillsLabel}
              startContent={<SkillsSVG className='w-6' />}
              isClearable
              placeholder={`${languagei18n[currentLanguage].search.skillsPlaceHolder}...`}
            />
            <Input
              size='lg'
              label={languagei18n[currentLanguage].search.locationLabel}
              startContent={<LocationSVG className='w-6' />}
              isClearable
              placeholder={languagei18n[currentLanguage].search.locationPlaceHolder}
            />
          </div>
        </div>
        <p className='text-center text-sm text-gray-400'>{languagei18n[currentLanguage].search.info}</p>
      </form>
    </search>
  )
}
