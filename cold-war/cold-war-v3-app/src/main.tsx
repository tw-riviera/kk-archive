import { createRoot } from 'react-dom/client'
import { HashRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import App from './App.tsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ScrollToTop />
    <App />
  </HashRouter>,
)
