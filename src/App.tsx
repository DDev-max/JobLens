import { Header } from './components/header'
import { HorizontalBarChart } from './components/HorizontalBarChart'
import { Search } from './components/search'
import { MOCK_OBJ_SCRAPPING } from '../scrappingObj'
import { getAllMatches } from './Utils/getAllMatches'
import { JobCard } from './components/JobCard'

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
          {MOCK_OBJ_SCRAPPING.map((el, idx) => (
            <article>
              <JobCard jobData={el} key={idx} />
            </article>
          ))}
        </section>
      </main>
    </>
  )
}

export default App
