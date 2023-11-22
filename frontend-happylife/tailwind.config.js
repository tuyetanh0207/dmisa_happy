/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-blue': '#142255',
        'custom-blue-3':'#EEF1FE',
      },
      textColor: {
        'custom-blue-2': '#64CEC9',
      },
    },
  },
  plugins: [],
}

