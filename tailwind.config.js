/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
        },

        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },

        border: {
          DEFAULT: "var(--border-color)",
          light: "var(--border-light)",
        },

        brand: {
          yellow: "#facc15",
          green: "#22c55e",
          darkGreen: "#15803d",
        },

      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right, var(--gradient-from), var(--gradient-via), var(--gradient-to))",
      },

      boxShadow: {
        glowGreen: "0 0 20px rgba(34,197,94,0.4)",
        glowYellow: "0 0 20px rgba(250,204,21,0.4)",
      },

      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },

      maxWidth: {
        container: "1200px",
      },

    },
  },

  plugins: [],
};
