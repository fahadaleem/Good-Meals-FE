/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      container: {
        screens: {
          "2xl": "1360px",
        },
      },
      colors: {
        "pop-pink": "#F8379F",
        "primary-color": "#FD8653",
        "secondary-color": "#FFC226",
        "dark-blue": "#4A3AFF",
        "neutral-800": "#14142B",
        "neutral-700": "#4E4B66",
        "neutral-600": "#6E7191",
        "neutral-500": "#A0A3BD",
        "neutral-450": "#FAF5F1",
        "neutral-400": "#D9DBE9",
        "neutral-300": "#EFF0F6",
        "neutral-200": "#D9DBE9",
        "neutral-100": "#FFFFFF",
        "dark-black-800": "#333333",
      },
      backgroundImage: {
        primary:
          "linear-gradient(90deg, #FF5C00 -3.12%, #FF33D2 48.22%, #FFDB5C 105.52%);",
      },
    },
  },
  plugins: [],
};
