/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vercel sets VERCEL=1 during its builds. Vercel Web Analytics only
    // works there, so other hosts (e.g. Azure Static Web Apps) skip it.
    'import.meta.env.VITE_ON_VERCEL': JSON.stringify(process.env.VERCEL === '1'),
  },
})
