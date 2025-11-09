// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://apolanco.com",
  integrations: [
    sitemap(),
    icon({
      // Especificar los icon sets que quieres usar
      iconDir: "src/icons",
      include: {
        // Incluir Material Design Icons (viene por defecto)
        mdi: ["*"],
        // Incluir Simple Icons explícitamente
        "simple-icons": ["*"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
