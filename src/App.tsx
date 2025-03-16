import { Header } from './components/header'
import { HorizontalBarChart } from './components/HorizontalBarChart'
import { Search } from './components/search'
import { MOCK_OBJ_SCRAPPING } from '../scrappingObj'
import { getAllMatches } from './Utils/getAllMatches'
import { JobCard } from './components/JobCard'
import { useState } from 'react'
import { Button } from '@heroui/button'
import { useSelector } from 'react-redux'
import type { RootState } from './Context/store'
import { languagei18n } from './data/consts'
import { getSalaryAvg } from './Utils/getSalaryAvg'

function App() {
  const skills = getAllMatches({
    data: MOCK_OBJ_SCRAPPING,
    language: 'EN',
    propertyToSearch: 'skills',
    stringsToBeMatched: ['react', 'zustand', 'context', 'node', 'vue'],
  })

  const locations = getAllMatches({
    data: MOCK_OBJ_SCRAPPING,
    language: 'EN',
    propertyToSearch: 'location',
    stringsToBeMatched: ['Cartago'],
  })

  const [maxItems, setMaxItems] = useState(8)

  const { currency, salaryAvg } = getSalaryAvg({ data: MOCK_OBJ_SCRAPPING })

  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)

  return (
    <>
      <Header />
      <main className=' flex flex-col bg-background dark text-foreground flex-1 justify-center px-3'>
        <Search />

        <div className='flex gap-5 flex-wrap flex-col md:flex-row  my-6 mx-2 justify-around sm:items-center'>
          <div>
            <HorizontalBarChart
              data={skills}
              title={languagei18n[currentLanguage].charts.skills.title}
              yTitle={languagei18n[currentLanguage].charts.skills.yTitle}
              xTitle={languagei18n[currentLanguage].charts.skills.xTitle}
              sizePx={220}
            />
          </div>

          {salaryAvg && (
            <p className='text-4xl text-center flex-1'>
              {languagei18n[currentLanguage].charts.average}
              <b>{currency + Number(salaryAvg).toLocaleString()}</b>
            </p>
          )}

          <div>
            <HorizontalBarChart
              data={locations}
              title={languagei18n[currentLanguage].charts.location.title}
              yTitle={languagei18n[currentLanguage].charts.location.yTitle}
              xTitle={languagei18n[currentLanguage].charts.location.xTitle}
              sizePx={220}
            />
          </div>
        </div>

        <p className='m-5'>
          {MOCK_OBJ_SCRAPPING.length} {languagei18n[currentLanguage].charts.info}
        </p>
        <section className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 '>
          {MOCK_OBJ_SCRAPPING.slice(0, maxItems).map((el, idx) => (
            <article key={idx}>
              <JobCard jobData={el} jobSalaryAvg={Number(salaryAvg)} currency={currency || ''} />
            </article>
          ))}
        </section>

        {maxItems < MOCK_OBJ_SCRAPPING.length && (
          <Button
            onPress={() => {
              setMaxItems(prev => prev + 8)
            }}
            size='lg'
            className='m-4 md:w-60 ml-auto mr-auto'
            color='primary'
          >
            Show more
          </Button>
        )}
      </main>
    </>
  )
}

export default App
