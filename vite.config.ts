import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        // Keep Framer Motion (used only by the command palette + mobile menu)
        // in its own chunk so it isn't part of the critical path.
        manualChunks: {
          motion: ["framer-motion"],
        },
      },
    },
  },
});
