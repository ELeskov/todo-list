import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/app/styles/index.scss'
import '@/app/styles/index.css'

import { Home } from '@/pages/homePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
