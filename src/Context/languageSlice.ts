import type { SupportedLanguageKeys } from '@/data/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface LanguageState {
  language: SupportedLanguageKeys
}

const initialState: LanguageState = {
  language: 'EN',
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
