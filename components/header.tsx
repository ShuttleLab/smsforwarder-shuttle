"use client";

import { useTranslations, useLocale } from "next-intl";
import { PalettePicker } from "@/components/palette-picker";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, localeConfig, defaultLocale } from "@/lib/i18n/config";

const GITHUB_URL = "https://github.com/ShuttleLab/SMSForwarder";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  // Static export has no middleware, and next-intl's router.replace soft-navigation
  // 404s the default locale / can crash with browser translation extensions. So we
  // switch with a full-page navigation, computing the target path manually.
  // usePathname() already strips the locale prefix.
  const switchTo = (next: string) => {
    if (next === locale) return;
    const clean = pathname.endsWith("/") ? pathname : `${pathname}/`;
    // English is at the web root in PRODUCTION (postbuild promotes out/en → out/),
    // but at /en/ under `next dev` (no postbuild). Branch so it works in both.
    const isDev = process.env.NODE_ENV === "development";
    if (next === defaultLocale) {
      window.location.href = isDev ? `/en${clean}` : clean;
    } else {
      window.location.href = `/${next}${clean}`;
    }
  };

  return (
    <header className="bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-lg sm:text-xl font-bold text-foreground">
              {t("common.appName")}
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center justify-center size-8 rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground" aria-label="GitHub">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <PalettePicker direction="down" />
            <label className="sr-only" htmlFor="lang-select">Language</label>
            <select
              id="lang-select"
              value={locale}
              onChange={(e) => switchTo(e.target.value)}
              aria-label="Select language"
              className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground transition-colors hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {locales.map((l) => (
                <option key={l} value={l}>
                  {localeConfig[l]?.nativeName ?? l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
