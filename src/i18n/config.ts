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

export const SITE = {
  name: 'CleanCrew',
  domain: 'https://cleancrew.lu',
  email: 'hello@cleancrew.lu',
  phone: '+352 661 000 000',
  city: 'Strassen',
  country: 'LU',
  geo: { lat: 49.6217, lng: 6.0750 },
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
