import { fileURLToPath, URL } from "url"
import { resolve } from "path"
import { defineConfig } from "vite"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "confirmation.html"),
      },
    },
  },
})
