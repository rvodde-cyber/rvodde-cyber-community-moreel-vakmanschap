import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/workshop/kaartenatelier/",
  plugins: [react()],
  build: {
    outDir: path.resolve(rootDir, "../../public/workshop/kaartenatelier"),
    emptyOutDir: true,
  },
});
