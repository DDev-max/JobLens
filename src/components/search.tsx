import { Input } from '@heroui/input'
import { SearchSVG } from './SVG/SearchSVG'
import { LensSVG } from './SVG/LensSVG'
import { LocationSVG } from './SVG/LocationSVG'
import { SkillsSVG } from './SVG/SkillsSVG'

export function Search() {
  return (
    <search>
      <form className='gap-9 flex flex-col justify-center items-center  p-5'>
        <div className='flex '>
          <LensSVG className='w-20 mt-3' />
          <h1 className='text-8xl text-center'>JobLens</h1>
        </div>

        <div className='flex flex-col gap-3 lg:flex-row'>
          <Input size='lg' label='Title' startContent={<SearchSVG />} isClearable placeholder='Backend, DevOps, Android developer...' />
          <div className='flex gap-x-4'>
            <Input size='lg' label='Skills' startContent={<SkillsSVG className='w-6' />} isClearable placeholder='Python, Excel, JavaScript...' />
            <Input
              size='lg'
              label='Location'
              startContent={<LocationSVG className='w-6' />}
              isClearable
              placeholder='New York, Costa Rica, Maldivas'
            />
          </div>
        </div>
        <p className='text-center text-sm text-gray-400'>
          Enter a job title and keywords to see detailed charts and information about various roles.
        </p>
      </form>
    </search>
  )
}
