import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@/lib/i18n/config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // Serve "/" deterministically as English rather than auto-redirecting by
  // Accept-Language — removes the "/" → "/<locale>" 307 (an LCP penalty), keeps
  // the root canonical stable for crawlers, matches the overseas focus. Users
  // switch language via the in-app switcher.
  localeDetection: false,
});
