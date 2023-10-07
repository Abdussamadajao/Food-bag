/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5D9D0B",
        "primary-white": "#F4FEFD",
        primaryDark: {
          DEFAULT: "#1B2223",
          100: "#3A4F50",
        },
        disabled: "#cc7575",
        dark: {
          DEFAULT: "#A5A5A5",
          100: "#4E4D4D",
          200: "#696969",
        },
      },
      fontFamily: {
        pop: ["Poppins"],
      },
      backgroundImage: {
        "hero-image":
          "" +
          "linear-gradient(to right bottom," +
          " rgba(0, 0, 0, 0.6)," +
          " rgba(0, 0,0, 0.6)" +
          "), " +
          "url('https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=960&q=80')",
      },
    },
  },
  plugins: [],
};
