import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // all request to /api/v1/... will be proxied here
    proxy: {
      "api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true, //needed for virutal hosted sites
        secure: false, //if my backend is not HTTPS
      },
    },
  },
});
