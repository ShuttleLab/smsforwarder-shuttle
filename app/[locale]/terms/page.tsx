import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";

const PATH = "/terms";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });
  return {
    title: `${t("title")} — SMS Forwarder`,
    description: t("s1Body").slice(0, 155),
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termsPage");
  const sections = ["s1", "s2", "s3", "s4", "s5", "s6"];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("updated")}</p>
      <section className="mt-8 space-y-6">
        {sections.map((s) => (
          <div key={s}>
            <h2 className="mb-2 text-xl font-semibold">{t(`${s}Title`)}</h2>
            <p className="leading-relaxed text-muted-foreground">{t(`${s}Body`)}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
