import { Header } from './components/header'
import { HorizontalBarChart } from './components/HorizontalBarChart'
import { Search } from './components/search'
import { MOCK_JOB_STATS } from './mocks/scrappingObj'
import { getAllMatches } from './Utils/getAllMatches'

function App() {
  const skills = getAllMatches({
    data: MOCK_JOB_STATS,
    language: 'EN',
    propertyToSearch: 'skills',
    stringsToBeMatched: ['react', 'angular', 'vue'],
  })

  const locations = getAllMatches({
    data: MOCK_JOB_STATS,
    language: 'EN',
    propertyToSearch: 'location',
    stringsToBeMatched: ['cartago', 'san jose'],
  })

  return (
    <>
      <Header />
      <main className=' flex flex-col bg-background dark text-foreground flex-1 justify-center'>
        <Search />
        <HorizontalBarChart data={skills} title='Skills for ___ Job Offers' yTitle='Skills' />

        <HorizontalBarChart data={locations} title='Locations of ___ Job Offers' yTitle='Locations' />
      </main>
    </>
  )
}

export default App
