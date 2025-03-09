import { Switch } from '@heroui/switch'
import { MoonSVG, SunSVG } from './SVG/DarkModeSVGs'
import { LanguageSVG } from './SVG/LanguageSVG'

export function Header() {
  return (
    <header className='flex dark bg-background border-b-1 border-gray-500'>
      <div className=' ml-auto flex gap-4 p-2'>
        <Switch
          color='default'
          size='lg'
          defaultSelected
          thumbIcon={({ isSelected, className }) => (isSelected ? <MoonSVG className={className} /> : <SunSVG className={className} />)}
        />

        <button>
          <LanguageSVG className='w-10' />
        </button>
      </div>
    </header>
  )
}
