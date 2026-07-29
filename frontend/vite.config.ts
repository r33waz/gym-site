import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    open: true,
  },

  esbuild: {
    // Remove console and debugger only in production
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
