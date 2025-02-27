/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#BE0822",
          secondary: "#FFF9F5",
          background: "#F0B2B9",
          buttonBg: "#FCD7D0",
          buttonText: "#A5B192",
        },
      },
    },
    plugins: [],
  };
  