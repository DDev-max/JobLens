import { DataVisualization } from '#components/DataVisualization/DataVisualization.tsx'
import { Header } from '#components/header.tsx'
import { JobOffers } from '#components/JobOffers/JobOffers.tsx'
import { Search } from '#components/search/search.tsx'

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
