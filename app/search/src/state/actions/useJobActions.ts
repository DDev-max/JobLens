import type { FiltersType } from '#shared/types.ts'
import type { JobDescription } from '#globalShared/types.ts'
import type { SharedValues } from '../jobDataSlice'
import { setCurrentFilters, setData, setGlobalValues } from '../jobDataSlice'
import { useAppDispatch } from './storeHooks'

export function useJobActions() {
  const dispatch = useAppDispatch()

  const setJobData = (data: JobDescription[]) => {
    dispatch(setData(data))
  }

  const setSharedValues = (values: SharedValues) => {
    dispatch(setGlobalValues(values))
  }

  const setFilters = (filters: FiltersType) => {
    dispatch(setCurrentFilters(filters))
  }

  return { setJobData, setFilters, setSharedValues }
}
