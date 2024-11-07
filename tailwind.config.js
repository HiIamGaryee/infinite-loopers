// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#9333EA",
        accent: "#F59E0B",
        background: "#F3F4F6",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom sans font
        serif: ["Merriweather", "serif"], // Custom serif font
      },
    },
  },
  plugins: [],
};
