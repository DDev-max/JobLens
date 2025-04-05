import { Header } from './components/header'
import { Search } from './components/search/Search'
import { DataVisualization } from './components/DataVisualization/DataVisualization'
import { JobOffers } from './components/JobOffers/JobOffers'

function App() {
  return (
    <>
      <Header />

      <main className=' flex flex-col bg-background dark text-foreground flex-1 justify-center px-3'>
        <Search />

        <DataVisualization />

        <JobOffers />
      </main>
    </>
  )
}

export default App
