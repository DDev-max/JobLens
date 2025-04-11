import { useDispatch } from 'react-redux'
import { setCurrentLanguage } from '../languageSlice'
import type { SupportedLanguageKeys } from '#search/shared/types.ts'

export function useLanguageActions() {
  const dispatch = useDispatch()

  const setLanguage = (language: SupportedLanguageKeys) => {
    dispatch(setCurrentLanguage(language))
  }

  return { setLanguage }
}
