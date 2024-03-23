/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        WorkSans: ["Work Sans", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#267596",
        secondary: "#3095bf",
        monsoon: "#878790",
        ShipGrey: "#3A3A49",
        lightGray: "#d9d9d9",
        haiti: "#230b34",
        firefly: "#05222e",
        cerulean: "#00acee",
        duskyBlue: "#39569C",
        darkPink: "#EA4C89",
        fadedOrange: "#F2994A",
      },
      fontSize: {
        "2xs": "10px",
        xs: "12px",
        sm: "13px",
        md: "14px",
        lg: "16px",
        xl: "18px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "28px",
        "5xl": "30px",
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          ".scrollbar-custom": {
            "::-webkit-scrollbar": {
              width: "2px", // Adjust the width as needed
              height: "2px", // Adjust the height as needed
            },
            "::-webkit-scrollbar-thumb": {
              background: "#fff", // Change the color as needed
            },
            "::-webkit-scrollbar-track": {
              background: "#E5E7EB", // Change the track color as needed
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#805AD5", // Change hover color as needed
            },
          },
        };
        addUtilities(newUtilities, {
          variants: ["responsive"],
        });
      },
    ],
  },
  plugins: [],
};
