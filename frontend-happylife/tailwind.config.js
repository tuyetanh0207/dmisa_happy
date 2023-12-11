/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  
    extend: {
      // screens:{
      //   //'sm1': '400px',
      // },
      backgroundColor: {
        'custom-blue': '#142255',
        'custom-blue-2': '#CAD6FD',
        'custom-blue-3':'#EEF1FE',
        'button-blue': '#5576F5',
        'bgr-white': '#F5F9FD',
        'header-blue' : '#182256',
        'input-border-grey' : '#E1E1E1'
      },
      textColor: {
        'custom-blue': '#142255',
        'custom-blue-2': '#64CEC9',
        'custom-blue-3': '#5576F5',
      },
       
      space: {
        '76px' : '76px',
        '45px' : '45px',
        '0.25px' : '0.25px',
        '2px' : '2px',
        '631px' : '631px',
      },
      listStyleImage: {
        'store' : 'url("/src/assets/chevronright.svg") ',
      },

    },
  },
  plugins: [],
}

