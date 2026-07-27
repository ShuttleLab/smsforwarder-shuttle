import { locales, defaultLocale } from "@/lib/i18n/config";

export const SITE_URL = "https://smsforwarder.shuttlelab.org";

/** Ensure a path carries a trailing slash (required by next.config trailingSlash:true;
 *  emitting slash-less canonical/hreflang would 301-chain — see playbook 05 §7/§10). */
function withSlash(p: string): string {
  if (!p || p === "/") return "/";
  return p.endsWith("/") ? p : `${p}/`;
}

/** Path for a locale: English at the root, others under /<locale>. Always slashed. */
export function localizedPath(locale: string, path: string): string {
  const base = locale === defaultLocale ? path : `/${locale}${path}`;
  return withSlash(base);
}

/** Absolute canonical URL for (locale, path). */
export function canonicalUrl(locale: string, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

/** hreflang map across every LIVE locale, plus x-default → English root. */
export function hreflangAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}${localizedPath(locale, path)}`;
  }
  languages["x-default"] = `${SITE_URL}${withSlash(path)}`;
  return languages;
}
