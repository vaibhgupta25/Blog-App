/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1565D8",
        dark:{
          hard : "#0D2436",
          light : "#5A7184",
          soft : "#183B56",
        }
      },
      fontFamily : {
        opensans : ["'Open Sans'", "sans-serif"], 
        roboto : ["'Roboto'", "sans-serif"], 
        poppins : ["'Poppins'", "sans-serif"], 
      }

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}

