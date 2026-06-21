# BUILD_PLAN.md — CleanCrew.lu

Ordered tasks for Claude Code. Do them **in sequence** — early tasks pay down debt the later ones depend on. After each task: `npm run build`, confirm clean, commit with the given message. Obey CLAUDE.md throughout.

---

## Phase 0 — Refactor the scaffold (do first, do not skip)

### T0.1 — Centralize design tokens into component classes
The scaffold repeats button, section, and card patterns inline. In `src/styles/global.css`, add a `/* components */` layer with: `.section`, `.container-x` (already exists — keep), `.btn`, `.btn-ghost`, `.card`, `.headline` (exists — keep), `.prose-cc`.
- `.btn` = solid: `rounded-full bg-ink text-white px-8 py-3.5 transition-colors hover:bg-accent`.
- `.btn-ghost` = `rounded-full border border-line px-8 py-3.5 text-ink-soft transition hover:border-ink hover:text-ink`.
- `.section` = `py-20 md:py-28 border-t border-line`.
- `.prose-cc` = the blog body styles currently inlined as `[&_h2]:…` in `blog/[slug].astro`.
Then replace every inline occurrence across all pages/components with these classes. Grep `[&_` and raw `bg-ink text-white px-8` to find them.
Commit: `refactor: extract btn/section/card/prose component classes`

### T0.2 — Move booking-calendar strings into ui.ts
`src/components/BookingForm.astro` has an inline `S = {fr:…,de:…,en:…}` object with months/days/messages. Delete it. Add keys to `src/i18n/ui.ts`: `book.calendar.months` (array of 12), `book.calendar.days` (array of 7), `book.calendar.available`, `book.calendar.none`, plus `book.success`/`book.error` (already exist). Type `ui.ts` to allow `string | string[]` values. The component frontmatter builds a small labels object from `t(...)` and passes it to the client script via a `<script type="application/json" id="bookingLabels">` block; the client reads/parses that. No locale strings in the `<script>`.
Commit: `refactor: booking calendar reads i18n from ui.ts, not inline`

### T0.3 — Shared getStaticPaths helper
7 page files repeat `getStaticPaths(){ return LANG_KEYS.map(lang=>({params:{lang}})) }`. Create `src/lib/paths.ts` exporting `langStaticPaths()`. Replace all 7 inline copies with an import. (Blog `[slug].astro` keeps its own — it enumerates posts, not just langs.)
Commit: `refactor: shared langStaticPaths helper`

---

## Phase 1 — Complete the locales

### T1.1 — Fill DE + EN gaps, then LU/PT/ES full copy
Audit `ui.ts`: every key present in `fr` must exist in `de` and `en` (some service/why strings may be missing). Then write **full, native-quality** `lu`, `pt`, `es` dictionaries — not fallback stubs. PT is the priority audience (~93K speakers in LU). Keep the same keys. No machine-translation tone; match the warm-professional register of the FR copy.
Commit: `feat: complete all six locale dictionaries`

### T1.2 — Per-locale blog seed posts
Currently 3 posts (fr/en/de). Add at least one PT post (garage clearance, the lead topic). Keep frontmatter schema. Filename prefix = lang (`pt-…`).
Commit: `content: add PT blog post`

---

## Phase 2 — Features

### T2.1 — Per-service landing pages (local SEO depth)
Add `src/pages/[lang]/services/[service].astro` for `clearance|windows|entrances`, each with its own `Service` JSON-LD, FAQ block, and CTA. Link from the services index and footer. Use `getStaticPaths` over lang × service. All copy via `ui.ts`.
Commit: `feat: per-service landing pages`

### T2.2 — Booking admin read (server-side)
Add a minimal `/admin` route (Astro server endpoint or page) that lists `bookings` using the **service-role** key from a server-only env var (`SUPABASE_SERVICE_KEY`, never `PUBLIC_`). Gate behind a simple shared-secret header or basic auth. Do not expose the service key client-side.
Commit: `feat: server-side bookings admin`

### T2.3 — GarageCrew → CleanCrew 301 map
Add `public/_redirects` (Netlify) mapping old GarageCrew paths to new locale paths to preserve SEO. Confirm with the owner which old URLs existed before finalizing.
Commit: `seo: 301 redirects from GarageCrew`

---

## Phase 3 — Polish
- T3.1 OG image per locale (static `/og/{lang}.png` referenced in `Seo.astro`).
- T3.2 Lighthouse pass: target 100/100/100/100. Fix any CLS from the calendar island.
- T3.3 `BreadcrumbList` JSON-LD in `Seo.astro` for non-home pages.

---

## Guardrails recap (from CLAUDE.md)
- npm only · no `tailwind.config.js` · no new deps without justification.
- Zero hardcoded strings/colors in pages or scripts.
- Build clean after every task.
