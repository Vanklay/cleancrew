# ESTIMATOR.md — Instant price estimator (build spec for Claude Code)

Complete specification for CleanCrew.lu's instant price estimator. Obey `CLAUDE.md` (DRY, no hardcoded strings/prices, npm only, Tailwind v4, build clean). This feature is **already implemented** in the repo to this spec — treat this as the contract: rebuild, verify, or extend without drifting from it. If any file is missing or diverges, make it match this document.

## Purpose
A client lands on a number themselves before contacting CleanCrew, then flows into the booking form. Three services, three input models. The owner is a **solo operator** and sells **time**, not volume. Estimates are **"from" anchors** (never falsely exact); a firm quote follows a photo/visit. All prices **TTC**.

## Files (single responsibility each)
- `src/lib/pricing.ts` — SINGLE SOURCE OF TRUTH for every rate/tier/multiplier + the three `estimate*` functions + `pricingOffers()` for JSON-LD. No price exists anywhere else.
- `src/components/QuoteEstimator.astro` — the UI island. Reads labels from a JSON `<script>` block built in frontmatter from `ui.ts` (zero strings in client JS). Three tabs.
- `src/i18n/ui.ts` — every label key (fr/de/en full; lu/pt/es fall back to fr).
- `src/components/BookingForm.astro` — reads `?service=&est=` to prefill.
- `src/components/Seo.astro` — emits `pricingOffers()` JSON-LD.

## Pricing model (locked values — owner-confirmed)

### Garage clearance — time-tier (garages ONLY)
Client picks proxies → internal time band → tier price. Disposal hidden in price. **€380 hard floor.**

Inputs: `size` (single|double|large), `fullness` (light|medium|packed), `access` (ground|difficult).

Band map (size:fullness → band):
- `full` (full day): `double:packed`, `large:medium`, `large:packed`
- `threeQuarter`: `single:packed`, `double:medium`, `large:light`
- `half` (else): everything else

Tier prices (TTC, "from"): `half 380` · `threeQuarter 590` · `full 890`.
`access: difficult` → **+€90**. Result never below 380.

Resulting matrix (sanity reference):
```
single  light/medium 380 | packed 590
double  light 380 | medium 590 | packed 890
large   light 590 | medium/packed 890
(+90 each if difficult access)
```

### Window cleaning — property-type tiers (int+ext INCLUDED)
No window-count input (old bug: count collapsed to flat minimum). Price by property type; interior+exterior included by default; modifiers stack.

Inputs: `property` (select), `chassis` (bool), `access` (bool), `veranda` (bool).

`from` prices (TTC, int+ext incl. — derived from solo day-rate €380–800):
```
studio          120
apartmentSmall  160   // 1–2 bed
apartmentLarge  210   // 3+ bed
houseSmall      290
houseLarge      390
villa           520
```
Modifiers: `chassis` ×1.15 · `access` ×1.20 (stack multiplicatively) · `veranda` +€80 (added last). Round to nearest €5. Output mode `from`.
UI must show a visible "✓ intérieur + extérieur compris" line under the property select.
TVA note: residential window cleaning = **8% TVA** in LU — surface as a trust line ("TVA 8 %") on the windows service/result.

### Pressure washing — per-m² by surface
Inputs: `area` (m², number), `surface` (driveway|terrace).
Rates (TTC): driveway **€9/m²**, terrace **€7/m²**. Minimum **€150**. Output mode `from`.

## Estimator functions (exact signatures)
```ts
estimateClearance(size, fullness, access): EstimateResult
estimateWindows(property, chassis, access, veranda): EstimateResult
estimatePressure(area, surface): EstimateResult
```
`EstimateResult = { mode, low, high, currency, recurring?, firmQuoteNote }`. For all three, `low === high` (single "from" anchor). `firmQuoteNote` true for clearance + pressure + windows.

## Component behaviour (`QuoteEstimator.astro`)
- Three pill tabs (clearance default). Active = `bg-ink text-white`, inactive bordered.
- Fields re-render per tab. Clearance = 3 selects. Windows = 1 select + included-note + 3 checkboxes. Pressure = number input + 1 select.
- Live recompute on every `input` event.
- Result block: uppercase "Estimation" label, big value `à partir de €X` (localized `toLocaleString('fr')`), firm-quote note below.
- "Réserver à ce prix" button → `${bookPath}?service=${svc}&est=${low}`.
- All labels come from the `#estConfig` JSON block (built in frontmatter from `ui.ts`). No literal strings in `<script>`.

## i18n keys required (fr/de/en)
Service titles already exist. Add/keep:
`est.title est.sub est.result est.from est.book est.firmnote`
`est.clearance.size est.clearance.full est.clearance.access`
`clearance.size.{single,double,large} clearance.full.{light,medium,packed} clearance.access.{ground,difficult}`
`est.windows.property est.windows.incl est.windows.chassis est.windows.access est.windows.veranda`
`windows.prop.{studio,apartmentSmall,apartmentLarge,houseSmall,houseLarge,villa}`
`est.pressure.area est.pressure.surface pressure.surface.{driveway,terrace}`

## Mount points
- Homepage `[lang]/index.astro`: estimator section before the final CTA (already present).
- Services page: mount per-service or once with the relevant tab — owner's choice (optional).

## JSON-LD (`pricingOffers`)
minPrice floors: garage `380`, windows = lowest property tier (`120`), pressure `150`. Already wired into `Seo.astro` via `makesOffer`.

## Booking prefill
`BookingForm.astro` reads `?service=` (preselect the service `<select>`) and `?est=` (prepend "Estimation: €X" to the message). Already implemented.

## Definition of done
- `npm run build` clean.
- No window job shows the same price regardless of inputs (the old bug must not return).
- Garage never below €380.
- No hardcoded prices outside `pricing.ts`; no hardcoded display strings outside `ui.ts`. Self-grep:
  - `grep -rn "fr:.*de:.*en:" src/pages src/components` → empty
  - `grep -rn "[0-9]\{3\}" src/components/QuoteEstimator.astro` → only non-price (e.g. tailwind) — prices live in pricing.ts
- Estimator config + priced JSON-LD render in `dist/`.
- Tabs switch; every input changes the price; "Réserver" carries service + estimate into the booking form.
