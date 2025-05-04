import { DataVisualization } from '#ui/DataVisualization/DataVisualization.tsx'
import { JobOffers } from '#ui/JobOffers/JobOffers.tsx'
import { Search } from '#ui/searchInput/search.tsx'
import { Header } from './header/header'

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
