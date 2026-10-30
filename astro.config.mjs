// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://am-labs.dev",
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
  markdown: {
    // Highlighted at build time; colours switch with data-theme in global.css.
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
