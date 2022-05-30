module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    gridTemplateAreas: {
      overview: ["form .", "form .", "form ."],
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@savvywombat/tailwindcss-grid-areas"),
  ],
};
