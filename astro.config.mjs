// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cleancrew.lu',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'de', 'en', 'lu', 'pt', 'es'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-LU', de: 'de-LU', en: 'en-LU', lu: 'lb-LU', pt: 'pt-LU', es: 'es-LU' },
      },
    }),
  ],
});
