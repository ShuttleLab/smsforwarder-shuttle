import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Download, ArrowRight } from "lucide-react";

// Intent-specific GEO landing page: forwarding OTP / verification / 2FA codes to Telegram.
// Distinct angle from the general /forward-sms-to-telegram pillar (no HowTo schema / no full
// setup steps here — links to the pillar for setup to avoid duplicate content). Inline EN/ZH
// consts are the single source for this page's TechArticle + FAQPage JSON-LD.

const BASE = "https://smsforwarder.shuttlelab.org";
const SLUG = "forward-otp-verification-codes-to-telegram";
const DOWNLOAD_URL = "https://github.com/ShuttleLab/SMSForwarder/releases/latest";
const PILLAR = "forward-sms-to-telegram";
const PUBLISHED = "2026-07-27";

type QA = { q: string; a: string };
type Content = {
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  whyH2: string;
  whyParas: string[];
  casesH2: string;
  cases: string[];
  startH2: string;
  startPara: string;
  fullGuide: string;
  faqH2: string;
  faqs: QA[];
  getH2: string;
  download: string;
  backHome: string;
};

const EN: Content = {
  title: "Forward OTP & Verification Codes to Telegram (Android) | SMS Forwarder",
  metaDesc:
    "Get SMS one-time passcodes, 2FA and bank verification codes in Telegram instantly. SMS Forwarder is a free Android app — keep the SIM in a phone at home and read every code wherever you are.",
  h1: "Forward OTP & verification codes to Telegram",
  lead: "Banks, exchanges, WhatsApp, Google, Apple and countless services still send one-time passcodes (OTP) and 2FA codes by SMS to one specific number. If that SIM lives in a phone at home or a second device, SMS Forwarder pushes each code to your Telegram the instant it arrives — so you can sign in and confirm from anywhere, without carrying the SIM or paying to roam.",
  whyH2: "Why route verification codes through Telegram?",
  whyParas: [
    "One-time codes are useless if they arrive on a phone you can't see. Keeping a dedicated number for banking or 2FA is good practice — but only if you can actually read its codes when a login prompt is waiting. Forwarding them to Telegram means the code lands as a push notification on the phone and laptop you already have in hand.",
    "Speed matters for OTP: codes usually expire in a minute or two. SMS Forwarder uploads each message from a live foreground service (not a throttled background job) and the backend relays it immediately, so the code reaches your Telegram in seconds — fast enough to type it before it expires.",
    "It is also more reliable than carrier SMS-forwarding features, which many networks don't offer, charge for, or apply only to voice. Here the routing lives in the app + backend, works on any carrier, and keeps a searchable history of every code you received.",
  ],
  casesH2: "Common cases",
  cases: [
    "Bank / brokerage OTP tied to a number you keep at home, read while you're at work or travelling.",
    "2FA codes for Google, Apple, Microsoft, WhatsApp, Telegram, exchanges — delivered to your main device.",
    "A shared or business line whose login codes the whole team needs to see, funnelled into one chat.",
    "Keeping an old or overseas number alive purely to receive its verification SMS.",
  ],
  startH2: "Get codes flowing in three steps",
  startPara:
    "Install SMS Forwarder on the phone holding the SIM, sign in, and bind Telegram with one tap — no server to set up and no token to paste. Grant SMS + notification permissions, allow battery-optimization exemption so it keeps running, and every incoming code is forwarded automatically.",
  fullGuide: "Full setup guide",
  faqH2: "Frequently asked questions",
  faqs: [
    { q: "How fast do codes arrive?", a: "Usually within a few seconds. The app uploads each SMS from a live foreground service and the backend relays it to Telegram immediately, which is fast enough to use time-limited OTP before it expires. Actual speed depends on the phone's network." },
    { q: "Is it safe to forward verification codes?", a: "The app reads incoming SMS only to forward them. The backend is relay-and-forget: a code's message body lives only until delivered to your Telegram, then it is deleted, leaving a metadata log (result, time, sender). Your Telegram binding is tied to your account, so a code can only reach you, and the per-device sign-in token is revocable. Still, treat Telegram itself as sensitive — enable a Telegram passcode/2FA on that account." },
    { q: "Which services' codes does it handle?", a: "Any that send codes over SMS — banks, Google/Apple/Microsoft, WhatsApp, exchanges, delivery and government services, and so on. SMS Forwarder forwards the text of every SMS the SIM receives; it doesn't matter who sent it." },
    { q: "Does it work on Xiaomi / Samsung / Huawei phones?", a: "Yes. On aggressive ROMs (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei/HarmonyOS) it captures via both a broadcast receiver and a foreground-service inbox poll, so codes still come through where the system blocks SMS broadcasts. Add it to auto-start + battery-optimization exemption." },
    { q: "Is it free?", a: "Yes — free for personal use, no ads, no in-app purchases. Download the APK from GitHub; the app and backend are open source." },
  ],
  getH2: "Never miss a code again",
  download: "Download APK",
  backHome: "SMS Forwarder home",
};

const ZH: Content = {
  title: "把验证码/OTP 转发到 Telegram(安卓）| 短信转发",
  metaDesc:
    "让短信验证码、2FA、银行 OTP 秒到 Telegram。短信转发是一款免费安卓应用——把 SIM 卡放在家里的手机上，走到哪都能收到每一条验证码。",
  h1: "把验证码 / OTP 转发到 Telegram",
  lead: "银行、交易所、WhatsApp、Google、Apple 以及无数服务,至今仍把一次性验证码(OTP)和 2FA 码用短信发到某个特定号码。如果那张 SIM 在家里的手机或一台备用机上,短信转发会在验证码到达的瞬间把它推送到你的 Telegram——你人在任何地方都能登录、确认,不必随身带卡,也不用付漫游费。",
  whyH2: "为什么把验证码走 Telegram?",
  whyParas: [
    "验证码如果到了一台你看不到的手机上就毫无意义。为银行或 2FA 专门留一个号码是好习惯——但前提是登录框在等着时,你真能读到它的码。转发到 Telegram,验证码就会以推送的形式落到你手边的手机和电脑上。",
    "OTP 对速度敏感:验证码通常一两分钟就过期。短信转发由活着的前台服务上传每条消息(而非被系统限流的后台任务),后端立即转发,几秒内就到你的 Telegram——足够你在过期前输入。",
    "它也比运营商自带的短信转移更可靠——后者很多网络不提供、要收费、或只对语音生效。这里路由在 App + 后端,任何运营商都能用,还给你留一份可搜索的验证码历史。",
  ],
  casesH2: "常见场景",
  cases: [
    "绑在家里号码上的银行/券商 OTP,在公司或旅途中也能读到。",
    "Google、Apple、微软、WhatsApp、Telegram、交易所的 2FA 码——送到你的主力设备。",
    "共享或公司号码的登录码需要全team看到,汇入一个聊天。",
    "为收验证码而专门留着的旧号码或海外号码。",
  ],
  startH2: "三步让验证码流起来",
  startPara:
    "在插着 SIM 卡的那台手机上安装短信转发,登录,一步绑定 Telegram——无需搭服务器、不用粘贴 token。授予短信 + 通知权限,开启电池优化豁免让它常驻,之后每条验证码都会自动转发。",
  fullGuide: "完整设置指南",
  faqH2: "常见问题",
  faqs: [
    { q: "验证码多久能到?", a: "通常几秒内。App 由活着的前台服务上传每条短信,后端立即转发到 Telegram,足够你在限时 OTP 过期前使用。实际速度取决于手机网络。" },
    { q: "转发验证码安全吗?", a: "App 读取来信仅为转发。后端是「转发即焚」:验证码正文只在投递到你的 Telegram 前保留,之后即删,只留元数据日志(结果、时间、发件人)。Telegram 绑定与你的账号关联,验证码只会发给你,按设备登录令牌可随时吊销。但仍请把 Telegram 本身当作敏感入口——给该账号设置 Telegram 密码/两步验证。" },
    { q: "支持哪些服务的验证码?", a: "任何用短信发码的都行——银行、Google/Apple/微软、WhatsApp、交易所、快递与政务服务等等。短信转发转发 SIM 收到的每条短信正文,不在意是谁发的。" },
    { q: "在小米/三星/华为上能用吗?", a: "能。在深度定制 ROM(三星、小米/MIUI/澎湃、OPPO、vivo、一加、realme、荣耀、华为/HarmonyOS)上,它用广播接收器 + 前台服务轮询短信库双管齐下,即使系统拦截短信广播也能收到码。请加入自启动 + 电池优化豁免。" },
    { q: "免费吗?", a: "免费,供个人使用,无广告、无内购。从 GitHub 下载 APK;App 与后端均为开源。" },
  ],
  getH2: "再也不错过验证码",
  download: "下载 APK",
  backHome: "短信转发首页",
};

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "zh" ? ZH : EN;
  const path = `/${SLUG}/`;
  const keywords =
    locale === "zh"
      ? ["验证码转发", "验证码转发到 Telegram", "OTP 转发", "2FA 转发", "短信验证码转发", "银行验证码转发", "远程收验证码", "安卓验证码转发"]
      : ["forward OTP to Telegram", "forward verification codes to Telegram", "2FA code to Telegram", "SMS OTP forwarding", "receive verification codes remotely", "bank OTP forwarding", "one-time passcode to Telegram", "Android OTP forwarder"];
  return {
    title: c.title,
    description: c.metaDesc,
    keywords,
    alternates: {
      canonical: locale === "en" ? `${BASE}${path}` : `${BASE}/${locale}${path}`,
      languages: { en: `${BASE}${path}`, zh: `${BASE}/zh${path}`, "x-default": `${BASE}${path}` },
    },
    openGraph: {
      title: c.title,
      description: c.metaDesc,
      siteName: "SMS Forwarder",
      type: "article",
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
  };
}

export default async function ForwardOtpPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = locale === "zh" ? ZH : EN;
  const url = locale === "en" ? `${BASE}/${SLUG}/` : `${BASE}/${locale}/${SLUG}/`;
  const homeHref = locale === "en" ? "/" : `/${locale}/`;
  const pillarHref = locale === "en" ? `/${PILLAR}/` : `/${locale}/${PILLAR}/`;

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: c.h1,
    description: c.metaDesc,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    about: { "@type": "MobileApplication", name: "SMS Forwarder", operatingSystem: "Android 8.0+", applicationCategory: "UtilitiesApplication" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>

      <div className="mt-7">
        <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
          <Download className="size-5" /> {c.download}
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.whyH2}</h2>
        {c.whyParas.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.casesH2}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          {c.cases.map((s, i) => <li key={i} className="leading-relaxed">{s}</li>)}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.startH2}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{c.startPara}</p>
        <a href={pillarHref} className="mt-3 inline-flex items-center gap-1 font-medium text-primary hover:underline">
          {c.fullGuide} <ArrowRight className="size-4" />
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.faqH2}</h2>
        <div className="mt-4 space-y-5">
          {c.faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold">{c.getH2}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            <Download className="size-5" /> {c.download}
          </a>
          <a href={homeHref}
             className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent/50">
            {c.backHome}
          </a>
        </div>
      </section>
    </article>
  );
}
