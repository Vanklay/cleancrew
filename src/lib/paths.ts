import { LANG_KEYS, SERVICES } from '../i18n/config';

/** Static paths for every locale-prefixed route: /[lang]/… */
export function langStaticPaths() {
  return LANG_KEYS.map((lang) => ({ params: { lang } }));
}

/** Static paths over locale × service: /[lang]/services/[service] */
export function langServiceStaticPaths() {
  return LANG_KEYS.flatMap((lang) =>
    SERVICES.map((service) => ({ params: { lang, service } })),
  );
}
