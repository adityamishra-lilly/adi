// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: replace with the real domain once decided.
  site: 'https://example.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
