import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './languageSlice'

export const store = configureStore({
  reducer: {
    languageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
