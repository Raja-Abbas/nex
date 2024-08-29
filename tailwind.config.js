/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xs: "8px",
      sm: "10px",
      tiny: "12px",
      base: "14px",
      lg: "16px",
      xl: "18px",
      "2xl": "20px",
      "3xl": "28px",
      "4xl": "34px",
      "custom-size": "22px",
    },
    colors: {
      "dark-blue": "#1EB8CD",
      "light-blue": "#28B8CD",
      "sky-blue": "#7FB7D9",
      green: "#0D9200",
      pink: "#ffbdff",
      yellow: "#ffffbc",
      "light-gray": "#61737F",
      "medium-grey-color": "#202222",
      "dark-gray": "#20292b",
      "light-black": "#202020",
      background: "#191919",
      "description-color": "#878593",
      white: "#fff",
      "custom-color": "#2C2C2C",
      "card-color": "#243134",
      "light-grey-color": "#5A5A5A",
      black: "#000",
    },
    borderColor: {
      "custom-color": "#1a5b65",
      "dark-blue": "#1EB8CD",
      "light-blue": "#28B8CD",
      "light-sky-blue": "#7FB7D9",
      green: "#0D9200",
      pink: "#ffbdff",
      "light-yellow": "#ffffbc",
      "light-gray": "#61737F",
      "dark-gray": "#20292b",
      background: "#191919",
      white: "#fff",
      "line-color": "#313131",
      "light-grey-color": "#5A5A5A",
      "medium-grey-color": "#202222",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
