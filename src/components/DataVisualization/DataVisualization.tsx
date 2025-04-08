import { languagei18n } from '#data/consts.ts'
import { useState } from 'react'
import { HorizontalBarChart } from './HorizontalBarChart'
import { getAllMatches } from '../../Utils/getAllMatches/getAllMatches'
import { useAppSelector } from '#Context/hooks/storeHooks'

export function DataVisualization() {
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth > 710 && window.innerWidth < 1020)

  const currentLanguage = useAppSelector(state => state.languageReducer.language)
  const { data, skills, location, salaryInfo } = useAppSelector(state => state.jobDataReducer)

  if (!data?.length) return

  const chartSize = 220

  const skillsMatches = getAllMatches({
    data,
    language: currentLanguage,
    propertyToSearch: 'skills',
    stringsToBeMatched: skills,
  })

  const locationsMatches = getAllMatches({
    data,
    language: currentLanguage,
    propertyToSearch: 'location',
    stringsToBeMatched: location,
  })

  window.addEventListener('resize', () => {
    if (data.length) return
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
          data={skillsMatches}
          title={languagei18n[currentLanguage].charts.skills.title}
          yTitle={languagei18n[currentLanguage].charts.skills.yTitle}
          xTitle={languagei18n[currentLanguage].charts.skills.xTitle}
          othersLabel={languagei18n[currentLanguage].charts.others}
          sizePx={chartSize}
        />
      </div>

      {salaryInfo.average && (
        <p className='text-4xl text-center flex-1 min-[1023px]:order-1 min-[1162px]:order-none my-8'>
          {languagei18n[currentLanguage].charts.average}
          <b className='text-green-300'>
            {salaryInfo.currency + Number(salaryInfo.average).toLocaleString()}
          </b>
        </p>
      )}

      <div className='overflow-x-auto max-sm:w-full max-sm:justify-center flex'>
        <HorizontalBarChart
          isMediumScreen={isMediumScreen}
          data={locationsMatches}
          title={languagei18n[currentLanguage].charts.location.title}
          yTitle={languagei18n[currentLanguage].charts.location.yTitle}
          xTitle={languagei18n[currentLanguage].charts.location.xTitle}
          othersLabel={languagei18n[currentLanguage].charts.others}
          sizePx={chartSize}
        />
      </div>
    </div>
  )
}
