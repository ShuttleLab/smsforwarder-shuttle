import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";
import {
  Wifi, Globe, Bell, ListChecks, BellRing, Languages,
  Download, ShieldCheck, Smartphone,
} from "lucide-react";
import { SeoFaq, FAQS } from "@/components/seo-faq";

const GithubMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

const DOWNLOAD_URL = "https://github.com/ShuttleLab/SMSForwarder/releases/latest/download/SMSForwarder.apk";
const SOURCE_URL = "https://github.com/ShuttleLab/SMSForwarder";
// Reserved for when a Google Play listing exists — flip to true + set the URL.
const PLAY_AVAILABLE = false;
const PLAY_URL = "";

// Home-page meta keywords per locale (localized real search terms; unlisted locales fall back to en).
const HOME_KEYWORDS: Record<string, string[]> = {
  en: ["SMS Forwarder", "forward SMS to Telegram", "SMS to Telegram bot", "receive SMS remotely", "forward text messages Android", "verification code forwarding", "2FA code to Telegram", "SMS forwarding app Android", "Samsung SMS forwarding", "Xiaomi SMS forwarding", "MIUI SMS forwarding", "OPPO SMS forwarding", "vivo SMS forwarding", "OnePlus SMS forwarding", "Realme SMS forwarding", "Honor SMS forwarding", "Huawei SMS forwarding", "HarmonyOS SMS forwarding", "Tecno SMS forwarding", "Infinix SMS forwarding", "Motorola SMS forwarding", "Nothing Phone SMS forwarding", "read SMS abroad", "free"],
  zh: ["短信转发", "短信转发到 Telegram", "短信转发到 TG", "远程收短信", "验证码转发", "验证码转发到 Telegram", "2FA 转发", "安卓短信转发 app", "三星短信转发", "小米短信转发", "MIUI 短信转发", "OPPO 短信转发", "vivo 短信转发", "一加短信转发", "realme 短信转发", "荣耀短信转发", "华为短信转发", "HarmonyOS 短信转发", "出国收短信", "免费"],
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: HOME_KEYWORDS[locale] ?? HOME_KEYWORDS.en,
    alternates: {
      canonical: canonicalUrl(locale, ""),
      languages: hreflangAlternates(""),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Phone frame holding a real screenshot. `className` overrides the wrapper width.
 *  Aspect 5/11 matches the 1080×2376 screenshots, so bg-cover fills without cropping. */
function PhoneFrame({ src, label, className }: { src?: string; label: string; className?: string }) {
  return (
    <div className={`${className ?? "mx-auto w-[240px] max-w-full"} rounded-[2rem] border-[6px] border-foreground/85 bg-foreground/85 shadow-xl`}>
      <div
        className="relative aspect-[5/11] w-full overflow-hidden rounded-[1.5rem] bg-muted bg-cover bg-center"
        style={src ? { backgroundImage: `url(${src})` } : undefined}
      >
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-foreground/85" />
        {!src && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
              <Smartphone className="size-8" />
              <span className="text-xs">{label}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const features = [
    { Icon: Wifi, title: t("f1Title"), desc: t("f1Desc") },
    { Icon: Globe, title: t("f2Title"), desc: t("f2Desc") },
    { Icon: Bell, title: t("f3Title"), desc: t("f3Desc") },
    { Icon: ListChecks, title: t("f4Title"), desc: t("f4Desc") },
    { Icon: BellRing, title: t("f5Title"), desc: t("f5Desc") },
    { Icon: Languages, title: t("f6Title"), desc: t("f6Desc") },
  ];
  const steps = [
    { n: 1, title: t("s1Title"), desc: t("s1Desc") },
    { n: 2, title: t("s2Title"), desc: t("s2Desc") },
    { n: 3, title: t("s3Title"), desc: t("s3Desc") },
    { n: 4, title: t("s4Title"), desc: t("s4Desc") },
  ];

  // GEO/SEO structured data, in the current locale so visible text == schema text.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q[locale] ?? f.q.en,
      acceptedAnswer: { "@type": "Answer", text: f.a[locale] ?? f.a.en },
    })),
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: locale === "zh" ? "如何用短信转发把短信转到 Telegram" : "How to forward your SMS to Telegram with SMS Forwarder",
    step: steps.map((s) => ({ "@type": "HowToStep", position: s.n, name: s.title, text: s.desc })),
  };

  return (
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/[0.06] to-transparent">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {t("badge")}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-primary">SMS Forwarder</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed">{t("subtitle")}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                <Download className="size-5" /> {t("downloadApk")}
              </a>
              <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-medium text-foreground transition hover:bg-accent/50">
                <GithubMark className="size-5" /> {t("viewSource")}
              </a>
              {PLAY_AVAILABLE && (
                <a href={PLAY_URL} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-medium">
                  Google Play
                </a>
              )}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("requiresAndroid")}</p>
            {!PLAY_AVAILABLE && <p className="mt-1 text-xs text-muted-foreground/70">{t("playComingSoon")}</p>}
          </div>
          <PhoneFrame src="/screenshots/hero.jpg" label={t("screenshotPlaceholder")} className="mx-auto w-[300px] sm:w-[360px] lg:w-[440px] max-w-full" />
        </div>
      </section>

      {/* Not-a-VPN trust callout */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4 rounded-xl border border-primary/15 bg-primary/[0.04] p-5">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-primary" />
          <div>
            <h2 className="font-semibold">{t("notVpnTitle")}</h2>
            <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed">{t("notVpnDesc")}</p>
            <a href={locale === "en" ? "/forward-sms-to-telegram/" : `/${locale}/forward-sms-to-telegram/`}
               className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
              {locale === "zh" ? "了解短信转发的完整工作原理 →" : "How SMS Forwarder works, end to end →"}
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">{t("featuresHeading")}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.Icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">{t("screenshotsHeading")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <PhoneFrame src="/screenshots/1.jpg" label={`${t("screenshotPlaceholder")} 1`} className="mx-auto w-full max-w-[420px]" />
            <PhoneFrame src="/screenshots/2.jpg" label={`${t("screenshotPlaceholder")} 2`} className="mx-auto w-full max-w-[420px]" />
            <PhoneFrame src="/screenshots/3.jpg" label={`${t("screenshotPlaceholder")} 3`} className="mx-auto w-full max-w-[420px]" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">{t("howHeading")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {s.n}
                </div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy / trust */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold">{t("trustHeading")}</h2>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{t("trustDesc")}</p>
        </div>
      </section>

      {/* Use cases + comparison + FAQ (SEO / GEO) */}
      <SeoFaq locale={locale} />

      {/* Final CTA */}
      <section className="bg-primary/[0.05] py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("ctaDesc")}</p>
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
             className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            <Download className="size-5" /> {t("downloadApk")}
          </a>
        </div>
      </section>
    </div>
  );
}
