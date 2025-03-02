import { Switch } from '@heroui/switch'
import { MoonIcon, SunIcon } from './SVG/DarkMode'
import { Language } from './SVG/Language'

export function Header() {
  return (
    <header className='flex dark bg-background border-b-1 border-gray-500'>
      <div className=' ml-auto flex gap-4 p-2'>
        <Switch
          color='default'
          size='lg'
          defaultSelected
          thumbIcon={({ isSelected, className }) => (isSelected ? <MoonIcon className={className} /> : <SunIcon className={className} />)}
        />

        <button>
          <Language className='w-10' />
        </button>
      </div>
    </header>
  )
}
