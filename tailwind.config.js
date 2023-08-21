/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      red: "#D71313",
      blue: "#4477CE",
      white: "#ffffff",
      black: "#000000",
      grey: "#F5F5F5",
      slate: "#334155",
      cream: "#F2EAD3",
      darkerCream: "#DFD7BF",
      chocolate: "#3F2305",
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
