import { Header } from './components/header'
import { HorizontalBarChart } from './components/HorizontalBarChart'
import { Search } from './components/search'
import { MOCK_OBJ_SCRAPPING } from '../scrappingObj'
import { getAllMatches } from './Utils/getAllMatches'
import { JobCard } from './components/JobCard'
import { useState } from 'react'
import { Button } from '@heroui/button'

function App() {
  const skills = getAllMatches({
    data: MOCK_OBJ_SCRAPPING,
    language: 'EN',
    propertyToSearch: 'skills',
    stringsToBeMatched: ['react', 'angular', 'php', 'node', 'vue'],
  })

  const locations = getAllMatches({
    data: MOCK_OBJ_SCRAPPING,
    language: 'EN',
    propertyToSearch: 'orgName',
    stringsToBeMatched: ['Golabs'],
  })

  const [maxItems, setMaxItems] = useState(8)

  return (
    <>
      <Header />
      <main className=' flex flex-col bg-background dark text-foreground flex-1 justify-center px-3'>
        <Search />

        <div className='flex gap-5 flex-wrap flex-col md:flex-row  my-6 mx-2 justify-around sm:items-center'>
          <div className=''>
            <HorizontalBarChart data={skills} title='Skills for ___ Job Offers' yTitle='Skills' sizePx={220} />
          </div>

          <div className=''>
            <HorizontalBarChart data={locations} title='Locations of ___ Job Offers' yTitle='Locations' sizePx={220} />
          </div>
        </div>

        <p className='m-5'>{MOCK_OBJ_SCRAPPING.length} job offers have been read</p>
        <section className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 '>
          {MOCK_OBJ_SCRAPPING.slice(0, maxItems).map((el, idx) => (
            <article key={idx}>
              <JobCard jobData={el} />
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
