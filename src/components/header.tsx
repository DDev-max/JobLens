import { Switch } from '@heroui/switch'
import { MoonIcon, SunIcon } from './SVG/DarkMode'
import { Language } from './SVG/Language'
import { Lens } from './SVG/Lens'

export function Header() {
  return (
    <header className='flex dark text-foreground bg-background'>
      <a href='/' className='flex items-center'>
        <Lens className='w-9 m-2' />
        <h1 className='text-3xl'>JobLens</h1>
      </a>

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
