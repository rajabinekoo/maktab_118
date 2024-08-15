/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.html"],
  theme: {
    extend: {
      colors: {
        "app-teal": "#00f0bf",
        "app-blue": "#3483e8",
        "app-pink": "#f83c79",
        "app-gray": "#eeeeee",
        "app-orange": "#ecbb52",
      },
      height: {
        box: "200px"
      }
    },
  },
  plugins: [],
};
