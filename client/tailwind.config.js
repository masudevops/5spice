// rgb(var(--color-x) / <alpha-value>) lets opacity modifiers like /25 work.
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Brand color tokens, defined once in src/index.css (:root).
            colors: {
                brand: {
                    gold: { DEFAULT: token('gold'), deep: token('gold-deep') },
                    green: { DEFAULT: token('green'), light: token('green-light') },
                    forest: token('forest'),
                    orange: token('orange'),
                    cream: token('cream'),
                    parchment: token('parchment'),
                },
                ink: {
                    950: token('ink-950'),
                    900: token('ink-900'),
                    850: token('ink-850'),
                    800: token('ink-800'),
                    750: token('ink-750'),
                    700: token('ink-700'),
                    600: token('ink-600'),
                },
            },
            // Extra opacity steps used across the site (e.g. text-white/62,
            // bg-ink-900/92). Tailwind only ships steps of 5, and a modifier
            // outside the scale silently generates no CSS, so add any new
            // value here before using it.
            opacity: { 8: '0.08', 12: '0.12', 38: '0.38', 58: '0.58', 62: '0.62', 68: '0.68', 72: '0.72', 74: '0.74', 78: '0.78', 82: '0.82', 86: '0.86', 92: '0.92' },
            fontFamily: {
                // Noto Sans Bengali is the fallback so Bengali words inside
                // English text (e.g. পাঁচফোড়ন) render in a proper Bengali face.
                // The "Fallback" faces (src/index.css) are system fonts sized to
                // match, so text doesn't jump when the web fonts finish loading.
                sans: ['Inter', 'Inter Fallback', 'Noto Sans Bengali', 'sans-serif'],
                serif: ['Playfair Display', 'Playfair Fallback', 'Noto Sans Bengali', 'serif'], // For Headings
                bengali: ['Noto Sans Bengali', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
