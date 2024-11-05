// vite.config.js
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        confirmation: resolve(__dirname, "src/confirmation/index.html"),
      },
    },
  },
})
