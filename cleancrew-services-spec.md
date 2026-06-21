# CleanCrew.lu — Services & Business Logic Specification

> **Purpose of this document:** Give Claude Code a complete, authoritative understanding of what CleanCrew.lu does, how it prices, how its services relate to each other, and what must be instrumented in the codebase. This is a *business spec*, not a UI spec — it defines the logic the site, booking flow, and data model must support. Build decisions should flow from the strategy described here, not just from surface feature requests.

---

## 1. What CleanCrew Is

CleanCrew is a **premium residential exterior & garage services company in Luxembourg**, operating under LUXEE Tech OÜ. It is deliberately structured to look and behave less like a traditional cleaning company and more like a productised services operation with a strong digital funnel.

The strategic thesis the codebase must support:

- **Lead with high-ticket garage clearance** as a customer-acquisition magnet.
- **Convert every one-off customer into recurring revenue** (window/exterior maintenance contracts).
- **Bundle services per visit** to maximise revenue per address with zero added travel cost.
- **Instrument everything** (routes, jobs, workers, overflow/declined demand) so operational data accumulates from day one — this data is itself a strategic asset.

The site is **multilingual (FR / EN / DE / PT)**. Portuguese is a genuine competitive advantage given the ~93K Portuguese-speaking population in Luxembourg and must be a first-class locale, not an afterthought.

---

## 2. Service Catalogue

There are **three core service lines**, plus a **recurring layer** and **premium "finishing" upsells** that sit on top. The data model should treat these as structured, queryable entities — not free text — because pricing, bundling, and analytics all depend on them.

### 2.1 Garage Clearance (the acquisition magnet)

High-ticket, one-and-done per customer, physically intensive. Priced per job by size tier.

| Tier | Description | Base Price | Typical Duration |
|------|-------------|-----------|------------------|
| Small | Single garage, light load | €490 | up to 4h |
| Medium | Standard garage, full load | €890 | full day (~8h) |
| Large | Double / heavy load | €1,490 | ~1.5 days |

**Disposal note for logic:** clearance generates bulky/hazardous waste with real disposal cost (€50–150/job, surcharges for tyres/hazardous). Disposal cost must be a **tracked field per job**, not absorbed silently, because it materially affects net margin and pricing decisions.

### 2.2 Window Cleaning (the recurring engine + speed advantage)

Light, fast, repeatable, **recurring**. This is the margin and stability backbone. The founder is exceptionally fast at this work — it is a genuine moat. Priced per property type.

| Property Type | Base Price |
|---------------|-----------|
| Apartment | €250 |
| House | €400 |
| Veranda | €500 |
| Glass roof | from €500 (quote) |
| Additional glazed structures | quote |

Window cleaning is the service most able to be sold as a **recurring contract** (quarterly / biannual). The booking flow must support offering and capturing a recurring plan, not just a single job.

### 2.3 Alley / Driveway / Surface Cleaning (the fill-in margin)

Pressure washing of driveways, alleys, courtyards, car-share/shared paved areas. Mostly equipment-and-time, low disposal, weather-dependent. Pairs naturally onto a garage or window job at the same address.

| Surface | Base Price |
|---------|-----------|
| Residential alley / driveway | €400–600 |
| Shared / car-share paved area | €400–600 |
| Terrace / courtyard | quote by m² |

Price by job, not strictly per m², but capture approximate surface area as a field for future per-m² calibration.

### 2.4 Premium "Finishing" Upsells (the up-market layer)

These are NOT in the launch MVP necessarily, but the **data model and pricing engine must be able to represent them** so they can be switched on later without restructuring. They convert a "clean" into a "transformation" and carry materially higher margins.

- Garage clearance **+ deep clean & finish** (showroom result)
- Garage clearance **+ epoxy / sealed floor**
- Driveway **sealing** after pressure wash
- Facade treatment

Represent these as **add-on modules attachable to a base service**, with their own price and margin profile.

---

## 3. Pricing Logic the Code Must Support

### 3.1 Tiered pricing with an anchored middle option

For garage clearance specifically, present pricing as a **three-option tier** where the middle option is the intended default (most customers anchor to the middle). Example structure to support:

- Medium clearance (haul + sweep): €890
- Medium **+ deep clean & finish**: ~€1,290
- Medium **+ finish + sealed floor**: ~€1,690

The booking/quote engine should be able to render any base service as a 3-tier choice (good / better / best) where tiers are base + stacked add-ons. This is a core conversion mechanic, not cosmetic.

### 3.2 Price discovery, not fixed certainty

Prices above are **starting anchors**, intended to be adjusted based on observed quote conversion rate. The system should make it easy to change base prices and add-on prices centrally (config/CMS-driven, not hardcoded across templates) so pricing can be tuned without code changes. Target: if quote acceptance is consistently >~60%, prices are too low and should rise.

### 3.3 No public pricing display by default (brand decision)

Consistent with the founder's design philosophy across properties: **no pricing on public marketing pages.** Pricing surfaces only inside a quote/booking flow. Build accordingly — pricing lives in the quote engine, not on the homepage.

---

## 4. The Bundle Mechanic (highest-margin feature in the product)

The single most valuable sentence in this business is *"while I'm here, I can also do the alley and the windows."* Zero new travel, zero new acquisition cost, one customer paying for multiple services in one visit.

**Requirements:**

- When a customer books or is quoted **any** service, the flow must **proactively offer the other applicable services at the same address** as an add-on bundle.
- A garage clearance booking should surface: "Add driveway cleaning?" and "Add window cleaning?" and "Start a recurring window plan?"
- Bundled multi-service jobs should be a **first-class entity** in the data model (one visit → multiple service line items), so revenue-per-visit and bundle-attach-rate are measurable.
- Track **bundle attach rate** as a headline metric. It is a primary lever of profitability.

---

## 5. Recurring Revenue (what turns a job into a business)

Recurring contracts are the difference between rebuilding the funnel every month and waking up with booked revenue. They are also what makes the business eventually sellable.

**Requirements:**

- Support a **recurring contract entity**: service(s), frequency (e.g. quarterly, biannual), price per cycle, next-scheduled date, customer.
- The end of every one-off job — **especially every garage clearance** — should prompt a recurring window/exterior plan offer.
- Recurring contracts must be distinguishable from one-off jobs in all reporting, so recurring vs. one-off revenue mix is always visible. (Recurring mix is a top indicator of business health and margin.)

---

## 6. Instrumentation & Data Model (the strategic asset)

This is the part most cleaning-company sites ignore and the part that matters most here. **Build the data layer as if the operational data is a product**, because the longer-term vision is dispatch/routing software with the physical crew as its proving ground. Every job, route, and worker should generate structured data from day one.

### 6.1 Core entities (minimum)

- **Customer** — contact, address (geocoded lat/lng), language, source/channel.
- **Job** — service line item(s), tier/add-ons, scheduled date, status, assigned worker(s), address, base price, **disposal cost**, actual duration, final price.
- **Visit** — one trip to one address, may contain multiple Jobs (the bundle). Captures travel start/end if possible.
- **Recurring Contract** — as in §5.
- **Quote** — issued price, services, status (sent / accepted / declined / expired). **Declined and expired quotes must be retained** (see §6.3).
- **Worker** — identity, jobs completed, linked to reviews and the karma system (see §6.4).
- **Route** — the ordered set of visits for a worker on a day, with timing. Even if route optimisation isn't built at launch, **capture the raw data** (visit sequence, addresses, times) so it can train routing later.

### 6.2 Geocoding from day one

Every address must be geocoded and stored as lat/lng. Routing, clustering, and "jobs near an existing visit" logic all depend on this. Do not store addresses as free text only.

### 6.3 Capture declined / overflow demand (critical, easily forgotten)

The single most important number for the founder's hiring decisions is **the value of work turned away or delayed.** The hiring trigger is not "I earned €X" — it is "I am turning away €X of work per month."

**Requirements:**

- Every quote that is **declined, expired, or that the customer wanted sooner than available** must be retained with its value and reason.
- Capture **requested-vs-offered date gaps** (customer wanted this week, earliest slot was 3 weeks out) — this is the overflow signal that justifies hiring.
- Expose a running figure: **value of overflow/declined demand per month.** This metric directly drives the day-rate-helper → full-time-hire decision sequence.

### 6.4 Worker karma / motivation system (future-facing, design the hooks now)

There is a planned worker-motivation system: a karma/points score tied to **verified reviews and client retention**. Even if not built at launch, the schema should leave room for it:

- Workers linked to the jobs they performed.
- Jobs linkable to **verified customer reviews**.
- Reviews/retention feeding a per-worker karma score.

Design the relationships now so this can be activated without migration pain.

---

## 7. Tech Stack & Conventions

Match the founder's established stack and conventions exactly:

- **Astro** for the content/marketing site (performance-first, this is a content + funnel site).
- **Tailwind v4** for styling.
- **Supabase** for data/auth/storage (prefer EU/Frankfurt region for GDPR).
- **Netlify** for hosting/deploy.
- **npm exclusively** — never yarn/pnpm.
- **Resend** for transactional/notification email if email is needed.
- Multilingual: **FR / EN / DE / PT**, all first-class. Portuguese is a priority locale, not a fallback.

### Design philosophy

- Jony Ive-influenced minimalism: massive typography, generous whitespace, restraint.
- Premium, calm, confident. The brand should feel closer to a design studio than a cleaning company — that *is* the competitive positioning.
- **No pricing on public pages.**
- Hero imagery: clean, transformed result (e.g. an immaculate open garage interior) — sell the transformation, not the labour.

---

## 8. Build Priority (suggested order)

1. **Multilingual marketing site** (Astro, 4 locales) — the three core services, premium positioning, no public pricing, strong hero.
2. **Quote / booking flow** — per-service, with the **3-tier mechanic** for clearance and the **bundle offer** for every booking.
3. **Data layer** — customers, jobs, visits, quotes (incl. declined/overflow capture), geocoded addresses, recurring contracts. Build this properly even if admin UI is minimal at first; the data is the asset.
4. **Recurring contract offer** at end of booking flow + basic contract entity.
5. **Overflow / declined-demand reporting** — even a simple monthly figure. This is the founder's hiring compass.
6. *(Later)* Worker entity + review linkage + karma hooks.
7. *(Later)* Route data capture → route optimisation → the dispatch-software direction.

---

## 9. What NOT to Do

- Do **not** build this as a generic brochure cleaning-company site. The funnel, bundle mechanic, recurring layer, and instrumentation are the whole point and the whole competitive edge.
- Do **not** hardcode prices across templates — keep them centrally configurable.
- Do **not** store addresses as free text only — always geocode.
- Do **not** discard declined/expired quotes — that data is the hiring signal.
- Do **not** treat Portuguese as a second-tier locale.
- Do **not** put pricing on public marketing pages.

---

*End of specification. When in doubt, optimise for: revenue-per-visit (bundling), recurring-revenue mix, captured overflow demand, and accumulating clean operational data. Those four are what make this business profitable and, eventually, sellable.*
