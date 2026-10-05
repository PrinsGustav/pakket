import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// Helt statisk side. Ukene skrives som JSON i src/data/uker/ fra Claude Code.
export default defineConfig({
  site: "https://pakket.no",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
