/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ["'Open Sans'", 'Roboto', 'Arial', 'sans-serif'],
      body: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {
      colors: {
        hairline: '#dadce0',
        surface: '#3c4043'
      }
    }
  },
  plugins: ['']
}
