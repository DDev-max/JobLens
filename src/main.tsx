import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { setupStore } from '#Context/store'
import { HeroUIProvider } from '@heroui/system'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider className='flex flex-col min-h-screen'>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </HeroUIProvider>
  </React.StrictMode>
)
