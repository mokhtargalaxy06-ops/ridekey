import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    watch: {
      usePolling: true,
      interval: 500,
      ignored: [
        "**/backend/vendor/**",
        "**/backend/storage/**",
        "**/backend/bootstrap/cache/**",
        "**/dist/**",
      ],
    },
  },
  build: {
    target: "es2018",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          swiper: ["swiper"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
