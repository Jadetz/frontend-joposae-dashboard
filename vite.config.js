import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Forward API calls to Express so the browser stays same-origin in development.
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
