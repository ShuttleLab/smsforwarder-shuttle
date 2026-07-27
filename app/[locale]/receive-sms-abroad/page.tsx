import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Download, ArrowRight } from "lucide-react";

// Intent-specific GEO landing page: receiving your home-country SIM's SMS while abroad / travelling.
// Distinct angle from the /forward-sms-to-telegram pillar; no HowTo schema / no full setup steps
// (links to the pillar for setup to avoid duplicate content). Inline EN/ZH consts are the single
// source for this page's TechArticle + FAQPage JSON-LD.

const BASE = "https://smsforwarder.shuttlelab.org";
const SLUG = "receive-sms-abroad";
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
  title: "Receive SMS Abroad — Read Your Home SIM's Texts While Travelling | SMS Forwarder",
  metaDesc:
    "Travelling or living abroad? Keep your home-country SIM in a phone at home and get its SMS — verification codes, bank alerts — in Telegram anywhere. Free Android app, no roaming.",
  h1: "Receive SMS abroad: read your home SIM's texts anywhere",
  lead: "When you travel or move overseas, your home-country number keeps receiving important SMS — bank OTPs, government notices, delivery updates, service logins — but the SIM stays behind. SMS Forwarder lets you leave that SIM in a phone plugged in at home and have every message pushed to your Telegram, so you read it on your travel phone or laptop wherever you are. No roaming charges, no SIM swapping, no carrier forwarding fees.",
  whyH2: "Why not just roam or swap SIMs?",
  whyParas: [
    "Roaming is expensive and often disables SMS or delays it, and physically carrying your home SIM means you can't use a cheaper local SIM at the same time without a dual-SIM phone. Neither helps once you've already landed and a bank login needs a code sent to a number back home.",
    "Leaving the SIM at home and forwarding its SMS to Telegram sidesteps all of that. The number stays fully active on its home network, and its messages travel to you over the internet — through the Telegram you already use — instantly and for free, on any local SIM or Wi-Fi you happen to be on.",
    "It also keeps a searchable record: unlike a text that vanishes on a phone you can't reach, every forwarded message stays in the Telegram chat, so you can look up a code or notice days later.",
  ],
  casesH2: "Who this is for",
  cases: [
    "Travellers and digital nomads who need their home bank's OTP while abroad.",
    "Students and expats living overseas but keeping a home-country number active.",
    "Anyone using a cheap local SIM abroad who still must receive texts on their main number.",
    "People maintaining a number in another country for family, services, or accounts.",
  ],
  startH2: "Set it up before you leave (or from anywhere)",
  startPara:
    "Install SMS Forwarder on the phone that will stay home with the SIM, sign in, and bind Telegram with one tap — no server, no token. Leave that phone plugged in with a stable Wi-Fi connection, allow battery-optimization exemption and auto-start, and its SMS will reach your Telegram wherever you go.",
  fullGuide: "Full setup guide",
  faqH2: "Frequently asked questions",
  faqs: [
    { q: "Do I need roaming or a special plan?", a: "No. The home phone forwards over its normal internet connection (Wi-Fi or the SIM's data), and you receive in Telegram over whatever connection you have abroad. There are no roaming charges and no carrier forwarding service involved." },
    { q: "Does the home phone need to stay on?", a: "Yes — leave it plugged in with the SIM inserted and a stable internet connection. The app runs as a foreground service, auto-restarts on reboot, and queues messages if the connection drops, so it keeps delivering unattended." },
    { q: "Will bank verification codes still arrive in time?", a: "Yes. Codes are uploaded from a live foreground service and relayed to Telegram in seconds — fast enough for time-limited OTP. As long as the home phone has internet and the SIM has signal, the code follows you abroad." },
    { q: "Is my data private crossing borders?", a: "The app reads incoming SMS only to forward them, over HTTPS. The backend is relay-and-forget: a message body lives only until delivered to your Telegram, then is deleted, leaving a metadata log. No ads, no analytics; the app and backend are open source." },
    { q: "Is it free?", a: "Yes — free for personal use, no ads or in-app purchases. Download the APK from GitHub and install it on the phone staying home." },
  ],
  getH2: "Keep your home number with you",
  download: "Download APK",
  backHome: "SMS Forwarder home",
};

const ZH: Content = {
  title: "出国收短信——人在国外也能读国内号码的短信 | 短信转发",
  metaDesc:
    "出国旅行或常驻海外?把国内 SIM 卡留在家里的手机上,验证码、银行提醒等短信照样推送到你的 Telegram,走到哪收到哪。免费安卓应用,免漫游。",
  h1: "出国收短信:人在国外也能读国内号码的短信",
  lead: "出国旅行或搬去海外时,你的国内号码仍在收重要短信——银行验证码、政务通知、快递、各种服务登录——可 SIM 卡留在了国内。短信转发让你把那张卡放在家里插电的手机上,每条短信都推送到你的 Telegram,你在旅行手机或电脑上随时读。不用漫游、不用换卡、也不用运营商的短信转移服务。",
  whyH2: "为什么不直接漫游或换卡?",
  whyParas: [
    "漫游又贵、还常常关掉或延迟短信;而随身带国内 SIM,又意味着没有双卡手机就没法同时用更便宜的当地卡。等你已经落地、银行登录需要发到国内号码的验证码时,这两种办法都帮不上。",
    "把卡留在家、短信转发到 Telegram 绕开了这一切。号码在国内网络上完全正常,它的消息经互联网——通过你本来就在用的 Telegram——即时、免费地送到你手上,无论你用的是哪张当地卡或哪个 Wi-Fi。",
    "它还留一份可搜索的记录:不像那些消失在你够不到的手机上的短信,每条转发过的消息都留在 Telegram 会话里,几天后你还能翻出某条验证码或通知。",
  ],
  casesH2: "适合谁",
  cases: [
    "旅行者、数字游民——在国外需要国内银行的 OTP。",
    "海外留学生、侨居者——人在国外但要保住国内号码。",
    "在国外用便宜当地卡、但仍要在主号码上收短信的人。",
    "为家人、服务或账户在另一个国家维持一个号码的人。",
  ],
  startH2: "出发前(或随时)设置好",
  startPara:
    "在将要留在国内、插着 SIM 卡的那台手机上安装短信转发,登录,一步绑定 Telegram——无需服务器、无需 token。让那台手机插电常开、连稳定 Wi-Fi,开启电池优化豁免与自启动,它的短信就会跟着你走到天涯海角。",
  fullGuide: "完整设置指南",
  faqH2: "常见问题",
  faqs: [
    { q: "需要漫游或特殊套餐吗?", a: "不需要。家里的手机用它自己的正常网络(Wi-Fi 或 SIM 流量)转发,你在国外用手边任意网络在 Telegram 里接收。全程没有漫游费,也不涉及运营商的短信转移服务。" },
    { q: "家里那台手机要一直开着吗?", a: "是的——插电、插卡、连稳定网络放着即可。App 以前台服务运行,开机自启,断网时会把消息排队,无人值守也能持续送达。" },
    { q: "银行验证码还能及时收到吗?", a: "能。验证码由活着的前台服务上传、几秒内转发到 Telegram,足够限时 OTP 使用。只要家里手机有网、SIM 有信号,验证码就会跟着你到国外。" },
    { q: "跨境传输我的数据私密吗?", a: "App 读取来信仅为转发,经 HTTPS 传输。后端「转发即焚」:正文只在投递到你的 Telegram 前保留,之后即删,只留元数据日志。无广告、无统计;App 与后端均为开源。" },
    { q: "免费吗?", a: "免费,供个人使用,无广告、无内购。从 GitHub 下载 APK,装在留在国内的那台手机上即可。" },
  ],
  getH2: "让国内号码跟着你走",
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
      ? ["出国收短信", "国外收国内短信", "海外收短信", "留学生收短信", "国内号码短信转发", "漫游收短信替代", "出国验证码", "国内验证码转发到国外"]
      : ["receive SMS abroad", "read home SIM texts while travelling", "get SMS overseas", "receive verification codes abroad", "home country SIM SMS forwarding", "SMS without roaming", "expat SMS forwarding", "travel SMS forwarding"];
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

export default async function ReceiveSmsAbroadPage({ params }: Props) {
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
