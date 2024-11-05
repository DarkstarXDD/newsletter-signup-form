import { defineConfig } from "vite"

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        confirmation: path.resolve(__dirname, "confirmation/index.html"),
      },
    },
  },
})
