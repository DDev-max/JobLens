import { LanguageSVG } from './SVG/LanguageSVG'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import { Button } from '@heroui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '@/Context/languageSlice'
import type { RootState } from '@/Context/store'
import type { SupportedLanguageKeys } from '@/data/types'
import { SupportedLanguages } from '@/data/types'

export function Header() {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)

  const ESKey: SupportedLanguageKeys = 'ES'
  const ENKey: SupportedLanguageKeys = 'EN'

  return (
    <header className='flex dark bg-background border-b-1 border-gray-500'>
      <div className=' ml-auto flex gap-4 p-2'>
        <Dropdown className='dark text-foreground border-1 '>
          <DropdownTrigger>
            <Button isIconOnly className='bg-transparent'>
              <LanguageSVG className='w-10' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode='single'
            selectedKeys={[`${currentLanguage}`]}
            onAction={key => dispatch(setLanguage(key as SupportedLanguageKeys))}
          >
            <DropdownItem key={ESKey}>{SupportedLanguages[ESKey]}</DropdownItem>
            <DropdownItem key={ENKey}>{SupportedLanguages[ENKey]}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
