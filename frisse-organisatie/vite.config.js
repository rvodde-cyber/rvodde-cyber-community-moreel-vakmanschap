import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standalone Vercel project: base "/"
// Ingebed onder een pad van een bestaande site: VITE_BASE_PATH=/frisse-organisatie/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
});
