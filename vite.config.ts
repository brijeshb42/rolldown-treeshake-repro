import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("vite/modulepreload-polyfill")) {
            return "polyfill";
          }
        },
      },
    },
    minify: false,
  },
});
