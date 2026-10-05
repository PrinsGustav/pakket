import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// Sidene er statiske som standard. Verktøyet under /meny kjøres på serveren
// (prerender = false) slik at passordsjekken i middleware.ts virker.
export default defineConfig({
  site: "https://pakket.no",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
