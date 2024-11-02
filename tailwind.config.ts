/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { preflight: true }, // Make false to remove the tailwind reset
}
