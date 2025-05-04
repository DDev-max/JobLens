// import type { SupportedLanguageKeys } from '#shared/types.ts'
import type { SupportedLanguageKeys } from './../shared/types'
import { SupportedLanguages } from '../shared/types'
// import { SupportedLanguages } from '#shared/types.ts'
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
    setCurrentLanguage: (state, action: PayloadAction<SupportedLanguageKeys>) => {
      state.language = action.payload
    },
  },
})

export const { setCurrentLanguage } = languageSlice.actions
export default languageSlice.reducer
