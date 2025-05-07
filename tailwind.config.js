/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#9055FF',
        secondary: '#13B0E9',
        accent: '#ff9933',
        darkBg1: '#0f0723',
        darkBg2: '#1a1033',
      },
      boxShadow: {
        'neon-primary': '0 0 20px rgba(144, 85, 255, 0.5)',
        'neon-primary-lg': '0 0 30px rgba(144, 85, 255, 0.7)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
      },
      textShadow: {
        'neon': '0 0 10px rgba(144, 85, 255, 0.5)',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 10px rgba(144, 85, 255, 0.5)',
        },
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-md': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.bg-glass': {
          backgroundColor: 'rgba(30, 30, 50, 0.15)',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 