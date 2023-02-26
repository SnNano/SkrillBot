/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'poppins':['Poppins', 'sans serif'],
      },
      colors:{
        red:{
          500:'#F46D5A'
        },
        green:{
          400:'#26E35F',
          500:'#29C81E'
        }
      }
    },
  },
  plugins: [],
}
