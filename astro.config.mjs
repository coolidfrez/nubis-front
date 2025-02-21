// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://nubis.bis-sorbonne.fr',
  base: '/',
  experimental: {
    svg: true,
  },
  integrations: [mdx()],
  // output: 'server',
});