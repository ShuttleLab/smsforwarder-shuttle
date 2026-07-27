// Locale configuration for the SMS Forwarder marketing site.
//
// `locales` is the LIVE, advertised set — a locale appears here only once its
// messages/<locale>.json and localized SEO copy are actually translated (adding
// an untranslated locale would ship duplicate English pages → Google dup-content
// penalty). `localeConfig` carries per-locale metadata (direction + OpenGraph
// locale) for every locale we support or plan to, whether live or not.

// Live, advertised locales. ar/hi stay out until translated (metadata below is
// ready for a later batch).
export const locales = ["en", "zh", "id", "vi", "pt", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export interface LocaleMeta {
  name: string; // English name
  nativeName: string;
  direction: "ltr" | "rtl";
  ogLocale: string;
}

export const localeConfig: Record<string, LocaleMeta> = {
  en: { name: "English", nativeName: "English", direction: "ltr", ogLocale: "en_US" },
  zh: { name: "Chinese (Simplified)", nativeName: "简体中文", direction: "ltr", ogLocale: "zh_CN" },
  id: { name: "Indonesian", nativeName: "Bahasa Indonesia", direction: "ltr", ogLocale: "id_ID" },
  vi: { name: "Vietnamese", nativeName: "Tiếng Việt", direction: "ltr", ogLocale: "vi_VN" },
  pt: { name: "Portuguese", nativeName: "Português", direction: "ltr", ogLocale: "pt_BR" },
  es: { name: "Spanish", nativeName: "Español", direction: "ltr", ogLocale: "es_ES" },
  // Held back from `locales` until translated (metadata ready for a later batch):
  ar: { name: "Arabic", nativeName: "العربية", direction: "rtl", ogLocale: "ar_AR" },
  hi: { name: "Hindi", nativeName: "हिन्दी", direction: "ltr", ogLocale: "hi_IN" },
};

export function getDirection(locale: string): "ltr" | "rtl" {
  return localeConfig[locale]?.direction ?? "ltr";
}
export function isRTL(locale: string): boolean {
  return getDirection(locale) === "rtl";
}
export function getOgLocale(locale: string): string {
  return localeConfig[locale]?.ogLocale ?? "en_US";
}
