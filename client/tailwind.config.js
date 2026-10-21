// rgb(var(--color-x) / <alpha-value>) lets opacity modifiers like /25 work.
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
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
                    green: { DEFAULT: token('green'), dark: token('green-dark') },
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
            fontFamily: {
                // Noto Sans Bengali is the fallback so Bengali words inside
                // English text (e.g. পাঁচফোড়ন) render in a proper Bengali face.
                sans: ['Inter', 'Noto Sans Bengali', 'sans-serif'],
                serif: ['Playfair Display', 'Noto Sans Bengali', 'serif'], // For Headings
                bengali: ['Noto Sans Bengali', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('https://www.transparenttextures.com/patterns/arabesque.png')", // Subtle pattern placeholder
            }
        },
    },
    plugins: [],
}
