/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: [
    "range",
    "range-error",
    "range-warning",
    "range-accent",
    "range-success",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
