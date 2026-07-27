import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Download, ArrowRight } from "lucide-react";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";
import { getOgLocale } from "@/lib/i18n/config";

// Intent-specific GEO landing page: forwarding OTP / verification / 2FA codes to Telegram.
// Distinct angle from the general /forward-sms-to-telegram pillar (no HowTo schema / no full
// setup steps here — links to the pillar for setup to avoid duplicate content). Inline EN/ZH
// consts are the single source for this page's TechArticle + FAQPage JSON-LD.

const BASE = "https://smsforwarder.shuttlelab.org";
const SLUG = "forward-otp-verification-codes-to-telegram";
const DOWNLOAD_URL = "https://github.com/ShuttleLab/SMSForwarder/releases/latest/download/SMSForwarder.apk";
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
  keywords: string[];
};

const CONTENT: Record<string, Content> = {
  en: {
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
  keywords: ["forward OTP to Telegram", "forward verification codes to Telegram", "2FA code to Telegram", "SMS OTP forwarding", "receive verification codes remotely", "bank OTP forwarding", "one-time passcode to Telegram", "Android OTP forwarder"],
  },
  zh: {
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
  keywords: ["验证码转发", "验证码转发到 Telegram", "OTP 转发", "2FA 转发", "短信验证码转发", "银行验证码转发", "远程收验证码", "安卓验证码转发"],
  },
  id: {
    title: "Teruskan Kode OTP & Verifikasi ke Telegram (Android) | SMS Forwarder",
    metaDesc:
      "Terima kode sekali pakai SMS, 2FA, dan kode verifikasi bank di Telegram seketika. SMS Forwarder adalah aplikasi Android gratis — simpan SIM di ponsel di rumah dan baca setiap kode di mana pun Anda berada.",
    h1: "Teruskan kode OTP & verifikasi ke Telegram",
    lead: "Bank, bursa kripto, WhatsApp, Google, Apple, dan tak terhitung banyaknya layanan masih mengirim kode sekali pakai (OTP) dan kode 2FA lewat SMS ke satu nomor tertentu. Kalau SIM itu ada di ponsel di rumah atau di perangkat kedua, SMS Forwarder mendorong setiap kode ke Telegram Anda begitu ia tiba — jadi Anda bisa masuk dan mengonfirmasi dari mana saja, tanpa membawa-bawa SIM atau membayar roaming.",
    whyH2: "Kenapa mengarahkan kode verifikasi lewat Telegram?",
    whyParas: [
      "Kode sekali pakai tak ada gunanya kalau tiba di ponsel yang tak bisa Anda lihat. Menyimpan nomor khusus untuk urusan bank atau 2FA memang praktik yang baik — tapi hanya jika Anda benar-benar bisa membaca kodenya saat prompt login sedang menunggu. Meneruskannya ke Telegram membuat kode itu jatuh sebagai notifikasi push di ponsel dan laptop yang sudah ada di tangan Anda.",
      "Kecepatan penting untuk OTP: kode biasanya kedaluwarsa dalam satu-dua menit. SMS Forwarder mengunggah setiap pesan dari foreground service yang aktif (bukan tugas latar belakang yang dibatasi) dan backend meneruskannya seketika, jadi kode sampai ke Telegram Anda dalam hitungan detik — cukup cepat untuk mengetiknya sebelum kedaluwarsa.",
      "Cara ini juga lebih andal daripada fitur penerusan SMS bawaan operator, yang banyak jaringan tidak menyediakannya, mengenakan biaya, atau hanya berlaku untuk panggilan suara. Di sini perutean berada di aplikasi + backend, bekerja di operator mana pun, dan menyimpan riwayat setiap kode yang Anda terima yang bisa dicari.",
    ],
    casesH2: "Kasus umum",
    cases: [
      "OTP bank / sekuritas yang terikat pada nomor yang Anda simpan di rumah, dibaca saat Anda di kantor atau sedang bepergian.",
      "Kode 2FA untuk Google, Apple, Microsoft, WhatsApp, Telegram, bursa kripto — dikirim ke perangkat utama Anda.",
      "Nomor bersama atau bisnis yang kode login-nya perlu dilihat seluruh tim, dialirkan ke satu chat.",
      "Menjaga nomor lama atau nomor luar negeri tetap aktif semata untuk menerima SMS verifikasinya.",
    ],
    startH2: "Alirkan kode dalam tiga langkah",
    startPara:
      "Pasang SMS Forwarder di ponsel yang memegang SIM, masuk, lalu ikat Telegram dengan satu ketuk — tak ada server untuk disiapkan dan tak ada token untuk ditempel. Beri izin SMS + notifikasi, izinkan pengecualian optimasi baterai agar aplikasi tetap berjalan, dan setiap kode yang masuk akan diteruskan otomatis.",
    fullGuide: "Panduan setup lengkap",
    faqH2: "Pertanyaan yang sering diajukan",
    faqs: [
      { q: "Secepat apa kode tiba?", a: "Biasanya dalam beberapa detik. Aplikasi mengunggah setiap SMS dari foreground service yang aktif dan backend meneruskannya ke Telegram seketika, cukup cepat untuk memakai OTP yang berbatas waktu sebelum kedaluwarsa. Kecepatan sebenarnya bergantung pada jaringan ponsel." },
      { q: "Apakah aman meneruskan kode verifikasi?", a: "Aplikasi membaca SMS masuk hanya untuk meneruskannya. Backend menerapkan relay-and-forget: isi pesan sebuah kode hanya bertahan sampai terkirim ke Telegram Anda, lalu dihapus, menyisakan log metadata (hasil, waktu, pengirim). Pengikatan Telegram Anda tertaut ke akun Anda, sehingga sebuah kode hanya mungkin sampai kepada Anda, dan token masuk per-perangkat bisa dicabut. Meski begitu, perlakukan Telegram sendiri sebagai hal sensitif — aktifkan kode sandi/2FA Telegram pada akun itu." },
      { q: "Kode dari layanan apa saja yang ditangani?", a: "Layanan apa pun yang mengirim kode lewat SMS — bank, Google/Apple/Microsoft, WhatsApp, bursa kripto, layanan pengiriman dan pemerintah, dan sebagainya. SMS Forwarder meneruskan teks dari setiap SMS yang diterima SIM; tak peduli siapa pengirimnya." },
      { q: "Apakah bekerja di ponsel Xiaomi / Samsung / Huawei?", a: "Ya. Di ROM agresif (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei/HarmonyOS) aplikasi menangkap lewat broadcast receiver sekaligus polling kotak masuk oleh foreground service, jadi kode tetap sampai di tempat sistem memblokir broadcast SMS. Tambahkan ke auto-start + pengecualian optimasi baterai." },
      { q: "Apakah gratis?", a: "Ya — gratis untuk penggunaan pribadi, tanpa iklan, tanpa pembelian dalam aplikasi. Unduh APK dari GitHub; aplikasi dan backend bersifat open source." },
    ],
    getH2: "Jangan pernah melewatkan kode lagi",
    download: "Unduh APK",
    backHome: "Beranda SMS Forwarder",
    keywords: ["teruskan kode OTP ke Telegram", "teruskan kode verifikasi ke Telegram", "kode 2FA ke Telegram", "teruskan OTP SMS", "terima kode verifikasi jarak jauh", "teruskan OTP bank", "kode sekali pakai ke Telegram", "aplikasi penerus OTP Android", "teruskan kode verifikasi SMS"],
  },
  vi: {
    title: "Chuyển tiếp mã OTP & mã xác minh đến Telegram (Android) | SMS Forwarder",
    metaDesc:
      "Nhận mã dùng một lần, mã 2FA và mã xác minh ngân hàng qua SMS ngay trên Telegram. SMS Forwarder là ứng dụng Android miễn phí — để SIM trong một điện thoại ở nhà và đọc mọi mã dù bạn ở đâu.",
    h1: "Chuyển tiếp mã OTP & mã xác minh đến Telegram",
    lead: "Ngân hàng, sàn giao dịch, WhatsApp, Google, Apple và vô số dịch vụ đến nay vẫn gửi mã dùng một lần (OTP) và mã 2FA qua SMS đến một số điện thoại cụ thể. Nếu chiếc SIM đó nằm trong một điện thoại ở nhà hoặc một máy phụ, SMS Forwarder đẩy mỗi mã đến Telegram của bạn ngay khoảnh khắc nó đến — để bạn đăng nhập và xác nhận từ bất cứ đâu, không cần mang theo SIM hay trả phí chuyển vùng.",
    whyH2: "Vì sao nên đưa mã xác minh qua Telegram?",
    whyParas: [
      "Mã dùng một lần trở nên vô dụng nếu nó đến một chiếc điện thoại mà bạn không nhìn thấy. Giữ một số riêng cho ngân hàng hay 2FA là thói quen tốt — nhưng chỉ khi bạn thực sự đọc được mã của nó lúc màn hình đăng nhập đang chờ. Chuyển chúng đến Telegram nghĩa là mã hiện lên dưới dạng thông báo đẩy trên chính chiếc điện thoại và máy tính bạn đang cầm trên tay.",
      "Với OTP, tốc độ là điều quan trọng: mã thường hết hạn trong một hai phút. SMS Forwarder tải mỗi tin nhắn lên từ một dịch vụ nền đang chạy (không phải một tác vụ nền bị bóp) và backend chuyển tiếp ngay lập tức, nên mã đến Telegram của bạn trong vài giây — đủ nhanh để nhập trước khi nó hết hạn.",
      "Nó cũng đáng tin cậy hơn tính năng chuyển tiếp SMS của nhà mạng, thứ mà nhiều mạng không cung cấp, tính phí, hoặc chỉ áp dụng cho thoại. Ở đây việc định tuyến nằm trong ứng dụng + backend, chạy được với mọi nhà mạng, và lưu lại lịch sử tìm kiếm được của mọi mã bạn đã nhận.",
    ],
    casesH2: "Các trường hợp thường gặp",
    cases: [
      "OTP ngân hàng / chứng khoán gắn với một số bạn giữ ở nhà, đọc được khi đang ở cơ quan hay đi công tác.",
      "Mã 2FA cho Google, Apple, Microsoft, WhatsApp, Telegram, các sàn giao dịch — gửi đến thiết bị chính của bạn.",
      "Một số dùng chung hoặc số công ty mà cả nhóm cần thấy mã đăng nhập, dồn về một cuộc trò chuyện.",
      "Giữ một số cũ hoặc số ở nước ngoài còn sống chỉ để nhận SMS xác minh của nó.",
    ],
    startH2: "Cho mã chạy về chỉ trong ba bước",
    startPara:
      "Cài SMS Forwarder lên chiếc điện thoại giữ SIM, đăng nhập, và liên kết Telegram chỉ với một chạm — không server nào phải dựng và không token nào phải dán. Cấp quyền SMS + thông báo, cho phép miễn tối ưu hóa pin để nó luôn chạy, và mọi mã đến đều được chuyển tiếp tự động.",
    fullGuide: "Hướng dẫn thiết lập đầy đủ",
    faqH2: "Câu hỏi thường gặp",
    faqs: [
      { q: "Mã đến nhanh cỡ nào?", a: "Thường trong vài giây. Ứng dụng tải mỗi SMS lên từ một dịch vụ nền đang chạy và backend chuyển ngay đến Telegram, đủ nhanh để dùng OTP có thời hạn trước khi nó hết hạn. Tốc độ thực tế tùy thuộc mạng của điện thoại." },
      { q: "Chuyển tiếp mã xác minh có an toàn không?", a: "Ứng dụng đọc SMS đến chỉ để chuyển tiếp. Backend là chuyển-rồi-quên: nội dung tin nhắn của một mã chỉ tồn tại cho đến khi được gửi đến Telegram của bạn, sau đó bị xóa, chỉ để lại một nhật ký metadata (kết quả, thời gian, người gửi). Liên kết Telegram của bạn được gắn với tài khoản, nên mã chỉ có thể đến được với bạn, và token đăng nhập riêng cho từng thiết bị có thể thu hồi. Tuy vậy, hãy coi chính Telegram là nơi nhạy cảm — bật mật mã/2FA cho Telegram trên tài khoản đó." },
      { q: "Nó xử lý mã của những dịch vụ nào?", a: "Bất kỳ dịch vụ nào gửi mã qua SMS — ngân hàng, Google/Apple/Microsoft, WhatsApp, các sàn giao dịch, dịch vụ giao hàng và dịch vụ công, v.v. SMS Forwarder chuyển tiếp nội dung của mọi SMS mà chiếc SIM nhận được; ai gửi cũng không quan trọng." },
      { q: "Nó có chạy trên điện thoại Xiaomi / Samsung / Huawei không?", a: "Có. Trên các ROM khắt khe (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei/HarmonyOS), nó bắt tin bằng cả bộ nhận broadcast lẫn việc quét hộp thư từ dịch vụ nền, nên mã vẫn về được ở những nơi hệ thống chặn broadcast SMS. Hãy thêm nó vào tự khởi động + miễn tối ưu hóa pin." },
      { q: "Nó có miễn phí không?", a: "Có — miễn phí cho mục đích cá nhân, không quảng cáo, không mua trong ứng dụng. Tải APK từ GitHub; ứng dụng và backend đều là mã nguồn mở." },
    ],
    getH2: "Không bao giờ lỡ một mã nào nữa",
    download: "Tải APK",
    backHome: "Trang chủ SMS Forwarder",
    keywords: ["chuyển mã OTP qua Telegram", "chuyển tiếp mã xác minh đến Telegram", "chuyển mã 2FA sang Telegram", "chuyển tiếp OTP qua SMS", "nhận mã xác minh từ xa", "chuyển mã OTP ngân hàng", "chuyển mã xác minh SMS sang Telegram", "app chuyển tiếp OTP Android"],
  },
  pt: {
    title: "Encaminhe códigos OTP e de verificação para o Telegram (Android) | SMS Forwarder",
    metaDesc:
      "Receba códigos de uso único (OTP), 2FA e códigos de verificação do banco no Telegram na hora. O SMS Forwarder é um app Android gratuito — mantenha o SIM num celular em casa e leia cada código onde quer que você esteja.",
    h1: "Encaminhe códigos OTP e de verificação para o Telegram",
    lead: "Bancos, corretoras, WhatsApp, Google, Apple e inúmeros serviços ainda enviam códigos de uso único (OTP) e códigos 2FA por SMS para um número específico. Se esse SIM está num celular em casa ou num segundo aparelho, o SMS Forwarder envia cada código para o seu Telegram no instante em que ele chega — assim você faz login e confirma de qualquer lugar, sem carregar o SIM e sem pagar roaming.",
    whyH2: "Por que direcionar os códigos de verificação pelo Telegram?",
    whyParas: [
      "Códigos de uso único são inúteis se chegam num celular que você não consegue ver. Manter um número dedicado para o banco ou para o 2FA é uma boa prática — mas só se você realmente conseguir ler os códigos quando uma tela de login estiver esperando. Encaminhá-los para o Telegram faz o código chegar como notificação push no celular e no notebook que você já tem em mãos.",
      "A velocidade importa para o OTP: os códigos costumam expirar em um ou dois minutos. O SMS Forwarder envia cada mensagem a partir de um serviço ativo em primeiro plano (e não de uma tarefa em segundo plano limitada pelo sistema), e o backend a retransmite na hora, então o código chega ao seu Telegram em segundos — rápido o bastante para digitá-lo antes de expirar.",
      "Também é mais confiável do que os recursos de encaminhamento de SMS da operadora, que muitas redes não oferecem, cobram à parte ou aplicam só a chamadas de voz. Aqui o roteamento fica no app + backend, funciona em qualquer operadora e mantém um histórico pesquisável de cada código que você recebeu.",
    ],
    casesH2: "Casos comuns",
    cases: [
      "OTP do banco / da corretora atrelado a um número que você mantém em casa, lido enquanto você está no trabalho ou viajando.",
      "Códigos 2FA do Google, Apple, Microsoft, WhatsApp, Telegram, corretoras — entregues no seu dispositivo principal.",
      "Uma linha compartilhada ou corporativa cujos códigos de login a equipe inteira precisa ver, direcionados para um único chat.",
      "Manter um número antigo ou do exterior ativo apenas para receber seus SMS de verificação.",
    ],
    startH2: "Faça os códigos fluírem em três passos",
    startPara:
      "Instale o SMS Forwarder no celular que tem o SIM, faça login e vincule o Telegram com um toque — sem servidor para configurar e sem token para colar. Conceda as permissões de SMS + notificações, permita a isenção da otimização de bateria para que ele continue rodando, e cada código recebido é encaminhado automaticamente.",
    fullGuide: "Guia de configuração completo",
    faqH2: "Perguntas frequentes",
    faqs: [
      { q: "Em quanto tempo os códigos chegam?", a: "Geralmente em poucos segundos. O app envia cada SMS a partir de um serviço ativo em primeiro plano e o backend o retransmite ao Telegram na hora, rápido o bastante para usar OTP com tempo limitado antes de expirar. A velocidade real depende da rede do celular." },
      { q: "É seguro encaminhar códigos de verificação?", a: "O app lê os SMS recebidos apenas para encaminhá-los. O backend é retransmite e esquece: o conteúdo da mensagem de um código fica ali só até ser entregue ao seu Telegram e, depois, é apagado, deixando um registro de metadados (resultado, horário, remetente). Seu vínculo com o Telegram está atrelado à sua conta, então um código só pode chegar a você, e o token de login por dispositivo é revogável. Ainda assim, trate o próprio Telegram como algo sensível — ative uma senha/2FA do Telegram nessa conta." },
      { q: "De quais serviços ele lida com os códigos?", a: "De qualquer um que envie códigos por SMS — bancos, Google/Apple/Microsoft, WhatsApp, corretoras, serviços de entrega e governamentais e por aí vai. O SMS Forwarder encaminha o texto de cada SMS que o SIM recebe; não importa quem enviou." },
      { q: "Funciona em celulares Xiaomi / Samsung / Huawei?", a: "Sim. Em ROMs agressivas (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei/HarmonyOS), ele captura tanto com um receptor de broadcast quanto com a verificação da caixa de entrada por um serviço em primeiro plano, então os códigos continuam chegando mesmo onde o sistema bloqueia os broadcasts de SMS. Adicione-o à inicialização automática + isenção da otimização de bateria." },
      { q: "É grátis?", a: "Sim — gratuito para uso pessoal, sem anúncios e sem compras dentro do app. Baixe o APK do GitHub; o app e o backend são de código aberto." },
    ],
    getH2: "Nunca mais perca um código",
    download: "Baixar APK",
    backHome: "Início do SMS Forwarder",
    keywords: ["encaminhar OTP para o Telegram", "encaminhar código de verificação para o Telegram", "código 2FA no Telegram", "encaminhar OTP por SMS", "receber código de verificação remotamente", "encaminhar OTP do banco", "código de uso único no Telegram", "app para encaminhar OTP Android"],
  },
  es: {
    title: "Reenviar códigos OTP y de verificación a Telegram (Android) | SMS Forwarder",
    metaDesc:
      "Recibe al instante en Telegram los códigos de un solo uso, 2FA y de verificación bancaria enviados por SMS. SMS Forwarder es una app de Android gratuita: deja la SIM en un teléfono en casa y lee cada código estés donde estés.",
    h1: "Reenviar códigos OTP y de verificación a Telegram",
    lead: "Bancos, exchanges, WhatsApp, Google, Apple e incontables servicios todavía envían contraseñas de un solo uso (OTP) y códigos 2FA por SMS a un número concreto. Si esa SIM está en un teléfono en casa o en un segundo dispositivo, SMS Forwarder envía cada código a tu Telegram en el instante en que llega, para que puedas iniciar sesión y confirmar desde cualquier lugar, sin llevar la SIM encima ni pagar roaming.",
    whyH2: "¿Por qué llevar los códigos de verificación por Telegram?",
    whyParas: [
      "Un código de un solo uso no sirve de nada si llega a un teléfono que no puedes ver. Reservar un número dedicado para el banco o el 2FA es una buena práctica, pero solo si de verdad puedes leer sus códigos cuando una pantalla de inicio de sesión te está esperando. Reenviarlos a Telegram hace que el código aterrice como notificación push en el teléfono y el portátil que ya tienes en la mano.",
      "Para los OTP la velocidad importa: los códigos suelen caducar en uno o dos minutos. SMS Forwarder sube cada mensaje desde un servicio en primer plano activo (no desde una tarea en segundo plano limitada) y el backend lo retransmite de inmediato, así que el código llega a tu Telegram en segundos, a tiempo para escribirlo antes de que caduque.",
      "También es más fiable que las funciones de desvío de SMS del operador, que muchas redes no ofrecen, cobran o aplican solo a la voz. Aquí el enrutamiento vive en la app y el backend, funciona con cualquier operador y guarda un historial con búsqueda de cada código que recibiste.",
    ],
    casesH2: "Casos habituales",
    cases: [
      "OTP del banco o del bróker ligados a un número que dejas en casa, leídos mientras estás en el trabajo o de viaje.",
      "Códigos 2FA de Google, Apple, Microsoft, WhatsApp, Telegram o exchanges, entregados en tu dispositivo principal.",
      "Una línea compartida o de empresa cuyos códigos de inicio de sesión necesita ver todo el equipo, canalizados a un solo chat.",
      "Mantener vivo un número antiguo o del extranjero únicamente para recibir sus SMS de verificación.",
    ],
    startH2: "Haz que los códigos empiecen a llegar en tres pasos",
    startPara:
      "Instala SMS Forwarder en el teléfono que tiene la SIM, inicia sesión y vincula Telegram con un solo toque: sin servidor que configurar ni token que pegar. Concede los permisos de SMS y notificaciones, permite la exención de la optimización de batería para que siga en marcha, y cada código entrante se reenvía automáticamente.",
    fullGuide: "Guía de configuración completa",
    faqH2: "Preguntas frecuentes",
    faqs: [
      { q: "¿Cuánto tardan en llegar los códigos?", a: "Normalmente en pocos segundos. La app sube cada SMS desde un servicio en primer plano activo y el backend lo retransmite a Telegram de inmediato, lo bastante rápido para usar un OTP con tiempo limitado antes de que caduque. La velocidad real depende de la red del teléfono." },
      { q: "¿Es seguro reenviar códigos de verificación?", a: "La app lee los SMS entrantes solo para reenviarlos. El backend funciona con «retransmitir y olvidar»: el contenido del mensaje de un código reside solo hasta que se entrega a tu Telegram, tras lo cual se elimina, dejando un registro de metadatos (resultado, hora, remitente). Tu vinculación de Telegram está ligada a tu cuenta, así que un código solo puede llegarte a ti, y el token de inicio de sesión por dispositivo es revocable. Aun así, trata a Telegram mismo como algo sensible: activa un código de acceso o el 2FA de Telegram en esa cuenta." },
      { q: "¿De qué servicios maneja los códigos?", a: "De cualquiera que envíe códigos por SMS: bancos, Google/Apple/Microsoft, WhatsApp, exchanges, servicios de mensajería y trámites de gobierno, y demás. SMS Forwarder reenvía el texto de cada SMS que recibe la SIM; da igual quién lo haya enviado." },
      { q: "¿Funciona en teléfonos Xiaomi / Samsung / Huawei?", a: "Sí. En ROMs agresivas (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei/HarmonyOS) captura con un receptor de difusión y, además, con un sondeo de la bandeja de entrada desde un servicio en primer plano, así que los códigos siguen llegando allí donde el sistema bloquea las difusiones de SMS. Añádelo al arranque automático y a la exención de la optimización de batería." },
      { q: "¿Es gratis?", a: "Sí: gratis para uso personal, sin anuncios ni compras dentro de la app. Descarga el APK desde GitHub; la app y el backend son de código abierto." },
    ],
    getH2: "No vuelvas a perderte un código",
    download: "Descargar APK",
    backHome: "Inicio de SMS Forwarder",
    keywords: ["reenviar OTP a Telegram", "reenviar códigos de verificación a Telegram", "código 2FA a Telegram", "reenvío de OTP por SMS", "recibir códigos de verificación en remoto", "reenviar código del banco a Telegram", "contraseña de un solo uso a Telegram", "reenviar código de verificación por SMS", "app para reenviar OTP en Android"],
  },
};

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const PATH = "/forward-otp-verification-codes-to-telegram";

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

export default async function ForwardOtpPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale] ?? CONTENT.en;
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
