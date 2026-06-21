# CLAUDE.md — CleanCrew.lu build rules

You are extending an existing Astro 6 + Tailwind v4 scaffold. **Read this entire file before writing any code.** These rules are non-negotiable and exist to keep the codebase single-authored, DRY, and trivial to restyle. When a task in BUILD_PLAN.md conflicts with a rule here, this file wins.

## Project
CleanCrew.lu — multilingual (FR/DE/EN/LU/PT/ES) site for **garage clearance + window cleaning + common-area cleaning** in Luxembourg. Rebrand of GarageCrew.lu. Hierarchy: clearance-led hero, three equal services.

## Stack — do not deviate
- Astro 6, Tailwind v4 (CSS-first `@theme`, **no `tailwind.config.js`**), TypeScript, **npm only** (never yarn/pnpm).
- Supabase for bookings. Content Collections for blog.
- No new dependencies without a one-line justification in your PR notes. No UI/component libraries. No CSS-in-JS.

## Golden rules (DRY / no spaghetti)
1. **One source of truth per concern.**
   - All user-facing copy → `src/i18n/ui.ts`. **Never** hardcode a display string in a `.astro` file or in client `<script>`. This includes the booking calendar's month/day names and status messages — they live in `ui.ts`, keyed, not inline.
   - All colors/spacing/fonts/shadows → `@theme` in `src/styles/global.css`. **Never** use a raw hex, `rgb()`, or arbitrary `px` color in markup. Use the semantic token (`text-ink`, `bg-paper`, `border-line`, `text-accent`).
   - All site constants (email, phone, geo, domain) → `SITE` in `src/i18n/config.ts`.
2. **No copy-paste across pages.** Shared logic goes in `src/lib/`. The `getStaticPaths` that enumerates locales is imported from `src/lib/paths.ts` — never re-declare the locale map inline in a page.
3. **No utility soup for repeated patterns.** If a class string is reused or has 3+ child-combinator (`[&_…]`) utilities, promote it to a named component class in `global.css` under the `/* components */` section (e.g. `.prose-cc`, `.btn`, `.btn-ghost`, `.card`). Markup should read semantically.
4. **Components own their markup; pages compose them.** A page file should be mostly `<Section>`, `<ServiceCard>`, etc. — not a wall of divs. Extract a component the second a block appears twice.
5. **Type everything.** Props interfaces on every component. `Lang` type, never bare `string`, for locale.

## Conventions
- **Files:** components `PascalCase.astro`, libs/utilities `kebab-case.ts`, routes lowercase. Co-locate nothing that's shared — shared → `lib/` or `components/`.
- **Translation keys:** dot-namespaced `area.element` (`hero.title`, `book.calendar.months`). Group by page/area. Every key must exist in `fr`, `de`, `en`; `lu`/`pt`/`es` may omit and fall back to `fr` via `useTranslations`. Arrays (months/days) are allowed as values — type `ui.ts` accordingly.
- **Buttons:** exactly two variants — `.btn` (solid ink→accent) and `.btn-ghost` (bordered). No one-off button styling.
- **Sections:** standard vertical rhythm via a `.section` class (the `py-20 md:py-28 border-t border-line` pattern). Don't re-type padding per page.
- **Client scripts:** keep minimal, typed, no inline strings (rule 1). The booking script reads its labels from a JSON `<script type="application/json">` block the `.astro` frontmatter emits from `ui.ts`, or from `data-*` attributes — never a hardcoded `S = {fr:…}` object.
- **SEO:** every page renders `<Layout>` with `lang`, `title`, `description`, `path` (path WITHOUT lang prefix). Never write a `<link rel=alternate>` or JSON-LD by hand in a page — `Seo.astro` owns all of it. Add new structured data only inside `Seo.astro`.

## Definition of done (every task)
- `npm run build` passes clean (0 warnings you introduced).
- No hardcoded display strings, colors, or duplicated locale lists (grep yourself: `grep -rn "fr:.*de:.*en:" src/` returns nothing in components/pages).
- New repeated markup is a component or a named class.
- hreflang, canonical, and JSON-LD still render in `dist/` (spot-check one page).

## What NOT to do
- Don't add a CSS framework, reset, or `tailwind.config.js`.
- Don't introduce a state library, React, or Svelte — this is Astro + vanilla TS islands.
- Don't inline translations or hexes "just for now."
- Don't restructure routing or the i18n config without a task that says to.
