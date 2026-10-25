import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const srcDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src')

// Every distinct Bengali character used anywhere in src/ (e.g. পাঁচফোড়ন).
const collectBengaliText = () => {
  const chars = new Set()
  for (const file of readdirSync(srcDir, { recursive: true })) {
    if (!/\.(jsx?|json)$/.test(file)) continue
    const text = readFileSync(path.join(srcDir, file), 'utf8')
    for (const char of text.match(/[\u0980-\u09FF\u200C\u200D]/g) ?? []) chars.add(char)
  }
  return [...chars].sort().join('')
}

// Google Fonts serves only the letters listed in `text=`, so the Bengali font
// is a few KB instead of ~100 KB, and new Bengali words are picked up
// automatically on the next build.
const bengaliFontSubset = () => ({
  name: 'bengali-font-subset',
  transformIndexHtml(html) {
    const text = collectBengaliText()
    return text
      ? html.replaceAll('__BENGALI_FONT_TEXT__', encodeURIComponent(text))
      : html.replace(/\s*<!-- Bengali font[\s\S]*?-->\s*<link[^>]*__BENGALI_FONT_TEXT__[^>]*>/, '')
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), bengaliFontSubset()],
})
