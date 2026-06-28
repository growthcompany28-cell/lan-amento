import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/lancamento/",
  build: {
    outDir: "../lancamento",
    emptyOutDir: true,
  },
});
