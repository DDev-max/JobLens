import type { FiltersType, JobDescription } from '@/data/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const skills: readonly string[] = []
const location: readonly string[] = []

const salary = {
  currency: '',
  salaryAvg: '',
}

const currentFilters: FiltersType = {
  location: [],
  skills: [],
  salaryDesc: [false],
}

const data: readonly JobDescription[] = []

const initialState = {
  data,
  skills,
  location,
  salary,
  currentFilters,
}

const jobDatalice = createSlice({
  name: 'jobData',
  initialState,
  reducers: {
    setJobData: (state, action: PayloadAction<JobDescription[]>) => {
      state.data = action.payload
    },
    setJobSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload
    },
    setJobLocation: (state, action: PayloadAction<string[]>) => {
      state.location = action.payload
    },
    setJobSalary: (state, action: PayloadAction<typeof salary>) => {
      state.salary = action.payload
    },
    setFilters: (state, action: PayloadAction<FiltersType>) => {
      state.currentFilters = action.payload
    },
  },
})

export const { setJobData, setJobSkills, setJobLocation, setJobSalary, setFilters } = jobDatalice.actions
export default jobDatalice.reducer
