import { combineReducers, configureStore } from '@reduxjs/toolkit'
import languageReducer from './languageSlice'
import jobDataReducer from './jobDataSlice'

const rootReducer = combineReducers({
  languageReducer,
  jobDataReducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
