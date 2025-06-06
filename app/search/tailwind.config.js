import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.tsx',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui()],
}
