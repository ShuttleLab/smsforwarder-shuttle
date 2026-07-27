// SEO / GEO content for the SMS Forwarder landing page: bilingual use-cases, a comparison
// table, and an FAQ. Written for AI-search extraction (front-loaded, self-contained,
// concrete answers). The FAQ data is also the source for the FAQPage JSON-LD injected by
// app/[locale]/page.tsx, so visible text and schema text stay identical.

type Bi = { en: string; zh: string };

export const USE_CASES: Bi[] = [
  {
    en: "Receive verification / 2FA codes while away — leave the phone with your SIM plugged in at home and get every code in Telegram wherever you are.",
    zh: "人在外面也能收验证码 / 2FA——把插着你 SIM 卡的手机放家里，无论身处何地，每条验证码都进你的 Telegram。",
  },
  {
    en: "Keep an old number alive — a second or retired phone forwards its SMS to your main device without carrying it around.",
    zh: "让旧号码继续可用——一台备用机或旧手机把它收到的短信转发到你主力设备，不用随身带着。",
  },
  {
    en: "Travelling or abroad — read SMS sent to a home-country SIM without roaming, straight in Telegram.",
    zh: "出差或在国外——不用漫游，也能在 Telegram 里读到发往国内 SIM 的短信。",
  },
  {
    en: "Bank, carrier and delivery alerts — funnel transactional SMS to a Telegram chat you actually watch.",
    zh: "银行、运营商、快递通知——把交易类短信汇集到你真正会看的 Telegram 会话。",
  },
  {
    en: "Works on aggressive ROMs — a plugged-in Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor or Huawei / HarmonyOS device keeps forwarding even where background limits kill naive SMS apps.",
    zh: "适配后台限制严苛的定制 ROM——插电常开的三星、小米、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 也能持续转发，普通短信 App 在这些系统上往往直接失灵。",
  },
];

export const COMPARISON = {
  en: {
    heading: "SMS Forwarder vs. other ways to get your texts remotely",
    columns: ["", "SMS Forwarder", "Carrier SMS forwarding", "Cloud SMS-forward apps"],
    rows: [
      ["Open source (app + backend)", "✓", "n/a", "usually closed"],
      ["Message bodies not retained (relay-and-forget)", "✓", "n/a", "often stored"],
      ["No channel tokens stored in the app", "✓", "n/a", "varies"],
      ["Delivers to Telegram", "✓", "— (only another number)", "✓"],
      ["Survives aggressive ROMs (Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, Huawei)", "✓ broadcast + poll", "n/a", "often killed"],
      ["Works without carrier support / extra fees", "✓", "— (may cost per SMS)", "✓"],
      ["Free", "✓ personal use", "varies", "freemium"],
    ],
  },
  zh: {
    heading: "短信转发 与其它「远程收短信」方式的对比",
    columns: ["", "短信转发", "运营商短信转移", "云端转发类 App"],
    rows: [
      ["开源（App + 后端）", "✓", "不适用", "通常闭源"],
      ["正文不保留（转发即焚）", "✓", "不适用", "常常会存"],
      ["App 内不保存渠道 token", "✓", "不适用", "视产品而定"],
      ["投递到 Telegram", "✓", "—（只能转到另一个号码）", "✓"],
      ["扛得住严苛定制 ROM（三星/小米/OPPO/vivo/一加/realme/荣耀/华为）", "✓ 广播 + 轮询", "不适用", "常被杀"],
      ["无需运营商支持 / 额外资费", "✓", "—（可能按条收费）", "✓"],
      ["免费", "✓ 个人使用", "视情况", "免费增值"],
    ],
  },
};

export const FAQS: { q: Bi; a: Bi }[] = [
  {
    q: { en: "What is SMS Forwarder?", zh: "短信转发是什么？" },
    a: {
      en: "SMS Forwarder is a free Android app that captures the text messages your phone receives and forwards them to your Telegram. It is a thin client: it uploads each SMS to the SMS Forwarder backend, which relays it to your Telegram and then deletes the body. It ships ready to use — no server to set up. It is built for a phone left plugged in at home so your SMS — verification codes, bank and carrier alerts — reach you anywhere. Requires Android 8.0 (API 26) or later.",
      zh: "短信转发是一款免费的安卓应用，捕获手机收到的短信并转发到你的 Telegram。它是瘦客户端：把每条短信上传到短信转发后端，由后端转发到你的 Telegram 后再删除正文。开箱即用——无需搭建服务器。它专为「插电放在家里的手机」设计，让验证码、银行与运营商通知等短信随时随地都能找到你。需要 Android 8.0（API 26）及以上。",
    },
  },
  {
    q: { en: "Do I need to set up a server?", zh: "需要自己搭建服务器吗？" },
    a: {
      en: "No. The SMS Forwarder backend is already running and operated by ShuttleLab — just install the app, sign in, and bind Telegram. There is nothing to deploy and no token to paste. Both the app and the backend are open source, so you can inspect the code.",
      zh: "不需要。短信转发的后端已经在运行、由 ShuttleLab 运营——你只要装上 App、登录、绑定 Telegram 即可，无需部署任何东西、也不用粘贴 token。App 与后端均为开源，源码公开可查。",
    },
  },
  {
    q: { en: "Which channels can it forward to?", zh: "能转发到哪些渠道？" },
    a: {
      en: "Telegram, via a shared bot. Because channel routing lives on the backend rather than in the app, more channels can be added server-side without rebuilding or reinstalling the app. Binding your Telegram is one tap — open the bot and press Start; there are no tokens to copy on the phone.",
      zh: "Telegram，通过一个共享 Bot。由于渠道路由在后端而非 App 里，以后要加更多渠道可以在服务端完成，无需重新编译或重装 App。绑定 Telegram 只需一步——打开 Bot 点 Start，手机上不用复制任何 token。",
    },
  },
  {
    q: { en: "Does it work on Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor or Huawei / HarmonyOS?", zh: "在三星、小米、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 上能用吗？" },
    a: {
      en: "Yes — that is a core design goal. On aggressive ROMs (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) the system often withholds SMS broadcasts from third-party apps or freezes background work, which breaks naive forwarders. SMS Forwarder captures with both a broadcast receiver and a foreground-service poll of the SMS inbox (using a monotonic id cursor), and uploads directly from the live service rather than via background schedulers the OS throttles. Add it to the auto-start whitelist and battery-optimization exemption for best results.",
      zh: "能——这正是核心设计目标。三星、小米（MIUI/澎湃）、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 等厂商深度定制的 ROM 常常不给第三方 App 下发短信广播、或冻结后台任务，普通转发工具因此失灵。短信转发同时用广播接收器和前台服务轮询短信库来捕获（基于单调递增的 id 游标），并直接从活着的前台服务上传，而不依赖会被系统限流的后台调度。把它加入自启动白名单并豁免电池优化，效果最佳。",
    },
  },
  {
    q: { en: "Are my SMS private? Are they stored anywhere?", zh: "短信隐私如何？会被存起来吗？" },
    a: {
      en: "The app reads incoming SMS only to forward them; it uploads nothing else. The backend is relay-and-forget: a message body lives only until it is delivered to your Telegram, then it is deleted, leaving just a metadata log (result, time, sender). The backend is operated by ShuttleLab and keeps no message bodies after delivery. There are no ads, no analytics, and no tracking SDKs.",
      zh: "App 读取来信仅为转发，不上传其它任何内容。后端是「转发即焚」：正文只在投递到你的 Telegram 之前短暂保留，之后即删，只留一份元数据日志（结果、时间、发件人）。后端由 ShuttleLab 运营，投递后不保留任何正文。没有广告、没有统计、没有追踪 SDK。",
    },
  },
  {
    q: { en: "Will it drain the battery?", zh: "耗电吗？" },
    a: {
      en: "It is meant for a phone kept plugged in, so power is a non-issue in the intended setup. The foreground service polls the SMS inbox on a short, configurable interval (a cheap local database read) and uploads only when a new message arrives. There is an optional silent-audio keep-alive for extra resistance to being killed on aggressive ROMs; leave it off if you prefer.",
      zh: "它是为「插电常开」的手机设计的，所以在预期用法下耗电不是问题。前台服务以较短、可配置的间隔轮询短信库（一次很廉价的本地数据库读取），只有来新短信时才上传。还有一个可选的静音音频保活，用于在严苛 ROM 上更抗被杀；不需要可以关掉。",
    },
  },
  {
    q: { en: "Is it free? Where do I get it?", zh: "免费吗？在哪下载？" },
    a: {
      en: "SMS Forwarder is free, for personal use — no ads, no in-app purchases. You download the APK from GitHub (Actions artifacts or Releases) and install it directly; on Huawei you may need to disable Pure Mode first. The client and the backend server are separate open repositories.",
      zh: "短信转发免费、供个人使用——无广告、无内购。APK 从 GitHub（Actions 产物或 Releases）下载并直接安装；华为上可能需要先关闭「纯净模式」。客户端与后端服务器是两个独立的公开仓库。",
    },
  },
  {
    q: { en: "How is it different from carrier SMS forwarding or a cloud app?", zh: "和运营商短信转移或云端转发 App 有何不同？" },
    a: {
      en: "Carrier forwarding (if offered) only re-sends to another phone number and may cost per message; a cloud SMS-forward app routes your texts through someone else's server and often stores them. SMS Forwarder is relay-and-forget and open source: it delivers straight to Telegram, keeps no message bodies after delivery, holds no channel tokens in the app, and is engineered to keep running on aggressive Android ROMs.",
      zh: "运营商转移（若提供）只能转到另一个手机号，且可能按条收费；云端转发 App 会把你的短信经由别人的服务器路由、还常常存起来。短信转发是转发即焚 + 开源：直接投递到 Telegram，投完不留正文，App 内不存渠道 token，并且专门针对严苛的定制 ROM 做了保活。",
    },
  },
];

export function SeoFaq({ locale }: { locale: string }) {
  const zh = locale === "zh";
  const cmp = zh ? COMPARISON.zh : COMPARISON.en;
  const pick = (b: Bi) => (zh ? b.zh : b.en);

  return (
    <>
      {/* Use cases */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            {zh ? "什么时候用短信转发" : "When to use SMS Forwarder"}
          </h2>
          <ul className="space-y-3">
            {USE_CASES.map((u) => (
              <li key={u.en} className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <p className="text-[15px] text-muted-foreground leading-relaxed">{pick(u)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">{cmp.heading}</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-muted/50">
                  {cmp.columns.map((c, i) => (
                    <th key={i} className={`p-3 font-semibold ${i === 0 ? "" : "text-center"} ${i === 1 ? "text-primary" : ""}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cmp.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-border">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`p-3 ${ci === 0 ? "text-muted-foreground" : "text-center"} ${ci === 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            {zh ? "常见问题" : "Frequently asked questions"}
          </h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.q.en} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold">{pick(f.q)}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{pick(f.a)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
