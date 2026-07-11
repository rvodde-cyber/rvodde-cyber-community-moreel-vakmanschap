import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standalone Vercel project: base "/"
// Embedded in community-site: VITE_BASE_PATH=/wisselwerking/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
});
