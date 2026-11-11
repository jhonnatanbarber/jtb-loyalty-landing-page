// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jhonnatanthebarber.pe', // TODO: cambiar por el dominio final
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
