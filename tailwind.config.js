/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#d4e1ed",
          secondary: "#5e7f9e",
          darkshade: "#0d141a",
          grayblue: "#29445d",
          highlight: "#c17555",
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
        animation: {
          'fade-in-slide-up': 'fadeInUp 0.3s ease-out forwards',
          'fade-out-slide-down': 'fadeOutDown 0.3s ease-in forwards',
          'fade-in-slide-left': 'fadeInLeft 0.3s ease-out forwards',
          'fade-in-slide-right': 'fadeInRight 0.3s ease-out forwards',
          'slide-in-right': 'slideInRight 0.3s ease-out forwards',
          'slide-out-left': 'slideOutLeft 0.3s ease-in forwards',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          fadeOutDown: {
            '0%': { opacity: '1', transform: 'translateY(0)' },
            '100%': { opacity: '0', transform: 'translateY(10px)' },
          },
          fadeInLeft: {
            '0%': { opacity: '0', transform: 'translateX(10px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          fadeInRight: {
            '0%': { opacity: '0', transform: 'translateX(-10px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          slideInRight: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          slideOutLeft: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1200px",
        lg: "1400px",
        xl: "1700px",
      },
    },
    plugins: [],
  }