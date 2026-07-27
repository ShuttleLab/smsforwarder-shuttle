import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";

const PATH = "/privacy";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return {
    title: `${t("title")} — SMS Forwarder`,
    description: t("intro").slice(0, 155),
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacyPage");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("updated")}</p>
      <p className="mt-6 leading-relaxed text-muted-foreground">{t("intro")}</p>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="mb-2 text-xl font-semibold">{t("s1Title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("s1Body")}</p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold">{t("s2Title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("s2Intro")}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li className="leading-relaxed">{t("s2a")}</li>
            <li className="leading-relaxed">{t("s2b")}</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold">{t("s3Title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("s3Body")}</p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold">{t("s4Title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("s4Body")}</p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold">{t("s5Title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("s5Body")}</p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold">{t("s6Title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("s6Body")}</p>
        </div>
      </section>
    </div>
  );
}
