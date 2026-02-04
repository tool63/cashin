/** @type {import('tailwindcss').Config} */
module.exports = {
  // Files Tailwind should scan for class names
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  // Enable dark mode using a CSS class (`class` strategy)
  darkMode: "class",

  theme: {
    extend: {
      // Optional: you can extend default colors, spacing, fonts, etc.
      colors: {
        cyan: {
          400: "#22d3ee", // matches your Hero text color
        },
        green: {
          500: "#22c55e", // matches your button background
          600: "#16a34a", // hover state
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },

  plugins: [
    // You can add Tailwind plugins here if needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
