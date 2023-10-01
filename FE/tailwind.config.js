/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          // "url('https://static.vecteezy.com/system/resources/thumbnails/002/299/195/small_2x/violet-purple-white-watercolor-brush-paint-background-vector.jpg')",
          "url('https://img.freepik.com/premium-vector/blue-pastel-colorful-gradient-background-templates-design-colorful-concept-light-blue-pink-yellow_293525-1102.jpg')",

        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
