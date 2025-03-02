import { Input } from '@heroui/input'
import { SearchIcon } from './SVG/SerchIcon'
import { Lens } from './SVG/Lens'

export function Search() {
  return (
    <search>
      <form className='gap-9 min-h-screen flex flex-col justify-center items-center flex-grow p-5'>
        <div className='flex '>
          <Lens className='w-20 mt-3' />
          <h1 className='text-8xl text-center'>JobLens</h1>
        </div>
        <div className='flex gap-x-4'>
          <Input className='w-2/5' label='Search' startContent={<SearchIcon />} isClearable placeholder='Backend, DevOps, Android developer...' />
          <Input label='Search' startContent={<SearchIcon />} isClearable placeholder='Python, JavaScript, Excel...' />
        </div>
        <p className='text-center text-sm text-gray-400'>
          Enter a job title and keywords to see detailed charts and information about various roles.
        </p>
      </form>
    </search>
  )
}
