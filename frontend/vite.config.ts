import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:3001", // Fallback to localhost for development
        ws: true,
      },
    },
  },
});