/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#61bfc0',  // derived from logo
          coral: '#f58a8c', // derived from logo hand mark
          ink: '#0f172a',
          cloud: '#f8fafc',
        },
      },
      boxShadow: {
        soft: '0 10px 25px rgba(2, 6, 23, 0.08)'
      }
    },
  },
  plugins: [],
}