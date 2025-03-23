import type { Filters, JobDescription } from '@/data/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const skills: readonly string[] = ['react', 'Angular']
const location: readonly string[] = ['san jose', 'casa']

const salary = {
  currency: '',
  salaryAvg: '',
}

export const defaultFilters: Filters = {
  location: [''],
  skills: [''],
  salaryDesc: [false],
}

const data: readonly JobDescription[] = []

const initialState = {
  data,
  skills,
  location,
  salary,
  defaultFilters,
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
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.defaultFilters = action.payload
    },
  },
})

export const { setJobData, setJobSkills, setJobLocation, setJobSalary, setFilters } = jobDatalice.actions
export default jobDatalice.reducer
