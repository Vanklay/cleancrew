// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://cleancrew.lu',
  // Static by default; only routes with `prerender = false` (e.g. /admin)
  // render on-demand via the Netlify adapter.
  adapter: netlify(),
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'de', 'en', 'lu', 'pt', 'es'],
    // `/` is redirected to /fr by src/pages/index.astro (single owner of the
    // root redirect); the built-in auto-redirect is off to avoid a route clash.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
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
