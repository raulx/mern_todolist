import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: "7163",
    proxy: {
      "/api": {
        // target: "http://localhost:7000",
        // target: "https://todolist-api-9i8n.onrender.com",
        // changeOrigin: true,
      },
    },
  },
});
