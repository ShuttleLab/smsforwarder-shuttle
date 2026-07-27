import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Download, ArrowLeft } from "lucide-react";

// Long-form GEO landing page targeting the "forward SMS to Telegram / receive SMS
// remotely" intent. Bilingual + locale-branched; the FAQ/HowTo data is the single source
// for the FAQPage/HowTo JSON-LD so visible text == schema text.

const BASE = "https://smsforwarder.shuttlelab.org";
const SLUG = "forward-sms-to-telegram";
const DOWNLOAD_URL = "https://github.com/ShuttleLab/SMSForwarder/releases/latest";
const SOURCE_URL = "https://github.com/ShuttleLab/SMSForwarder";
const BACKEND_URL = "https://github.com/ShuttleLab/smsforwarder-api";
const PUBLISHED = "2026-07-27";

type Step = { title: string; desc: string };
type QA = { q: string; a: string };
type Content = {
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  whyH2: string;
  whyParas: string[];
  howH2: string;
  howIntro: string;
  howPoints: string[];
  boundaryH2: string;
  boundaryParas: string[];
  setupH2: string;
  setupSteps: Step[];
  signsH2: string;
  signs: string[];
  faqH2: string;
  faqs: QA[];
  getH2: string;
  download: string;
  source: string;
  backHome: string;
};

const EN: Content = {
  title: "Forward SMS to Telegram on Android — Receive Texts Remotely | SMS Forwarder",
  metaDesc:
    "Automatically forward incoming SMS to your Telegram. SMS Forwarder is a free, ready-to-use Android app — leave a phone plugged in at home and get verification codes and alerts anywhere.",
  h1: "Forward SMS to Telegram on Android: receive your texts anywhere",
  lead: "SMS Forwarder is a free Android app that automatically forwards the text messages your phone receives to your Telegram. It uploads each SMS to the SMS Forwarder service, which relays it to your Telegram and then forgets it — there's no server to set up, the app ships ready to connect. Leave a phone plugged in at home with your SIM, and every verification code, bank alert, or carrier message reaches you wherever you are — no roaming, no carrier forwarding fees.",
  whyH2: "Why forward SMS to Telegram?",
  whyParas: [
    "Plenty of accounts still send one-time codes and alerts by SMS to a specific number. If that SIM lives in a phone at home, in a second device, or on a number you keep for banking, you can't read those texts while you're out — and roaming or swapping SIMs is a hassle.",
    "Forwarding those SMS into Telegram solves it cleanly: Telegram is already on your main phone and laptop, delivery is instant and push-notified, and threads are searchable. You keep the SIM where it is and simply read its messages in a chat you already watch.",
    "This is ideal for keeping an old number alive, receiving codes for a home-country SIM while abroad, or funneling a business/shared line's alerts to a place the whole team can see.",
  ],
  howH2: "How SMS Forwarder delivers your texts",
  howIntro: "The app is a thin client — it captures SMS and hands them to the SMS Forwarder backend, which does the routing:",
  howPoints: [
    "Capture — a broadcast receiver plus a foreground-service poll of the SMS inbox catch every new message, using a monotonic id cursor so nothing is skipped, even on ROMs that withhold SMS broadcasts.",
    "Upload — each message is sent to the SMS Forwarder backend over HTTPS from the live foreground service (not a background scheduler the OS throttles), and retried until it succeeds.",
    "Relay — the backend delivers to your Telegram via a shared bot, then deletes the message body; a server-side idempotency key means a text is never delivered twice.",
  ],
  boundaryH2: "Relay-and-forget",
  boundaryParas: [
    "SMS Forwarder holds no Telegram tokens in the app. The SMS Forwarder backend — operated by ShuttleLab — relays each message and then deletes the body; message bodies live there only until delivered, then they are deleted, leaving just a metadata log (result, time, sender).",
    "Signing in uses a per-device token you can revoke at any time, and your Telegram binding is tied to your account, so a message can only ever reach you. Because routing lives on the server, new channels can be added there without rebuilding or reinstalling the app. Both the app and the backend are open source.",
  ],
  setupH2: "How to set up SMS forwarding to Telegram",
  setupSteps: [
    { title: "Install the app", desc: "Download the APK from GitHub and install it on the phone that holds the SIM (Android 8.0 / API 26 or later). On Huawei, disable Pure Mode first." },
    { title: "Sign in & bind Telegram", desc: "Create an account, then tap Bind Telegram, open the bot, and press Start. Your chat is now linked — no tokens to copy, and no server to configure." },
    { title: "Start the service & keep it alive", desc: "Grant SMS + notification permissions and tap Start. Allow battery-optimization exemption and auto-start so the OS keeps it running on a plugged-in phone." },
  ],
  signsH2: "What it handles for you",
  signs: [
    "Long / multipart SMS are reassembled and, if needed, split under Telegram's message-length limit so nothing is truncated.",
    "Aggressive ROMs (Samsung, Xiaomi / MIUI / HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) — capture keeps working via inbox polling where SMS broadcasts are blocked.",
    "Reboots and process kills — the service auto-restarts on boot and the upload queue survives, so a restart doesn't lose messages.",
  ],
  faqH2: "Frequently asked questions",
  faqs: [
    { q: "Do I need to set up a server?", a: "No — the SMS Forwarder backend is already running, operated by ShuttleLab. Install the app, sign in, and bind Telegram; there is nothing to deploy and no token to paste. The app and backend are open source." },
    { q: "Which apps can it forward to?", a: "Telegram, via a shared bot. Because channel routing lives on the backend rather than in the app, more destinations can be added server-side without rebuilding the app. Binding Telegram is one tap — open the bot and press Start; no tokens to copy on the phone." },
    { q: "Will it keep working on Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor or Huawei / HarmonyOS phones?", a: "Yes. On aggressive ROMs (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) the system often withholds SMS broadcasts from third-party apps and throttles background work. SMS Forwarder captures with both a broadcast receiver and a foreground-service poll of the SMS inbox, and uploads directly from the live service. Add it to the auto-start whitelist and battery-optimization exemption for best results." },
    { q: "Are my messages stored anywhere?", a: "The app reads incoming SMS only to forward them. On the backend it is relay-and-forget: a message body lives only until delivered, then it is deleted, leaving just a metadata log (result, time, sender). The backend is operated by ShuttleLab and keeps no message bodies after delivery. There are no ads, no analytics, and no tracking SDKs." },
    { q: "Is it free? Where do I get it?", a: "SMS Forwarder is free, for personal use — no ads, no in-app purchases. Download the APK from GitHub and install it directly. The Android client and the backend server are separate repositories." },
  ],
  getH2: "Get SMS Forwarder",
  download: "Download APK",
  source: "View source",
  backHome: "Back to SMS Forwarder home",
};

const ZH: Content = {
  title: "安卓短信转发到 Telegram——随处接收短信 | 短信转发",
  metaDesc:
    "自动把收到的短信转发到你的 Telegram。短信转发是一款免费、开箱即用的安卓应用——把手机插电放家里，验证码和通知随时随地都能收到。",
  h1: "安卓短信转发到 Telegram：随处接收你的短信",
  lead: "短信转发是一款免费的安卓应用，自动把手机收到的短信转发到你的 Telegram。它把每条短信上传到短信转发服务，由服务转发到 Telegram 后即删——无需搭建服务器，App 出厂即可连接。把插着 SIM 卡的手机放家里插电常开，验证码、银行提醒、运营商短信就能随时随地找到你——不用漫游，也不用运营商的短信转移服务。",
  whyH2: "为什么要把短信转发到 Telegram？",
  whyParas: [
    "很多账户至今仍把一次性验证码和通知用短信发到某个特定号码。如果那张 SIM 在家里的手机、一台备用机、或你专门留着收银行短信的号码上，你人在外面就读不到——而漫游或换卡都很麻烦。",
    "把这些短信转进 Telegram 就干净地解决了：Telegram 本来就在你的主力手机和电脑上，投递即时且有推送，会话还能搜索。SIM 卡原地不动，你只需在一个本来就会看的聊天里读它的消息。",
    "这非常适合：让旧号码继续可用、人在国外仍收发往国内 SIM 的验证码、或把公司/共享号码的通知汇集到全team 都能看到的地方。",
  ],
  howH2: "短信转发如何送达你的短信",
  howIntro: "App 是瘦客户端——它负责捕获短信、交给短信转发后端，由后端做路由：",
  howPoints: [
    "捕获——短信广播接收器 + 前台服务轮询短信库双管齐下，用单调递增的 id 游标抓住每条新消息；即使在不下发短信广播的 ROM 上也不漏。",
    "上传——每条消息由活着的前台服务经 HTTPS 发往短信转发后端（而非会被系统限流的后台调度），并一直重试到成功。",
    "转发——后端通过共享 Bot 投递到你的 Telegram，随后删除正文；服务端幂等键保证同一条短信绝不重复投递。",
  ],
  boundaryH2: "转发即焚",
  boundaryParas: [
    "短信转发在 App 内不保存任何 Telegram token。短信转发后端由 ShuttleLab 运营，负责转发每条消息、随后删除正文；正文只在投递完成前短暂驻留其中，投完即删，只留一份元数据日志（结果、时间、发件人）。",
    "登录使用可随时吊销的按设备令牌，你的 Telegram 绑定与账号关联，因此消息只会发给你。由于路由在服务端，以后加新渠道可在那里完成，无需重新编译或重装 App。App 与后端均为开源。",
  ],
  setupH2: "如何设置短信转发到 Telegram",
  setupSteps: [
    { title: "安装 App", desc: "从 GitHub 下载 APK，装到插着 SIM 卡的那台手机上（Android 8.0 / API 26 及以上）。华为请先关闭「纯净模式」。" },
    { title: "登录并绑定 Telegram", desc: "注册账号，然后点「绑定 Telegram」，打开 Bot 点 Start。会话即绑定——无需复制任何 token，也不用配置服务器。" },
    { title: "启动服务并保活", desc: "授予短信 + 通知权限并点「启动」。开启电池优化豁免与自启动，让系统在插电常开的手机上一直保持它运行。" },
  ],
  signsH2: "它帮你处理好的细节",
  signs: [
    "长短信 / 多段短信会被拼接还原；必要时按 Telegram 的长度上限自动分段，绝不截断。",
    "严苛的定制 ROM（三星、小米 / MIUI / 澎湃、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS）——在短信广播被拦的地方，靠轮询短信库继续抓取。",
    "重启与进程被杀——服务开机自启、上传队列跨重启保留，重启不会丢消息。",
  ],
  faqH2: "常见问题",
  faqs: [
    { q: "需要自己搭建服务器吗？", a: "不需要——短信转发的后端已在运行、由 ShuttleLab 运营。装上 App、登录、绑定 Telegram 即可，无需部署任何东西、也不用粘贴 token。App 与后端均为开源。" },
    { q: "能转发到哪些 App？", a: "Telegram，通过一个共享 Bot。由于渠道路由在后端而非 App 里，以后要加更多目的地可以在服务端完成，无需重新编译 App。绑定 Telegram 只需一步——打开 Bot 点 Start，手机上不用复制任何 token。" },
    { q: "在三星、小米、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 上能一直用吗？", a: "能。三星、小米（MIUI/澎湃）、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 等厂商深度定制的 ROM 常常不给第三方 App 下发短信广播、并限流后台任务。短信转发同时用广播接收器和前台服务轮询短信库来捕获，并直接从活着的前台服务上传。把它加入自启动白名单并豁免电池优化，效果最佳。" },
    { q: "我的消息会被存起来吗？", a: "App 读取来信仅为转发。后端是「转发即焚」：正文只在投递完成前保留，之后即删，只留一份元数据日志（结果、时间、发件人）。后端由 ShuttleLab 运营，投递后不保留任何正文。没有广告、没有统计、没有追踪 SDK。" },
    { q: "免费吗？在哪下载？", a: "短信转发免费、供个人使用——无广告、无内购。从 GitHub 下载 APK 直接安装即可。安卓客户端与后端服务器是两个独立的仓库。" },
  ],
  getH2: "获取短信转发",
  download: "下载 APK",
  source: "查看源码",
  backHome: "返回短信转发首页",
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
      ? ["短信转发到 Telegram", "短信转发", "远程收短信", "验证码转发", "验证码转发到 Telegram", "2FA 转发", "安卓短信转发 app", "三星短信转发", "小米短信转发", "MIUI 短信转发", "OPPO 短信转发", "vivo 短信转发", "一加短信转发", "realme 短信转发", "荣耀短信转发", "华为短信转发", "HarmonyOS 短信转发", "出国收短信"]
      : ["forward SMS to Telegram", "SMS to Telegram bot", "receive SMS remotely", "SMS forwarding Android", "verification code forwarding", "2FA code to Telegram", "read SMS abroad", "Samsung SMS forwarding", "Xiaomi SMS forwarding", "MIUI SMS forwarding", "OPPO SMS forwarding", "vivo SMS forwarding", "OnePlus SMS forwarding", "Realme SMS forwarding", "Honor SMS forwarding", "Huawei SMS forwarding", "HarmonyOS SMS forwarding", "Tecno SMS forwarding", "Infinix SMS forwarding", "Motorola SMS forwarding", "Nothing Phone SMS forwarding"];
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

export default async function ForwardSmsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = locale === "zh" ? ZH : EN;
  const url = locale === "en" ? `${BASE}/${SLUG}/` : `${BASE}/${locale}/${SLUG}/`;
  const homeHref = locale === "en" ? "/" : `/${locale}/`;

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
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: c.setupH2,
    step: c.setupSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
          <Download className="size-5" /> {c.download}
        </a>
        <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent/50">
          {c.source}
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.whyH2}</h2>
        {c.whyParas.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.howH2}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{c.howIntro}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          {c.howPoints.map((p, i) => <li key={i} className="leading-relaxed">{p}</li>)}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.boundaryH2}</h2>
        {c.boundaryParas.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.setupH2}</h2>
        <ol className="mt-4 space-y-4">
          {c.setupSteps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.signsH2}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          {c.signs.map((s, i) => <li key={i} className="leading-relaxed">{s}</li>)}
        </ul>
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
          <a href={BACKEND_URL} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent/50">
            {locale === "zh" ? "后端仓库" : "Backend repo"}
          </a>
          <a href={homeHref}
             className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent/50">
            <ArrowLeft className="size-4" /> {c.backHome}
          </a>
        </div>
      </section>
    </article>
  );
}
