/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "640px" },
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }
      ct: "1366px",
      lg: "1400px",
      // => @media (min-width: 1024px) { ... }

      xl: "1800px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
