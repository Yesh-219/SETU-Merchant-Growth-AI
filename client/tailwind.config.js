/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paytm: {
          blue: '#002E6E',
          cyan: '#00BAF2',
          navy: '#011B45',
          light: '#E6F7FC',
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
        },
      },
    },
  },
  plugins: [],
};

