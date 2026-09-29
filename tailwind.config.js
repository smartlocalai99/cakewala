/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Chocolate: headings, text, selected states
        ganache: {
          DEFAULT: "#3B1D16",
          light: "#5A3228",
        },
        // Neutral fill for search, toggle and image placeholders
        surface: "#F4F2F1",
        // Logo red (from cakewala-logo.png)
        brand: "#D85034",
        // Secondary text on white (6.9:1 contrast)
        muted: "#7A5A52",
        // FSSAI food marks: green = eggless (veg), brown = contains egg (non-veg)
        veg: "#1E8E3E",
        nonveg: "#8B4513",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-figtree)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shop: "1120px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 280ms ease-out both",
      },
    },
  },
  plugins: [],
};
