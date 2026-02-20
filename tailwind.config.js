/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class", // respects 'data-theme' attribute
  theme: {
    extend: {
      animation: {
        gradient: "gradient 15s ease infinite",
        float: "float 8s ease-in-out infinite",
        blobMove: "blobMove 30s linear infinite",
        blobMove2: "blobMove2 45s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -20px, 0)" },
        },
        blobMove: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(20px, -30px) rotate(45deg)" },
          "50%": { transform: "translate(-20px, 20px) rotate(90deg)" },
          "75%": { transform: "translate(30px, 10px) rotate(135deg)" },
          "100%": { transform: "translate(0, 0) rotate(360deg)" },
        },
        blobMove2: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(-25px, 15px) rotate(-45deg)" },
          "50%": { transform: "translate(20px, -20px) rotate(-90deg)" },
          "75%": { transform: "translate(-15px, 25px) rotate(-135deg)" },
          "100%": { transform: "translate(0, 0) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
};
