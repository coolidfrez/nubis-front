// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://nubis.bis-sorbonne.fr',
  base: '/',

  experimental: {
    svg: true,
  },

  // output: 'server',
  integrations: [mdx()],
  adapter: netlify(),
});