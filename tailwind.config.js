/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'Roboto'],
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
