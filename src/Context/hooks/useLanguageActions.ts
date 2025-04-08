import type { SupportedLanguageKeys } from '#data/types'
import { useDispatch } from 'react-redux'
import { setCurrentLanguage } from '../languageSlice'

export function useLanguageActions() {
  const dispatch = useDispatch()

  const setLanguage = (language: SupportedLanguageKeys) => {
    dispatch(setCurrentLanguage(language))
  }

  return { setLanguage }
}
