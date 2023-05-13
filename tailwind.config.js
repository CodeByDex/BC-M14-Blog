/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.handlebars", 
              "./public/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      center: true,
    }
  },
  plugins: [],
}

