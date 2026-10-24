import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Vercel Web Analytics only works on Vercel; skipped on other hosts.
if (import.meta.env.VITE_ON_VERCEL) {
  import('@vercel/analytics').then(({ inject }) => inject())
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
