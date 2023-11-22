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
        'button-blue': '#5576F5',
        'bgr-white': '#F5F9FD',
        'header-blue' : '#182256',
        'input-border-grey' : '#E1E1E1'
       },
      space: {
        '76px' : '76px',
        '45px' : '45px',
        '0.25px' : '0.25px',
        '2px' : '2px',
        '631px' : '631px',
      },

    },
  },
  plugins: [],
}

