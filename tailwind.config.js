/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        brand: {
          teal:  '#61bfc0',  // derived from logo
          coral: '#f58a8c',  // derived from logo hand mark
          ink:   '#0f172a',
          cloud: '#f8fafc',
        },
      },
      boxShadow: {
        soft: '0 10px 25px rgba(2, 6, 23, 0.08)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      zIndex: {
        60: '60',
        70: '70',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
