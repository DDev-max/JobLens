import type { RootState } from '@/Context/store'
import { languagei18n } from '@/data/consts'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { HorizontalBarChart } from '../HorizontalBarChart'
import { getAllMatches } from './getAllMatches'

export function DataVisualization() {
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth > 710 && window.innerWidth < 1020)

  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)
  const { currency, salaryAvg } = useSelector((state: RootState) => state.jobDataReducer.salary)

  const jobData = useSelector((state: RootState) => state.jobDataReducer.data)
  const jobSkills = useSelector((state: RootState) => state.jobDataReducer.skills)
  const jobLocation = useSelector((state: RootState) => state.jobDataReducer.location)

  if (!jobData?.length) return

  const chartSize = 220

  const skills = getAllMatches({
    data: jobData,
    language: currentLanguage,
    propertyToSearch: 'skills',
    stringsToBeMatched: jobSkills,
  })

  const locations = getAllMatches({
    data: jobData,
    language: currentLanguage,
    propertyToSearch: 'location',
    stringsToBeMatched: jobLocation,
  })

  window.addEventListener('resize', () => {
    if (jobData.length) return
    if (window.innerWidth > 710 && window.innerWidth < 1020) {
      if (isMediumScreen) return
      window.location.reload()
      setIsMediumScreen(true)
    } else {
      if (!isMediumScreen) return
      setIsMediumScreen(false)
      window.location.reload()
    }
  })

  return (
    <div className='flex gap-5 flex-wrap  my-3 mx-2 justify-around sm:items-center flex-col lg:flex-row items-center'>
      <div className='overflow-x-auto max-sm:w-full max-sm:justify-center flex'>
        <HorizontalBarChart
          isMediumScreen={isMediumScreen}
          data={skills}
          title={languagei18n[currentLanguage].charts.skills.title}
          yTitle={languagei18n[currentLanguage].charts.skills.yTitle}
          xTitle={languagei18n[currentLanguage].charts.skills.xTitle}
          sizePx={chartSize}
        />
      </div>

      {salaryAvg && (
        <p className='text-4xl text-center flex-1 min-[1023px]:order-1 min-[1162px]:order-none my-8'>
          {languagei18n[currentLanguage].charts.average}
          <b className='text-green-300'>{currency + Number(salaryAvg).toLocaleString()}</b>
        </p>
      )}

      <div className='overflow-x-auto max-sm:w-full max-sm:justify-center flex'>
        <HorizontalBarChart
          isMediumScreen={isMediumScreen}
          data={locations}
          title={languagei18n[currentLanguage].charts.location.title}
          yTitle={languagei18n[currentLanguage].charts.location.yTitle}
          xTitle={languagei18n[currentLanguage].charts.location.xTitle}
          sizePx={chartSize}
        />
      </div>
    </div>
  )
}
