/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        container: "37.5rem",
      },
      backgroundImage: {
        "chat-angry": "url('/images/화남_BG.png')",
        "chat-happy": "url('/images/기쁨_BG.png')",
        "chat-sad": "url('/images/슬픔_BG.png')",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#3d3d3d",
        950: "#0e0e0e",
      },
    },
  },
  plugins: [],
};
