// ============================================================
// pricing.ts — SINGLE SOURCE OF TRUTH for all prices.
// Change a number here and it updates the estimator, the booking
// prefill, AND the JSON-LD. Never hardcode a price elsewhere.
//
// MODEL: owner is a SOLO operator and sells TIME, not volume.
// Disposal cost is absorbed into the tier prices (hidden).
// All estimates are "from" anchors; firm quote follows a photo/visit.
// All figures TTC. (LU TVA note: residential window cleaning = 8%;
// garage clearance + outdoor pressure washing = 17% standard.)
// ============================================================

export type ServiceId = 'clearance' | 'windows' | 'pressure';
export type Currency = 'EUR';
export type PriceMode = 'from' | 'exact' | 'band';

// The estimator's `pressure` tab books the project's `surfaces` service.
export const BOOKING_SERVICE: Record<ServiceId, string> = {
  clearance: 'clearance',
  windows: 'windows',
  pressure: 'surfaces',
};

export interface EstimateResult {
  mode: PriceMode;
  low: number;
  high: number;
  currency: Currency;
  recurring?: boolean;
  firmQuoteNote: boolean;
}

// ---- GARAGE CLEARANCE (time-tier, garages only) -----------
// Client answers size + fullness + access (proxies). Internally these
// map to a TIME BAND -> tier price. €380 is the owner's hard floor
// (a half-day of solo work). Disposal is hidden in the tier price.
export const clearance = {
  mode: 'from' as PriceMode,
  tiers: {
    half:         380,   // owner's minimum call-out (half-day floor)
    threeQuarter: 590,
    full:         890,   // full day, disposal-heavy
  },
  difficultAccessAdd: 90,
  size: {
    single: { label: 'clearance.size.single' },
    double: { label: 'clearance.size.double' },
    large:  { label: 'clearance.size.large' },
  },
  fullness: {
    light:  { label: 'clearance.full.light' },
    medium: { label: 'clearance.full.medium' },
    packed: { label: 'clearance.full.packed' },
  },
  access: {
    ground:    { label: 'clearance.access.ground',    difficult: false },
    difficult: { label: 'clearance.access.difficult', difficult: true },
  },
  firmQuoteNote: true,
};

// size + fullness -> time band
function clearanceBand(size: keyof typeof clearance.size, full: keyof typeof clearance.fullness): keyof typeof clearance.tiers {
  const k = `${size}:${full}`;
  const fullDay = ['double:packed', 'large:medium', 'large:packed'];
  const threeQ  = ['single:packed', 'double:medium', 'large:light'];
  if (fullDay.includes(k)) return 'full';
  if (threeQ.includes(k))  return 'threeQuarter';
  return 'half';
}

// ---- WINDOW CLEANING (property-type tiers) ----------------
// Priced by PROPERTY TYPE, interior + exterior INCLUDED by default.
// (Fixes old bug where window-count collapsed to a flat minimum.)
export const windows = {
  mode: 'from' as PriceMode,
  // Derived from solo day-rate (€380–800/day) + realistic int+ext durations.
  property: {
    studio:         { label: 'windows.prop.studio',         from: 120 }, // ~1–1.5h
    apartmentSmall: { label: 'windows.prop.apartmentSmall', from: 160 }, // 1–2 bed, ~2h
    apartmentLarge: { label: 'windows.prop.apartmentLarge', from: 210 }, // 3+ bed, ~2.5h
    houseSmall:     { label: 'windows.prop.houseSmall',     from: 290 }, // ~half-day
    houseLarge:     { label: 'windows.prop.houseLarge',     from: 390 }, // half–3/4 day
    villa:          { label: 'windows.prop.villa',          from: 520 }, // ~full day
  },
  chassisPct: 0.15,     // frames & sills surcharge
  accessPct:  0.20,     // difficult / height surcharge
  verandaAdd: 80,       // veranda / conservatory flat add-on
  firmQuoteNote: true,
};

// ---- PRESSURE WASHING (per-m² by surface) -----------------
export const pressure = {
  mode: 'from' as PriceMode,
  callout: 150,         // minimum job
  surface: {
    driveway: { label: 'pressure.surface.driveway', perM2: 9 }, // paving/cobbles
    terrace:  { label: 'pressure.surface.terrace',  perM2: 7 }, // terrace tiling
  },
  firmQuoteNote: true,
};

export const PRICING = { clearance, windows, pressure };

// ---- ESTIMATORS -------------------------------------------
function round5(n: number) { return Math.round(n / 5) * 5; }

export function estimateClearance(
  size: keyof typeof clearance.size,
  full: keyof typeof clearance.fullness,
  access: keyof typeof clearance.access,
): EstimateResult {
  const band = clearanceBand(size, full);
  let v = clearance.tiers[band];
  if (clearance.access[access].difficult) v += clearance.difficultAccessAdd;
  v = Math.max(clearance.tiers.half, round5(v));
  return { mode: 'from', low: v, high: v, currency: 'EUR', firmQuoteNote: true };
}

export function estimateWindows(
  property: keyof typeof windows.property,
  chassis: boolean,
  access: boolean,
  veranda: boolean,
): EstimateResult {
  let v = windows.property[property].from;
  if (chassis) v *= (1 + windows.chassisPct);
  if (access)  v *= (1 + windows.accessPct);
  if (veranda) v += windows.verandaAdd;
  v = round5(v);
  return { mode: 'from', low: v, high: v, currency: 'EUR', firmQuoteNote: true };
}

export function estimatePressure(area: number, surfaceKey: keyof typeof pressure.surface): EstimateResult {
  const v = Math.max(pressure.callout, round5(area * pressure.surface[surfaceKey].perM2));
  return { mode: 'from', low: v, high: v, currency: 'EUR', firmQuoteNote: true };
}

// ---- JSON-LD OFFERS ---------------------------------------
// Priced offers for LocalBusiness.makesOffer. minPrice floors only
// (estimates are "from" anchors); url omitted (routes are lang-prefixed).
export function pricingOffers() {
  const winFloor = Math.min(...Object.values(windows.property).map((p) => p.from));
  const offer = (name: string, serviceType: string, minPrice: number) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name, serviceType },
    priceSpecification: { '@type': 'PriceSpecification', minPrice, priceCurrency: 'EUR' },
  });
  return [
    offer('Garage clearance', 'Garage clearance and removal', clearance.tiers.half),
    offer('Window cleaning', 'Residential and commercial window cleaning', winFloor),
    offer('Driveway & surface cleaning', 'Pressure washing of driveways, terraces and paved areas', pressure.callout),
  ];
}
