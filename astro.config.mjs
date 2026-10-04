import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: set SITE_URL to the real domain at build time (open decision #1 in the brief).
const site = process.env.SITE_URL || 'https://sequrebyte.example';

export default defineConfig({
  site,
  integrations: [sitemap()],
  build: {
    // Keep CSS/JS in external files so the CSP needs no 'unsafe-inline' for scripts or styles.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
