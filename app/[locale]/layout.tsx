import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { localeConfig, getDirection, getOgLocale } from "@/lib/i18n/config";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";
import { LayoutShell } from "@/components/layout-shell";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl(locale, ""),
      languages: hreflangAlternates(""),
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      siteName: "SMS Forwarder",
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => localeConfig[l]?.ogLocale)
        .filter(Boolean) as string[],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("subtitle") },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* lang/dir on a layout-transparent wrapper — drives RTL for Arabic (a later
          batch); the authoritative <html lang/dir> is set by scripts/postbuild.mjs. */}
      <div lang={locale} dir={getDirection(locale)} className="contents">
        <LayoutShell>{children}</LayoutShell>
      </div>
    </NextIntlClientProvider>
  );
}
