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
                    green: '#1A4731', // Deep Forest Green (Primary)
                    lightGreen: '#4A7C59', // Secondary Green
                    gold: '#C8A97E', // Matte Gold (Accent)
                    cream: '#F9F8F6', // Off-White / Cream (Background)
                    charcoal: '#2D2D2D', // Premium Dark Text
                    dark: '#1A1A1A', // Dark Mode Bg
                    red: '#1A4731', // OVERRIDE: Mapping Red to Green to safely migrate existing red components initially
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'], // For Headings
            },
            backgroundImage: {
                'hero-pattern': "url('https://www.transparenttextures.com/patterns/arabesque.png')", // Subtle pattern placeholder
            }
        },
    },
    plugins: [],
}
