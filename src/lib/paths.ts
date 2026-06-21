import { LANG_KEYS } from '../i18n/config';

/** Static paths for every locale-prefixed route: /[lang]/… */
export function langStaticPaths() {
  return LANG_KEYS.map((lang) => ({ params: { lang } }));
}
