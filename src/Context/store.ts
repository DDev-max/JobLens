import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './languageSlice'
import jobDataReducer from './jobDataSlice'
export const store = configureStore({
  reducer: {
    languageReducer,
    jobDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
