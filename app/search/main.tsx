import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { setupStore } from './src/state/store'
import { HeroUIProvider } from '@heroui/system'
import { Provider } from 'react-redux'
import App from './src/ui/App'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider className='flex flex-col min-h-screen'>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </HeroUIProvider>
  </React.StrictMode>
)
