import { LanguageSVG } from './SVG/LanguageSVG'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import { Button } from '@heroui/button'
import type { SupportedLanguageKeys } from '#data/types'
import { SupportedLanguages } from '#data/types'
import { useAppSelector } from '#Context/hooks/storeHooks'
import { useLanguageActions } from '#Context/hooks/useLanguageActions'

export function Header() {
  const currentLanguage = useAppSelector(state => state.languageReducer.language)

  const ESKey: SupportedLanguageKeys = 'ES'
  const ENKey: SupportedLanguageKeys = 'EN'

  const { setLanguage } = useLanguageActions()

  return (
    <header className='flex dark bg-background border-b-1 border-gray-500'>
      <div className=' ml-auto flex gap-4 p-2'>
        <Dropdown className='dark text-foreground border-1 '>
          <DropdownTrigger aria-label='Change language'>
            <Button isIconOnly className='bg-transparent'>
              <LanguageSVG className='w-10' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode='single'
            selectedKeys={[`${currentLanguage}`]}
            onAction={key => setLanguage(key as SupportedLanguageKeys)}
          >
            <DropdownItem key={ESKey}>{SupportedLanguages[ESKey]}</DropdownItem>
            <DropdownItem key={ENKey}>{SupportedLanguages[ENKey]}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
