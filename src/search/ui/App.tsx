import { DataVisualization } from '#search/ui/DataVisualization/DataVisualization.tsx'
import { JobOffers } from '#search/ui/JobOffers/JobOffers.tsx'
import { Search } from '#search/ui/searchInput/search.tsx'
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
