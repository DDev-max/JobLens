import { Header } from './components/header'
import { Search } from './components/search'

function App() {
  return (
    <main className=' flex flex-col bg-background dark text-foreground'>
      <Header />
      <Search />
    </main>
  )
}

export default App
