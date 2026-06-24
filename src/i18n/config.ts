export const LANGUAGES = {
  fr: { label: 'Français', locale: 'fr-LU', flag: '🇫🇷', dir: 'ltr' },
  de: { label: 'Deutsch',  locale: 'de-LU', flag: '🇩🇪', dir: 'ltr' },
  en: { label: 'English',  locale: 'en-LU', flag: '🇬🇧', dir: 'ltr' },
  lu: { label: 'Lëtzebuergesch', locale: 'lb-LU', flag: '🇱🇺', dir: 'ltr' },
  pt: { label: 'Português', locale: 'pt-LU', flag: '🇵🇹', dir: 'ltr' },
  es: { label: 'Español',  locale: 'es-LU', flag: '🇪🇸', dir: 'ltr' },
} as const;

export type Lang = keyof typeof LANGUAGES;
export const DEFAULT_LANG: Lang = 'fr';
export const LANG_KEYS = Object.keys(LANGUAGES) as Lang[];

// The three services, in display order. Single source of truth for routing,
// nav, footer and JSON-LD — never re-list these inline.
export const SERVICES = ['clearance', 'windows', 'surfaces'] as const;
export type Service = (typeof SERVICES)[number];

// Hero/result image per service — single source for the homepage rows and the
// immersive service-page heroes.
export const SERVICE_IMAGE: Record<Service, string> = {
  clearance: '/hero.webp',
  windows: '/hero2.webp',
  surfaces: '/hero3.webp',
};

export const SITE = {
  name: 'CleanCrew',
  domain: 'https://cleancrew.lu',
  email: 'contact@cleancrew.lu',
  phone: '+352 621 526 847',
  city: 'Luxembourg',
  country: 'LU',
  geo: { lat: 49.6116, lng: 6.1319 },
};

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (LANG_KEYS.includes(seg as Lang)) return seg as Lang;
  return DEFAULT_LANG;
}

export function localizedPath(lang: Lang, path = '') {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `/${lang}${clean ? '/' + clean : ''}`;
}
