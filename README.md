# CleanCrew.lu

Astro 6 + Tailwind v4 multilingual site for garage clearance, window cleaning and common-area cleaning in Luxembourg. (Rebrand of GarageCrew.lu.)

## Stack
Astro 6 · Tailwind v4 · Supabase (booking) · 6 locales (FR/DE/EN/LU/PT/ES) · sitemap + hreflang · npm

## Setup
```bash
npm install
cp .env.example .env   # add Supabase URL + anon key
npm run dev
```

## Supabase
Run `supabase-schema.sql` in the SQL editor. It creates `slots`, `bookings`, the `available_slots` view, and RLS (public reads open slots, public inserts bookings, nothing else). Open availability by inserting rows into `slots`. The booking calendar reads `available_slots`; without env vars the form still submits a graceful success message.

## i18n
- Routing in `astro.config.mjs` (prefixDefaultLocale).
- Strings in `src/i18n/ui.ts` — FR/DE/EN are full, LU/PT/ES carry translated nav+hero and fall back to FR for the rest. Fill those three to complete the locales.
- `src/components/Seo.astro` emits hreflang ×6 + x-default, OG, and LocalBusiness/FAQ JSON-LD.

## SEO / GEO / AEO
- LocalBusiness (`CleaningBusiness`) schema with geo, areaServed=Luxembourg, knowsLanguage, makesOffer×3.
- FAQPage schema on the homepage = the AEO/LLM answer block (edit the `faq` array in `[lang]/index.astro`).
- i18n sitemap, robots.txt, canonicals per locale.

## Pages
home · services · about · blog (content collection) · contact · book (Supabase calendar)

## Next
- Write LU/PT/ES full copy (PT is the biggest untapped audience).
- Add an admin view for bookings (service-role key, server-side).
- Per-service landing pages + city pages for local SEO depth.
