import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standalone Vercel project: base "/"
// Embedded in community hub: VITE_BASE_PATH=/setup/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  test: {
    environment: "node",
    include: ["tests/**/*.test.js"],
  },
  server: {
    proxy: {
      "/api/setup": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
      },
    },
  },
});
