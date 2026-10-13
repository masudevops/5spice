/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    green: 'var(--color-brand-green)',
                    lightGreen: '#3f7f51',
                    gold: 'var(--color-accent-gold)',
                    cream: 'var(--color-text-primary)',
                    charcoal: 'var(--color-background)',
                    dark: 'var(--color-background)',
                    orange: 'var(--color-brand-orange)',
                    red: 'var(--color-brand-orange)',
                }
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
