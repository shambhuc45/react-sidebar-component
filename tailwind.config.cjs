/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
      },
      keyframes: {
        "grow-down-half": {
          "0%": { height: "0" },
          "100%": { height: "50%" },
        },
        "l-flow-horizontal": {
          "0%": { width: "0" },
          "100%": { width: "1rem" },
        },
      },
      animation: {
        "grow-down-half": "grow-down-half 0.2s ease-out forwards",
        "l-flow-horizontal": "l-flow-horizontal 0.2s ease-out 0.2s forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
