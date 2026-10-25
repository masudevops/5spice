import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Cloudflare Web Analytics (cookie-free). The token comes from the build
// environment, and only the real domain loads it, so local dev and PR
// previews don't count as visits.
const cfAnalyticsToken = import.meta.env.VITE_CF_ANALYTICS_TOKEN
if (cfAnalyticsToken && /(^|\.)5spicemarket\.com$/.test(window.location.hostname)) {
  const beacon = document.createElement('script')
  beacon.defer = true
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js'
  beacon.dataset.cfBeacon = JSON.stringify({ token: cfAnalyticsToken })
  document.head.appendChild(beacon)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
