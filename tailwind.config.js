/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { "2xl": "1636px" },
      colors: {
        primary: "#4169E1",
        secondary: "#000000",
        heading: "#1f1f1f",
        subheading: "#9e9e9e",
        gray: "#5A5A5A",
        background: "#FFFFFF",
        lightwhite: "#F5F5F5",
        liteblack: "4D4D4D",
        lightGray: "#AFAFAF",
        watermark: "#F0F2F5",
        bghover: "#19181D",
      },
    },
  },
  plugins: [],
};
