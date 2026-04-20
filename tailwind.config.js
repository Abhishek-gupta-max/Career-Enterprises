/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#1a365d',
        'primary-light': '#2c5282',
        'secondary-gold': '#df9a28',
        'secondary-orange': '#ed8936',
        'text-dark': '#1a202c',
        'text-muted': '#4a5568',
        'bg-light': '#f7fafc',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
