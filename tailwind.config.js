/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseGreen: "#47B88F",
        navColor: "rgb(18 28 45 / 50%)",
      },
    },
    backgroundImage: {
      world: "url('/world-map.svg')",
    },
  },
  plugins: [],
};