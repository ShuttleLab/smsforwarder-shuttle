import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { mergeWithFallback } from "@/lib/i18n/fallback";

const messagesCache = new Map<string, Record<string, unknown>>();

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const cached = messagesCache.get(locale);
  if (cached) return { locale, messages: cached };

  const english = (await import(`../messages/en.json`)).default as Record<string, unknown>;
  const messages =
    locale === routing.defaultLocale
      ? english
      : mergeWithFallback(
          (await import(`../messages/${locale}.json`)).default as Record<string, unknown>,
          english,
        );
  messagesCache.set(locale, messages);
  return { locale, messages };
});
