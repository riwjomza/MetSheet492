/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out'
      },
    },
    colors: {
      "purple": {
        supperLight: "#F6E3FF",
        light: "#D2ADE4",
        DEFAULT: "#7E51B9",
      },
      "black": {
        light: "#808080",
        DEFAULT: "#000"
      },
      "gray": {
        DEFAULT: "#D9D9D9"
      },
      "white": {
        DEFAULT: "#ffff"
      }
    }
  },
  plugins: [],
}