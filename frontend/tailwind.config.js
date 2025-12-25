/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F6D3',
        pink: '#F39EB6',
        pinkLight: '#FFE4EF',
        green: '#B8DB80',
      }
    },
  },
  plugins: [],
}