import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./", // Add base path configuration
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Add alias for "@"
    },
  },
  build: {
    outDir: "dist", // Specify the output directory for the build
  },
  server: {
    proxy: {
      "/socket.io": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:3001", // Fallback to localhost for development
        ws: true,
      },
    },
  },
});
