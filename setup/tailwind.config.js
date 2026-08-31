/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["\"DM Sans\"", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["\"Fraunces\"", "Georgia", "serif"],
      },
      colors: {
        canvas: "#F7F8F6",
        "canvas-deep": "#EEF1EE",
        ink: "#14201A",
        "ink-soft": "#3D4A43",
        "ink-muted": "#6B7871",
        hairline: "rgba(20, 32, 26, 0.08)",
        // Dark racing green — accent; red reserved for isolation risk later
        racing: {
          DEFAULT: "#0B3D2E",
          soft: "#1A5C45",
          mist: "rgba(11, 61, 46, 0.08)",
        },
        steel: "#3A4F63",
      },
      boxShadow: {
        glass: "0 1px 2px rgba(20, 32, 26, 0.04), 0 24px 60px -24px rgba(20, 32, 26, 0.16)",
        lift: "0 2px 4px rgba(20, 32, 26, 0.04), 0 32px 80px -32px rgba(20, 32, 26, 0.24)",
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
