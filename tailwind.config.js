/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        gradient: "gradient 15s ease infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%", backgroundSize: "200% 200%" },
          "50%": { backgroundPosition: "100% 50%", backgroundSize: "200% 200%" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "25%": { transform: "translate3d(-10px, -10px, 0)" },
          "50%": { transform: "translate3d(0, -20px, 0)" },
          "75%": { transform: "translate3d(10px, -10px, 0)" },
        },
      },
      // optional custom animation delays
      animationDelay: {
        1000: "1s",
        2000: "2s",
        3000: "3s",
      },
    },
  },
  plugins: [],
};
