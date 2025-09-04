/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#8B593E",
        background: "#FFF8F3",
        text: "#4A3428",
        border: "#E5D3B7",
        white: "#FFFFFF",
        textLight: "#9A8478",
        expense: "#E74C3C",
        income: "#2ECC71",
        card: "#FFFFFF",
        shadow: "#000000",
      },
    },
  },
  plugins: [],
};
