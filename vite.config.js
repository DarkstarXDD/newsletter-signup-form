// vite.config.js
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve("./", "index.html"),
        nested: resolve("./", "confirmation.html"),
      },
    },
  },
})
