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
                    red: '#C41E3A', // Cardinal / Deep Red
                    saffron: '#F4C430', // Saffron
                    gold: '#FFD700', // Gold
                    green: '#006B3C', // Deep Green
                    cream: '#FDFCF5', // Warm Light Background
                    charcoal: '#2D2D2D', // Premium Dark
                    dark: '#1A1A1A', // Darker background for dark mode
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
