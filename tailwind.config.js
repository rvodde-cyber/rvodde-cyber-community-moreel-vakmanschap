/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["DM Sans", "sans-serif"]
      },
      colors: {
        achtergrond: "var(--achtergrond)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        primair: "var(--tekst-primair)",
        secundair: "var(--tekst-secundair)",
        rand: "var(--rand)",
        accent: "var(--complexity-color)",
        complexiteit: "var(--complexity-color)",
        attributie: "var(--attribution-color)",
        nachtblauw: "#1B2A4A",
        amber: "#D9A441",
        mistgrijs: "#B8BCC2",
        "verdenk-wit": "#F7F5F0",
        koraal: "#D97757"
      },
      boxShadow: {
        warm: "0 24px 80px rgba(26, 39, 68, 0.08)"
      }
    }
  },
  plugins: []
};
