import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { HeroUIProvider } from '@heroui/system'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HeroUIProvider className='flex flex-col min-h-screen'>
    <App />
  </HeroUIProvider>
)
