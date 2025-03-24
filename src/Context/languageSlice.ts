import { SupportedLanguages, type SupportedLanguageKeys } from '@/data/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface LanguageState {
  language: SupportedLanguageKeys
}

const userLanguage = navigator.language
const languageCode = userLanguage.split('-')[0].toUpperCase()
const initialLanguage: SupportedLanguageKeys =
  languageCode in SupportedLanguages ? (languageCode as SupportedLanguageKeys) : 'EN'

const initialState: LanguageState = {
  language: initialLanguage,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SupportedLanguageKeys>) => {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
