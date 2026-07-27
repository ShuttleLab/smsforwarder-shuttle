import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";
import { getOgLocale } from "@/lib/i18n/config";
import { Download, ArrowLeft } from "lucide-react";

// Long-form GEO landing page targeting the "forward SMS to Telegram / receive SMS
// remotely" intent. Bilingual + locale-branched; the FAQ/HowTo data is the single source
// for the FAQPage/HowTo JSON-LD so visible text == schema text.

const BASE = "https://smsforwarder.shuttlelab.org";
const SLUG = "forward-sms-to-telegram";
const DOWNLOAD_URL = "https://github.com/ShuttleLab/SMSForwarder/releases/latest/download/SMSForwarder.apk";
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
  keywords: string[];
};

const PATH = "/forward-sms-to-telegram";

const CONTENT: Record<string, Content> = {
  en: {
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
  keywords: ["forward SMS to Telegram", "SMS to Telegram bot", "receive SMS remotely", "SMS forwarding Android", "verification code forwarding", "2FA code to Telegram", "read SMS abroad", "Samsung SMS forwarding", "Xiaomi SMS forwarding", "MIUI SMS forwarding", "OPPO SMS forwarding", "vivo SMS forwarding", "OnePlus SMS forwarding", "Realme SMS forwarding", "Honor SMS forwarding", "Huawei SMS forwarding", "HarmonyOS SMS forwarding", "Tecno SMS forwarding", "Infinix SMS forwarding", "Motorola SMS forwarding", "Nothing Phone SMS forwarding"],
  },
  zh: {
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
  keywords: ["短信转发到 Telegram", "短信转发", "远程收短信", "验证码转发", "验证码转发到 Telegram", "2FA 转发", "安卓短信转发 app", "三星短信转发", "小米短信转发", "MIUI 短信转发", "OPPO 短信转发", "vivo 短信转发", "一加短信转发", "realme 短信转发", "荣耀短信转发", "华为短信转发", "HarmonyOS 短信转发", "出国收短信"],
  },
  id: {
    title: "Teruskan SMS ke Telegram di Android — Terima SMS dari Jarak Jauh | SMS Forwarder",
    metaDesc:
      "Teruskan otomatis SMS masuk ke Telegram Anda. SMS Forwarder adalah aplikasi Android gratis yang siap pakai — tinggalkan satu ponsel tercolok di rumah dan terima kode verifikasi serta notifikasi di mana saja.",
    h1: "Teruskan SMS ke Telegram di Android: terima SMS Anda di mana saja",
    lead: "SMS Forwarder adalah aplikasi Android gratis yang otomatis meneruskan pesan teks yang diterima ponsel Anda ke Telegram. Aplikasi mengunggah setiap SMS ke layanan SMS Forwarder, yang meneruskannya ke Telegram Anda lalu melupakannya — tak ada server yang perlu disiapkan, aplikasi hadir siap terhubung. Tinggalkan satu ponsel tercolok di rumah bersama SIM Anda, dan setiap kode verifikasi, notifikasi bank, atau pesan operator akan sampai ke Anda di mana pun Anda berada — tanpa roaming, tanpa biaya penerusan dari operator.",
    whyH2: "Kenapa meneruskan SMS ke Telegram?",
    whyParas: [
      "Banyak akun masih mengirim kode sekali pakai dan notifikasi lewat SMS ke satu nomor tertentu. Kalau SIM itu ada di ponsel di rumah, di perangkat kedua, atau di nomor yang Anda simpan khusus untuk urusan bank, Anda tidak bisa membaca SMS-nya saat sedang di luar — sementara roaming atau gonta-ganti SIM sama-sama merepotkan.",
      "Meneruskan SMS itu ke Telegram menyelesaikannya dengan rapi: Telegram sudah ada di ponsel utama dan laptop Anda, pengiriman instan dengan notifikasi push, dan percakapannya bisa dicari. SIM tetap di tempatnya dan Anda cukup membaca pesannya di chat yang memang sudah Anda pantau.",
      "Ini ideal untuk menjaga nomor lama tetap aktif, menerima kode dari SIM negara asal selama di luar negeri, atau mengalirkan notifikasi dari nomor bisnis/bersama ke satu tempat yang bisa dilihat seluruh tim.",
    ],
    howH2: "Bagaimana SMS Forwarder mengirimkan SMS Anda",
    howIntro: "Aplikasi ini adalah thin client — ia menangkap SMS dan menyerahkannya ke backend SMS Forwarder, yang menangani peruteannya:",
    howPoints: [
      "Tangkap — sebuah broadcast receiver plus polling kotak masuk SMS oleh foreground service menangkap setiap pesan baru, memakai cursor id yang selalu naik sehingga tak ada yang terlewat, bahkan di ROM yang menahan broadcast SMS.",
      "Unggah — setiap pesan dikirim ke backend SMS Forwarder lewat HTTPS dari foreground service yang aktif (bukan penjadwal latar belakang yang dibatasi sistem), dan dicoba ulang hingga berhasil.",
      "Teruskan — backend mengirim ke Telegram Anda melalui bot bersama, lalu menghapus isi pesan; kunci idempotensi di sisi server memastikan sebuah SMS tak pernah terkirim dua kali.",
    ],
    boundaryH2: "Relay-and-forget",
    boundaryParas: [
      "SMS Forwarder tidak menyimpan token Telegram apa pun di dalam aplikasi. Backend SMS Forwarder — dioperasikan oleh ShuttleLab — meneruskan setiap pesan lalu menghapus isinya; isi pesan hanya berada di sana sampai terkirim, setelah itu dihapus, menyisakan hanya log metadata (hasil, waktu, pengirim).",
      "Proses masuk memakai token per-perangkat yang bisa Anda cabut kapan saja, dan pengikatan Telegram Anda tertaut ke akun Anda, sehingga sebuah pesan hanya mungkin sampai kepada Anda. Karena perutean berada di server, channel baru bisa ditambahkan di sana tanpa membangun ulang atau memasang ulang aplikasi. Baik aplikasi maupun backend bersifat open source.",
    ],
    setupH2: "Cara menyiapkan penerusan SMS ke Telegram",
    setupSteps: [
      { title: "Pasang aplikasi", desc: "Unduh APK dari GitHub dan pasang di ponsel yang memegang SIM (Android 8.0 / API 26 atau lebih baru). Di Huawei, nonaktifkan Pure Mode terlebih dahulu." },
      { title: "Masuk & ikat Telegram", desc: "Buat akun, lalu ketuk Bind Telegram, buka bot, dan tekan Start. Chat Anda kini tertaut — tak ada token untuk disalin, dan tak ada server untuk dikonfigurasi." },
      { title: "Mulai layanan & jaga tetap hidup", desc: "Beri izin SMS + notifikasi lalu ketuk Start. Izinkan pengecualian optimasi baterai dan auto-start agar sistem menjaganya tetap berjalan di ponsel yang tercolok." },
    ],
    signsH2: "Yang ditangani untuk Anda",
    signs: [
      "SMS panjang / multipart disatukan kembali dan, bila perlu, dipecah agar sesuai batas panjang pesan Telegram sehingga tak ada yang terpotong.",
      "ROM agresif (Samsung, Xiaomi / MIUI / HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) — penangkapan tetap bekerja lewat polling kotak masuk di tempat broadcast SMS diblokir.",
      "Reboot dan proses yang dimatikan — layanan menyala kembali otomatis saat boot dan antrean unggahan tetap bertahan, jadi restart tidak membuat pesan hilang.",
    ],
    faqH2: "Pertanyaan yang sering diajukan",
    faqs: [
      { q: "Apakah saya perlu menyiapkan server?", a: "Tidak — backend SMS Forwarder sudah berjalan, dioperasikan oleh ShuttleLab. Pasang aplikasi, masuk, lalu ikat Telegram; tak ada yang perlu di-deploy dan tak ada token untuk ditempel. Aplikasi dan backend bersifat open source." },
      { q: "Ke aplikasi apa saja SMS bisa diteruskan?", a: "Telegram, melalui bot bersama. Karena perutean channel berada di backend dan bukan di aplikasi, lebih banyak tujuan bisa ditambahkan di sisi server tanpa membangun ulang aplikasi. Mengikat Telegram cukup satu ketuk — buka bot dan tekan Start; tak ada token untuk disalin di ponsel." },
      { q: "Apakah tetap bekerja di ponsel Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, atau Huawei / HarmonyOS?", a: "Ya. Di ROM agresif (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) sistem kerap menahan broadcast SMS dari aplikasi pihak ketiga dan membatasi kerja latar belakang. SMS Forwarder menangkap dengan broadcast receiver sekaligus polling kotak masuk SMS oleh foreground service, dan mengunggah langsung dari layanan yang aktif. Tambahkan ke daftar putih auto-start dan pengecualian optimasi baterai untuk hasil terbaik." },
      { q: "Apakah pesan saya disimpan di suatu tempat?", a: "Aplikasi membaca SMS masuk hanya untuk meneruskannya. Di backend prinsipnya relay-and-forget: isi pesan hanya bertahan sampai terkirim, lalu dihapus, menyisakan hanya log metadata (hasil, waktu, pengirim). Backend dioperasikan oleh ShuttleLab dan tidak menyimpan isi pesan setelah terkirim. Tak ada iklan, tak ada analitik, dan tak ada SDK pelacak." },
      { q: "Apakah gratis? Di mana saya mendapatkannya?", a: "SMS Forwarder gratis, untuk penggunaan pribadi — tanpa iklan, tanpa pembelian dalam aplikasi. Unduh APK dari GitHub dan pasang langsung. Klien Android dan server backend berada di repositori yang terpisah." },
    ],
    getH2: "Dapatkan SMS Forwarder",
    download: "Unduh APK",
    source: "Lihat kode sumber",
    backHome: "Kembali ke beranda SMS Forwarder",
    keywords: ["teruskan SMS ke Telegram", "forward SMS ke Telegram", "terima SMS jarak jauh", "aplikasi penerus SMS Android", "teruskan kode OTP ke Telegram", "teruskan kode verifikasi ke Telegram", "kode 2FA ke Telegram", "baca SMS di luar negeri", "teruskan SMS Samsung", "teruskan SMS Xiaomi", "teruskan SMS MIUI", "teruskan SMS OPPO", "teruskan SMS vivo", "teruskan SMS OnePlus", "teruskan SMS Realme", "teruskan SMS Honor", "teruskan SMS Huawei", "teruskan SMS HarmonyOS", "terima SMS tanpa roaming"],
  },
  vi: {
    title: "Chuyển tiếp SMS đến Telegram trên Android — Nhận tin nhắn từ xa | SMS Forwarder",
    metaDesc:
      "Tự động chuyển tiếp SMS đến đến Telegram của bạn. SMS Forwarder là ứng dụng Android miễn phí, dùng ngay — để một chiếc điện thoại cắm sạc ở nhà và nhận mã xác minh cùng cảnh báo ở bất cứ đâu.",
    h1: "Chuyển tiếp SMS đến Telegram trên Android: nhận tin nhắn của bạn ở mọi nơi",
    lead: "SMS Forwarder là ứng dụng Android miễn phí, tự động chuyển tiếp những tin nhắn mà điện thoại của bạn nhận được đến Telegram. Ứng dụng tải mỗi SMS lên dịch vụ SMS Forwarder, dịch vụ này chuyển nó đến Telegram của bạn rồi quên đi — không cần dựng server nào cả, ứng dụng xuất xưởng đã sẵn sàng kết nối. Chỉ cần để một chiếc điện thoại lắp SIM cắm sạc ở nhà, mọi mã xác minh, cảnh báo ngân hàng hay tin nhắn nhà mạng đều đến được với bạn dù bạn ở đâu — không chuyển vùng, không phí chuyển tiếp của nhà mạng.",
    whyH2: "Vì sao nên chuyển tiếp SMS đến Telegram?",
    whyParas: [
      "Rất nhiều tài khoản đến nay vẫn gửi mã dùng một lần và cảnh báo qua SMS đến một số điện thoại cụ thể. Nếu chiếc SIM đó nằm trong một điện thoại ở nhà, trong một máy phụ, hoặc trên một số bạn giữ để dùng cho ngân hàng, thì bạn không thể đọc những tin đó khi đi vắng — mà chuyển vùng hay tráo SIM thì đều phiền phức.",
      "Chuyển những SMS ấy vào Telegram giải quyết vấn đề một cách gọn gàng: Telegram vốn đã có sẵn trên điện thoại chính và máy tính của bạn, tin đến tức thì và có thông báo đẩy, còn hội thoại thì tìm kiếm được. Bạn giữ nguyên SIM ở chỗ cũ và chỉ đơn giản đọc tin nhắn của nó trong một cuộc trò chuyện mà bạn vẫn xem.",
      "Cách này lý tưởng để giữ một số cũ còn hoạt động, nhận mã cho một SIM ở quê nhà khi đang ở nước ngoài, hoặc dồn cảnh báo của một số dùng chung / số công ty về một nơi mà cả nhóm đều thấy.",
    ],
    howH2: "SMS Forwarder gửi tin nhắn của bạn như thế nào",
    howIntro: "Ứng dụng là một client gọn nhẹ — nó bắt SMS rồi giao cho backend SMS Forwarder lo việc định tuyến:",
    howPoints: [
      "Bắt tin — một bộ nhận broadcast cùng việc quét hộp thư SMS từ dịch vụ nền bắt mọi tin nhắn mới, dùng con trỏ id tăng đều nên không bỏ sót gì, kể cả trên các ROM không phát broadcast SMS.",
      "Tải lên — mỗi tin nhắn được gửi tới backend SMS Forwarder qua HTTPS từ dịch vụ nền đang chạy (không phải bộ lập lịch nền bị hệ điều hành bóp), và được thử lại đến khi thành công.",
      "Chuyển tiếp — backend gửi đến Telegram của bạn qua một bot dùng chung, rồi xóa nội dung tin nhắn; một khóa idempotency phía server đảm bảo một tin không bao giờ được gửi hai lần.",
    ],
    boundaryH2: "Chuyển-rồi-quên",
    boundaryParas: [
      "SMS Forwarder không giữ token Telegram nào trong ứng dụng. Backend SMS Forwarder — do ShuttleLab vận hành — chuyển mỗi tin nhắn rồi xóa nội dung; nội dung tin nhắn chỉ tồn tại ở đó cho đến khi được gửi đi, sau đó bị xóa, chỉ để lại một nhật ký metadata (kết quả, thời gian, người gửi).",
      "Việc đăng nhập dùng một token riêng cho từng thiết bị mà bạn có thể thu hồi bất cứ lúc nào, và liên kết Telegram của bạn được gắn với tài khoản, nên tin nhắn chỉ có thể đến được với bạn. Vì việc định tuyến nằm trên server, có thể thêm kênh mới ngay tại đó mà không cần biên dịch hay cài lại ứng dụng. Cả ứng dụng lẫn backend đều là mã nguồn mở.",
    ],
    setupH2: "Cách thiết lập chuyển tiếp SMS đến Telegram",
    setupSteps: [
      { title: "Cài đặt ứng dụng", desc: "Tải APK từ GitHub và cài lên chiếc điện thoại giữ SIM (Android 8.0 / API 26 trở lên). Trên Huawei, hãy tắt Pure Mode trước." },
      { title: "Đăng nhập & liên kết Telegram", desc: "Tạo một tài khoản, rồi chạm Liên kết Telegram, mở bot và nhấn Start. Cuộc trò chuyện của bạn giờ đã được liên kết — không token nào phải sao chép, cũng không server nào phải cấu hình." },
      { title: "Khởi động dịch vụ & giữ nó sống", desc: "Cấp quyền SMS + thông báo và chạm Bắt đầu. Cho phép miễn tối ưu hóa pin và tự khởi động để hệ điều hành giữ nó chạy trên chiếc điện thoại cắm sạc." },
    ],
    signsH2: "Những gì nó lo giúp bạn",
    signs: [
      "SMS dài / nhiều phần được ghép lại và, nếu cần, chia nhỏ dưới giới hạn độ dài tin nhắn của Telegram để không có gì bị cắt cụt.",
      "Các ROM khắt khe (Samsung, Xiaomi / MIUI / HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) — việc bắt tin vẫn hoạt động nhờ quét hộp thư ở những nơi broadcast SMS bị chặn.",
      "Khởi động lại và bị kill tiến trình — dịch vụ tự khởi động lại khi bật máy và hàng đợi tải lên vẫn còn, nên một lần khởi động lại không làm mất tin nhắn.",
    ],
    faqH2: "Câu hỏi thường gặp",
    faqs: [
      { q: "Tôi có cần dựng một server không?", a: "Không — backend SMS Forwarder đã chạy sẵn, do ShuttleLab vận hành. Cài ứng dụng, đăng nhập và liên kết Telegram; không có gì phải triển khai và không token nào phải dán. Ứng dụng và backend đều là mã nguồn mở." },
      { q: "Nó có thể chuyển tiếp đến những ứng dụng nào?", a: "Telegram, qua một bot dùng chung. Vì việc định tuyến kênh nằm trên backend chứ không phải trong ứng dụng, có thể thêm đích đến khác ngay phía server mà không cần biên dịch lại ứng dụng. Liên kết Telegram chỉ với một chạm — mở bot và nhấn Start; không token nào phải sao chép trên điện thoại." },
      { q: "Nó có tiếp tục hoạt động trên điện thoại Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor hay Huawei / HarmonyOS không?", a: "Có. Trên các ROM khắt khe (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS), hệ thống thường không phát broadcast SMS cho ứng dụng bên thứ ba và bóp các tác vụ nền. SMS Forwarder bắt tin bằng cả bộ nhận broadcast lẫn việc quét hộp thư SMS từ dịch vụ nền, và tải lên trực tiếp từ dịch vụ đang chạy. Hãy thêm nó vào danh sách tự khởi động và miễn tối ưu hóa pin để đạt kết quả tốt nhất." },
      { q: "Tin nhắn của tôi có được lưu ở đâu không?", a: "Ứng dụng đọc SMS đến chỉ để chuyển tiếp. Trên backend là chuyển-rồi-quên: nội dung một tin nhắn chỉ tồn tại cho đến khi được gửi đi, sau đó bị xóa, chỉ để lại một nhật ký metadata (kết quả, thời gian, người gửi). Backend do ShuttleLab vận hành và không giữ nội dung tin nhắn nào sau khi gửi. Không quảng cáo, không phân tích, không SDK theo dõi." },
      { q: "Nó có miễn phí không? Tải ở đâu?", a: "SMS Forwarder miễn phí, dùng cho mục đích cá nhân — không quảng cáo, không mua trong ứng dụng. Tải APK từ GitHub và cài trực tiếp. Client Android và server backend nằm ở các kho lưu trữ riêng biệt." },
    ],
    getH2: "Tải SMS Forwarder",
    download: "Tải APK",
    source: "Xem mã nguồn",
    backHome: "Về trang chủ SMS Forwarder",
    keywords: ["chuyển tiếp SMS đến Telegram", "chuyển tin nhắn sang Telegram", "nhận SMS từ xa", "app chuyển tiếp SMS Android", "chuyển tiếp mã xác minh", "chuyển mã OTP qua Telegram", "chuyển mã 2FA sang Telegram", "đọc SMS khi ở nước ngoài", "chuyển tiếp tin nhắn Samsung", "chuyển tiếp tin nhắn Xiaomi", "chuyển tiếp SMS MIUI", "chuyển tiếp tin nhắn OPPO", "chuyển tiếp tin nhắn vivo", "chuyển tiếp tin nhắn OnePlus", "chuyển tiếp tin nhắn Realme", "chuyển tiếp tin nhắn Honor", "chuyển tiếp tin nhắn Huawei", "chuyển tiếp SMS HarmonyOS", "nhận SMS số Việt Nam ở nước ngoài"],
  },
  pt: {
    title: "Encaminhe SMS para o Telegram no Android — Receba mensagens remotamente | SMS Forwarder",
    metaDesc:
      "Encaminhe automaticamente os SMS recebidos para o seu Telegram. O SMS Forwarder é um app Android gratuito e pronto para usar — deixe um celular ligado na tomada em casa e receba códigos de verificação e alertas em qualquer lugar.",
    h1: "Encaminhe SMS para o Telegram no Android: receba suas mensagens em qualquer lugar",
    lead: "O SMS Forwarder é um app Android gratuito que encaminha automaticamente as mensagens de texto que seu celular recebe para o seu Telegram. Ele envia cada SMS ao serviço do SMS Forwarder, que o retransmite ao seu Telegram e depois o esquece — não há servidor para configurar, o app já vem pronto para conectar. Deixe um celular ligado na tomada em casa com o seu SIM e cada código de verificação, alerta do banco ou mensagem da operadora chega a você onde quer que esteja — sem roaming e sem taxas de encaminhamento da operadora.",
    whyH2: "Por que encaminhar SMS para o Telegram?",
    whyParas: [
      "Muitas contas ainda enviam códigos de uso único e alertas por SMS para um número específico. Se esse SIM está num celular em casa, num segundo aparelho ou num número que você mantém para o banco, você não consegue ler essas mensagens quando está fora — e fazer roaming ou trocar de SIM é um transtorno.",
      "Encaminhar esses SMS para o Telegram resolve isso de forma limpa: o Telegram já está no seu celular principal e no notebook, a entrega é instantânea e com notificação push, e as conversas são pesquisáveis. Você deixa o SIM onde está e simplesmente lê as mensagens dele num chat que já acompanha.",
      "É ideal para manter um número antigo ativo, receber códigos de um SIM do seu país de origem enquanto está no exterior ou direcionar os alertas de uma linha corporativa/compartilhada para um lugar que a equipe inteira possa ver.",
    ],
    howH2: "Como o SMS Forwarder entrega suas mensagens",
    howIntro: "O app é um cliente leve — ele captura os SMS e os entrega ao backend do SMS Forwarder, que faz o roteamento:",
    howPoints: [
      "Captura — um receptor de broadcast somado a uma verificação da caixa de entrada de SMS por um serviço em primeiro plano pega cada nova mensagem, usando um cursor de id monotônico para que nada seja pulado, mesmo em ROMs que retêm os broadcasts de SMS.",
      "Envio — cada mensagem é enviada ao backend do SMS Forwarder por HTTPS a partir do serviço ativo em primeiro plano (e não de um agendador em segundo plano que o sistema limita) e reenviada até dar certo.",
      "Retransmissão — o backend entrega ao seu Telegram por meio de um bot compartilhado e então apaga o conteúdo da mensagem; uma chave de idempotência no servidor garante que uma mensagem nunca seja entregue duas vezes.",
    ],
    boundaryH2: "Retransmite e esquece",
    boundaryParas: [
      "O SMS Forwarder não guarda nenhum token do Telegram no app. O backend do SMS Forwarder — operado pela ShuttleLab — retransmite cada mensagem e então apaga o conteúdo; o conteúdo das mensagens fica ali apenas até ser entregue e, depois, é apagado, deixando somente um registro de metadados (resultado, horário, remetente).",
      "O login usa um token por dispositivo que você pode revogar a qualquer momento, e seu vínculo com o Telegram está atrelado à sua conta, de modo que uma mensagem só pode chegar a você. Como o roteamento fica no servidor, novos canais podem ser adicionados lá sem recompilar nem reinstalar o app. Tanto o app quanto o backend são de código aberto.",
    ],
    setupH2: "Como configurar o encaminhamento de SMS para o Telegram",
    setupSteps: [
      { title: "Instale o app", desc: "Baixe o APK do GitHub e instale-o no celular que tem o SIM (Android 8.0 / API 26 ou superior). Na Huawei, desative primeiro o Modo Puro (Pure Mode)." },
      { title: "Faça login e vincule o Telegram", desc: "Crie uma conta, toque em Vincular Telegram, abra o bot e toque em Start. Seu chat está vinculado — sem tokens para copiar e sem servidor para configurar." },
      { title: "Inicie o serviço e mantenha-o ativo", desc: "Conceda as permissões de SMS + notificações e toque em Iniciar. Permita a isenção da otimização de bateria e a inicialização automática para que o sistema mantenha o app rodando num celular ligado na tomada." },
    ],
    signsH2: "O que ele resolve para você",
    signs: [
      "SMS longos / de múltiplas partes são remontados e, se necessário, divididos dentro do limite de tamanho de mensagem do Telegram, para que nada seja cortado.",
      "ROMs agressivas (Samsung, Xiaomi / MIUI / HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) — a captura continua funcionando pela verificação da caixa de entrada onde os broadcasts de SMS são bloqueados.",
      "Reinicializações e encerramentos de processo — o serviço reinicia sozinho ao ligar e a fila de envio sobrevive, então um reinício não perde mensagens.",
    ],
    faqH2: "Perguntas frequentes",
    faqs: [
      { q: "Preciso configurar um servidor?", a: "Não — o backend do SMS Forwarder já está no ar, operado pela ShuttleLab. Instale o app, faça login e vincule o Telegram; não há nada para implantar e nenhum token para colar. O app e o backend são de código aberto." },
      { q: "Para quais apps ele pode encaminhar?", a: "Telegram, por meio de um bot compartilhado. Como o roteamento de canais fica no backend, e não no app, mais destinos podem ser adicionados no servidor sem recompilar o app. Vincular o Telegram é um toque — abra o bot e toque em Start; nenhum token para copiar no celular." },
      { q: "Vai continuar funcionando em celulares Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor ou Huawei / HarmonyOS?", a: "Sim. Em ROMs agressivas (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS), o sistema costuma reter os broadcasts de SMS de apps de terceiros e limitar o trabalho em segundo plano. O SMS Forwarder captura tanto com um receptor de broadcast quanto com a verificação da caixa de entrada por um serviço em primeiro plano, e envia direto do serviço ativo. Adicione-o à lista de inicialização automática e à isenção da otimização de bateria para melhores resultados." },
      { q: "Minhas mensagens ficam armazenadas em algum lugar?", a: "O app lê os SMS recebidos apenas para encaminhá-los. No backend é retransmite e esquece: o conteúdo de uma mensagem fica ali só até ser entregue e, depois, é apagado, deixando apenas um registro de metadados (resultado, horário, remetente). O backend é operado pela ShuttleLab e não mantém nenhum conteúdo de mensagem após a entrega. Não há anúncios, nem análise de dados, nem SDKs de rastreamento." },
      { q: "É grátis? Onde eu baixo?", a: "O SMS Forwarder é gratuito, para uso pessoal — sem anúncios e sem compras dentro do app. Baixe o APK do GitHub e instale-o diretamente. O cliente Android e o servidor de backend são repositórios separados." },
    ],
    getH2: "Baixe o SMS Forwarder",
    download: "Baixar APK",
    source: "Ver código-fonte",
    backHome: "Voltar ao início do SMS Forwarder",
    keywords: ["encaminhar SMS para o Telegram", "SMS para o Telegram", "receber SMS remotamente", "encaminhar SMS Android", "encaminhar código de verificação", "código 2FA no Telegram", "ler SMS no exterior", "encaminhar SMS Samsung", "encaminhar SMS Xiaomi", "encaminhar SMS MIUI", "encaminhar SMS OPPO", "encaminhar SMS vivo", "encaminhar SMS OnePlus", "encaminhar SMS Realme", "encaminhar SMS Honor", "encaminhar SMS Huawei", "encaminhar SMS HarmonyOS", "encaminhar SMS Motorola", "app de encaminhamento de SMS", "receber SMS de outro celular", "redirecionar SMS"],
  },
  es: {
    title: "Reenviar SMS a Telegram en Android — Recibe tus mensajes en remoto | SMS Forwarder",
    metaDesc:
      "Reenvía automáticamente los SMS entrantes a tu Telegram. SMS Forwarder es una app de Android gratuita y lista para usar: deja un teléfono conectado en casa y recibe tus códigos de verificación y alertas en cualquier lugar.",
    h1: "Reenviar SMS a Telegram en Android: recibe tus mensajes en cualquier lugar",
    lead: "SMS Forwarder es una app de Android gratuita que reenvía automáticamente a tu Telegram los mensajes de texto que recibe tu teléfono. Sube cada SMS al servicio de SMS Forwarder, que lo retransmite a tu Telegram y luego lo olvida: no hay servidor que configurar, la app viene lista para conectarse. Deja un teléfono conectado en casa con tu SIM y cada código de verificación, alerta bancaria o mensaje de tu operador te llegará estés donde estés, sin roaming ni tarifas de desvío del operador.",
    whyH2: "¿Por qué reenviar los SMS a Telegram?",
    whyParas: [
      "Muchísimas cuentas todavía envían códigos de un solo uso y alertas por SMS a un número concreto. Si esa SIM está en un teléfono en casa, en un segundo dispositivo o en un número que reservas para el banco, no puedes leer esos mensajes cuando estás fuera, y hacer roaming o cambiar de SIM es un fastidio.",
      "Reenviar esos SMS a Telegram lo resuelve de forma limpia: Telegram ya lo tienes en tu teléfono principal y en tu portátil, la entrega es instantánea y con notificación push, y los chats se pueden buscar. Dejas la SIM donde está y simplemente lees sus mensajes en un chat que ya revisas.",
      "Es ideal para mantener vivo un número antiguo, recibir los códigos de una SIM de tu país mientras estás en el extranjero, o canalizar las alertas de una línea de empresa o compartida hacia un lugar que todo el equipo puede ver.",
    ],
    howH2: "Cómo SMS Forwarder entrega tus mensajes",
    howIntro: "La app es un cliente ligero: captura los SMS y los entrega al backend de SMS Forwarder, que se encarga del enrutamiento:",
    howPoints: [
      "Captura: un receptor de difusión más un sondeo de la bandeja de entrada desde un servicio en primer plano atrapan cada mensaje nuevo usando un cursor de id monótono, para que nada se salte, incluso en ROMs que no entregan las difusiones de SMS.",
      "Subida: cada mensaje se envía al backend de SMS Forwarder por HTTPS desde el servicio en primer plano activo (no desde un planificador en segundo plano que el sistema limita) y se reintenta hasta lograrlo.",
      "Retransmisión: el backend lo entrega a tu Telegram mediante un bot compartido y luego elimina el contenido del mensaje; una clave de idempotencia en el servidor evita que un mensaje se entregue dos veces.",
    ],
    boundaryH2: "Retransmitir y olvidar",
    boundaryParas: [
      "SMS Forwarder no guarda ningún token de Telegram en la app. El backend de SMS Forwarder, operado por ShuttleLab, retransmite cada mensaje y luego elimina su contenido; el contenido de los mensajes reside ahí solo hasta que se entrega, tras lo cual se elimina, dejando únicamente un registro de metadatos (resultado, hora, remitente).",
      "El inicio de sesión usa un token por dispositivo que puedes revocar en cualquier momento, y tu vinculación de Telegram está ligada a tu cuenta, así que un mensaje solo puede llegarte a ti. Como el enrutamiento vive en el servidor, se pueden añadir nuevos canales ahí sin recompilar ni reinstalar la app. Tanto la app como el backend son de código abierto.",
    ],
    setupH2: "Cómo configurar el reenvío de SMS a Telegram",
    setupSteps: [
      { title: "Instala la app", desc: "Descarga el APK desde GitHub e instálalo en el teléfono que tiene la SIM (Android 8.0 / API 26 o superior). En Huawei, desactiva antes el Modo puro." },
      { title: "Inicia sesión y vincula Telegram", desc: "Crea una cuenta, luego pulsa Vincular Telegram, abre el bot y pulsa Iniciar. Tu chat queda enlazado: sin tokens que copiar y sin servidor que configurar." },
      { title: "Inicia el servicio y mantenlo activo", desc: "Concede los permisos de SMS y notificaciones y pulsa Iniciar. Permite la exención de la optimización de batería y el arranque automático para que el sistema lo mantenga en marcha en un teléfono conectado a la corriente." },
    ],
    signsH2: "Lo que resuelve por ti",
    signs: [
      "Los SMS largos o de varias partes se recomponen y, si hace falta, se dividen bajo el límite de longitud de mensaje de Telegram para que nada se corte.",
      "ROMs agresivas (Samsung, Xiaomi / MIUI / HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS): la captura sigue funcionando mediante el sondeo de la bandeja de entrada allí donde se bloquean las difusiones de SMS.",
      "Reinicios y cierres de proceso: el servicio se reinicia solo al arrancar y la cola de subida sobrevive, así que un reinicio no pierde mensajes.",
    ],
    faqH2: "Preguntas frecuentes",
    faqs: [
      { q: "¿Necesito montar un servidor?", a: "No: el backend de SMS Forwarder ya está en marcha, operado por ShuttleLab. Instala la app, inicia sesión y vincula Telegram; no hay nada que desplegar ni ningún token que pegar. La app y el backend son de código abierto." },
      { q: "¿A qué apps puede reenviar?", a: "A Telegram, mediante un bot compartido. Como el enrutamiento de canales vive en el backend y no en la app, se pueden añadir más destinos en el servidor sin recompilar la app. Vincular Telegram es un solo toque: abre el bot y pulsa Iniciar; no hay tokens que copiar en el teléfono." },
      { q: "¿Seguirá funcionando en teléfonos Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor o Huawei / HarmonyOS?", a: "Sí. En ROMs agresivas (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) el sistema suele retener las difusiones de SMS a las apps de terceros y limitar el trabajo en segundo plano. SMS Forwarder captura con un receptor de difusión y, además, con un sondeo de la bandeja de entrada desde un servicio en primer plano, y sube directamente desde el servicio activo. Añádelo a la lista blanca de arranque automático y a la exención de la optimización de batería para obtener los mejores resultados." },
      { q: "¿Se guardan mis mensajes en algún sitio?", a: "La app lee los SMS entrantes solo para reenviarlos. En el backend rige el «retransmitir y olvidar»: el contenido de un mensaje reside solo hasta la entrega y luego se elimina, dejando únicamente un registro de metadatos (resultado, hora, remitente). El backend lo opera ShuttleLab y no conserva ningún contenido de mensajes tras la entrega. No hay anuncios, ni analíticas, ni SDK de rastreo." },
      { q: "¿Es gratis? ¿Dónde lo consigo?", a: "SMS Forwarder es gratis, para uso personal, sin anuncios ni compras dentro de la app. Descarga el APK desde GitHub e instálalo directamente. El cliente de Android y el servidor backend son repositorios separados." },
    ],
    getH2: "Consigue SMS Forwarder",
    download: "Descargar APK",
    source: "Ver código fuente",
    backHome: "Volver al inicio de SMS Forwarder",
    keywords: ["reenviar SMS a Telegram", "bot de SMS a Telegram", "recibir SMS de forma remota", "reenvío de SMS en Android", "reenviar códigos de verificación", "código 2FA a Telegram", "leer SMS en el extranjero", "reenviar SMS Samsung", "reenviar SMS Xiaomi", "reenviar SMS MIUI", "reenviar SMS OPPO", "reenviar SMS vivo", "reenviar SMS OnePlus", "reenviar SMS Realme", "reenviar SMS Honor", "reenviar SMS Huawei", "reenviar SMS HarmonyOS", "reenviar SMS Motorola", "reenviar SMS a otro móvil", "app para reenviar SMS", "recibir SMS en Telegram"],
  },
};

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.en;
  return {
    title: c.title,
    description: c.metaDesc,
    keywords: c.keywords,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
    },
    openGraph: {
      title: c.title,
      description: c.metaDesc,
      siteName: "SMS Forwarder",
      type: "article",
      locale: getOgLocale(locale),
    },
  };
}

export default async function ForwardSmsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale] ?? CONTENT.en;
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

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{locale === "zh" ? "相关指南" : "Related guides"}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <a className="text-primary hover:underline" href={locale === "en" ? "/forward-otp-verification-codes-to-telegram/" : `/${locale}/forward-otp-verification-codes-to-telegram/`}>
              {locale === "zh" ? "把验证码 / OTP 转发到 Telegram" : "Forward OTP & verification codes to Telegram"}
            </a>
          </li>
          <li>
            <a className="text-primary hover:underline" href={locale === "en" ? "/receive-sms-abroad/" : `/${locale}/receive-sms-abroad/`}>
              {locale === "zh" ? "出国收短信:人在国外读国内号码的短信" : "Receive SMS abroad — read your home SIM's texts anywhere"}
            </a>
          </li>
        </ul>
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
