/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        canvas: "#FAFAF9",
        "canvas-deep": "#F5F5F4",
        ink: "#1C1917",
        "ink-soft": "#57534E",
        "ink-muted": "#78716C",
        hairline: "rgba(28, 25, 23, 0.08)",
      },
      boxShadow: {
        glass: "0 1px 2px rgba(28, 25, 23, 0.04), 0 24px 60px -24px rgba(28, 25, 23, 0.18)",
        lift: "0 2px 4px rgba(28, 25, 23, 0.04), 0 32px 80px -32px rgba(28, 25, 23, 0.28)",
      },
      borderRadius: {
        panel: "24px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
