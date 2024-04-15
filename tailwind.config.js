/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#282834",
        bot: "#45415A",
        human: "#725DE5"
      },
      borderRadius: {
        "chat-box": "3rem",
      }
    },
  },
  plugins: [],
};
