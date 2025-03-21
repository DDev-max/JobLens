import type { JobDescription } from '@/data/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const data: JobDescription[] = []
const skills: string[] = []
const location: string[] = []

const salary = {
  currency: '',
  salaryAvg: '',
}

const initialState = {
  data,
  skills,
  location,
  salary,
}

const jobDatalice = createSlice({
  name: 'jobInfo',
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
  },
})

export const { setJobData, setJobSkills, setJobLocation, setJobSalary } = jobDatalice.actions
export default jobDatalice.reducer
