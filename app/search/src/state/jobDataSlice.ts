import type { FiltersType } from '#shared/types.ts'
import type { JobDescription } from '#globalShared/types.ts'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const skills: string[] = []
const location: string[] = []

const salaryInfo = {
  currency: '',
  average: '',
}

const currentFilters: FiltersType = {
  location: [],
  skills: [],
  salaryDesc: [false],
}

const data: readonly JobDescription[] = []

const initialState = {
  data,
  currentFilters,
  skills,
  location,
  salaryInfo,
}

export type SharedValues = Omit<typeof initialState, 'data' | 'currentFilters'>

const jobDatalice = createSlice({
  name: 'jobData',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<JobDescription[]>) => {
      state.data = action.payload
    },

    setGlobalValues: (state, action: PayloadAction<SharedValues>) => {
      state.location = action.payload.location
      state.skills = action.payload.skills
      state.salaryInfo = action.payload.salaryInfo
    },

    setCurrentFilters: (state, action: PayloadAction<FiltersType>) => {
      state.currentFilters = action.payload
    },
  },
})

export const { setCurrentFilters, setData, setGlobalValues } = jobDatalice.actions
export default jobDatalice.reducer
