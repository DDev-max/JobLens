import { Header } from './components/header'
import { HorizontalBarChart } from './components/HorizontalBarChart'
import { Search } from './components/search'

function App() {
  return (
    <>
      <Header />
      <main className=' flex flex-col bg-background dark text-foreground flex-1 justify-center'>
        <Search />
        <HorizontalBarChart
          data={{
            Guadalajara: 29,
            Chicago: 15,
            Medellin: 3,
          }}
          title='Top Locations for ___ Job Requests'
          yTitle='Locations'
        />
      </main>
    </>
  )
}

export default App
