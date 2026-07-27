import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";
import { getOgLocale } from "@/lib/i18n/config";
import { Download, ArrowRight } from "lucide-react";

// Intent-specific GEO landing page: receiving your home-country SIM's SMS while abroad / travelling.
// Distinct angle from the /forward-sms-to-telegram pillar; no HowTo schema / no full setup steps
// (links to the pillar for setup to avoid duplicate content). Inline CONTENT consts are the single
// source for this page's TechArticle + FAQPage JSON-LD.

const BASE = "https://smsforwarder.shuttlelab.org";
const SLUG = "receive-sms-abroad";
const PATH = "/receive-sms-abroad";
const DOWNLOAD_URL = "https://github.com/ShuttleLab/SMSForwarder/releases/latest";
const PILLAR = "forward-sms-to-telegram";
const PUBLISHED = "2026-07-27";

type QA = { q: string; a: string };
type Content = {
  title: string;
  metaDesc: string;
  keywords: string[];
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

const CONTENT: Record<string, Content> = {
  en: {
    title: "Receive SMS Abroad — Read Your Home SIM's Texts While Travelling | SMS Forwarder",
    metaDesc:
      "Travelling or living abroad? Keep your home-country SIM in a phone at home and get its SMS — verification codes, bank alerts — in Telegram anywhere. Free Android app, no roaming.",
    keywords: ["receive SMS abroad", "read home SIM texts while travelling", "get SMS overseas", "receive verification codes abroad", "home country SIM SMS forwarding", "SMS without roaming", "expat SMS forwarding", "travel SMS forwarding"],
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
  },
  zh: {
    title: "出国收短信——人在国外也能读国内号码的短信 | 短信转发",
    metaDesc:
      "出国旅行或常驻海外?把国内 SIM 卡留在家里的手机上,验证码、银行提醒等短信照样推送到你的 Telegram,走到哪收到哪。免费安卓应用,免漫游。",
    keywords: ["出国收短信", "国外收国内短信", "海外收短信", "留学生收短信", "国内号码短信转发", "漫游收短信替代", "出国验证码", "国内验证码转发到国外"],
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
  },
  id: {
    title: "Terima SMS di Luar Negeri — Baca SMS SIM Negara Asal Saat Bepergian | SMS Forwarder",
    metaDesc:
      "Sedang bepergian atau tinggal di luar negeri? Simpan SIM negara asal di ponsel di rumah dan terima SMS-nya — kode verifikasi, notifikasi bank — di Telegram di mana saja. Aplikasi Android gratis, tanpa roaming.",
    keywords: ["terima SMS di luar negeri", "baca SMS SIM Indonesia dari luar negeri", "terima SMS luar negeri", "terima kode verifikasi di luar negeri", "teruskan SMS nomor Indonesia ke luar negeri", "terima SMS tanpa roaming", "SMS untuk perantau", "teruskan SMS saat traveling"],
    h1: "Terima SMS di luar negeri: baca SMS SIM negara asal di mana saja",
    lead: "Saat Anda bepergian atau pindah ke luar negeri, nomor negara asal Anda tetap menerima SMS penting — OTP bank, pemberitahuan pemerintah, info pengiriman, login layanan — tapi SIM-nya tertinggal. SMS Forwarder memungkinkan Anda meninggalkan SIM itu di ponsel yang tercolok di rumah dan membuat setiap pesan didorong ke Telegram Anda, sehingga Anda membacanya di ponsel perjalanan atau laptop di mana pun Anda berada. Tanpa biaya roaming, tanpa gonta-ganti SIM, tanpa biaya penerusan dari operator.",
    whyH2: "Kenapa tidak sekadar roaming atau ganti SIM?",
    whyParas: [
      "Roaming itu mahal dan sering menonaktifkan SMS atau menundanya, sedangkan membawa SIM negara asal secara fisik berarti Anda tak bisa memakai SIM lokal yang lebih murah secara bersamaan tanpa ponsel dual-SIM. Keduanya sama-sama tak membantu begitu Anda sudah tiba dan sebuah login bank butuh kode yang dikirim ke nomor di kampung halaman.",
      "Meninggalkan SIM di rumah dan meneruskan SMS-nya ke Telegram menyiasati semua itu. Nomornya tetap sepenuhnya aktif di jaringan asalnya, dan pesan-pesannya melintas ke Anda lewat internet — melalui Telegram yang sudah Anda pakai — secara instan dan gratis, di SIM lokal atau Wi-Fi apa pun yang kebetulan sedang Anda pakai.",
      "Cara ini juga menyimpan catatan yang bisa dicari: tidak seperti SMS yang lenyap di ponsel yang tak bisa Anda jangkau, setiap pesan yang diteruskan tersimpan di chat Telegram, jadi Anda bisa mencari kembali sebuah kode atau pemberitahuan beberapa hari kemudian.",
    ],
    casesH2: "Cocok untuk siapa",
    cases: [
      "Pelancong dan digital nomad yang butuh OTP bank negara asal saat di luar negeri.",
      "Pelajar dan ekspatriat yang tinggal di luar negeri tapi tetap mengaktifkan nomor negara asal.",
      "Siapa pun yang memakai SIM lokal murah di luar negeri tapi masih harus menerima SMS di nomor utamanya.",
      "Orang yang mempertahankan sebuah nomor di negara lain untuk keluarga, layanan, atau akun.",
    ],
    startH2: "Siapkan sebelum berangkat (atau dari mana saja)",
    startPara:
      "Pasang SMS Forwarder di ponsel yang akan tinggal di rumah bersama SIM, masuk, lalu ikat Telegram dengan satu ketuk — tanpa server, tanpa token. Biarkan ponsel itu tercolok dengan koneksi Wi-Fi yang stabil, izinkan pengecualian optimasi baterai dan auto-start, maka SMS-nya akan sampai ke Telegram Anda ke mana pun Anda pergi.",
    fullGuide: "Panduan setup lengkap",
    faqH2: "Pertanyaan yang sering diajukan",
    faqs: [
      { q: "Apakah saya butuh roaming atau paket khusus?", a: "Tidak. Ponsel di rumah meneruskan lewat koneksi internet normalnya (Wi-Fi atau data SIM), dan Anda menerimanya di Telegram lewat koneksi apa pun yang Anda punya di luar negeri. Tak ada biaya roaming dan tak ada layanan penerusan operator yang terlibat." },
      { q: "Apakah ponsel di rumah harus tetap menyala?", a: "Ya — biarkan ia tercolok dengan SIM terpasang dan koneksi internet yang stabil. Aplikasi berjalan sebagai foreground service, menyala kembali otomatis saat reboot, dan mengantrekan pesan bila koneksi terputus, jadi ia terus mengirim tanpa perlu diawasi." },
      { q: "Apakah kode verifikasi bank masih tiba tepat waktu?", a: "Ya. Kode diunggah dari foreground service yang aktif dan diteruskan ke Telegram dalam hitungan detik — cukup cepat untuk OTP berbatas waktu. Selama ponsel di rumah punya internet dan SIM-nya ada sinyal, kode itu akan mengikuti Anda ke luar negeri." },
      { q: "Apakah data saya privat saat melintasi batas negara?", a: "Aplikasi membaca SMS masuk hanya untuk meneruskannya, lewat HTTPS. Backend menerapkan relay-and-forget: isi pesan hanya bertahan sampai terkirim ke Telegram Anda, lalu dihapus, menyisakan log metadata. Tak ada iklan, tak ada analitik; aplikasi dan backend bersifat open source." },
      { q: "Apakah gratis?", a: "Ya — gratis untuk penggunaan pribadi, tanpa iklan atau pembelian dalam aplikasi. Unduh APK dari GitHub dan pasang di ponsel yang tinggal di rumah." },
    ],
    getH2: "Bawa nomor negara asal Anda ke mana saja",
    download: "Unduh APK",
    backHome: "Beranda SMS Forwarder",
  },
  vi: {
    title: "Nhận SMS khi ở nước ngoài — Đọc tin nhắn của SIM quê nhà khi đi xa | SMS Forwarder",
    metaDesc:
      "Đang du lịch hay sống ở nước ngoài? Để SIM quê nhà trong một điện thoại ở nhà và nhận SMS của nó — mã xác minh, cảnh báo ngân hàng — trên Telegram ở bất cứ đâu. Ứng dụng Android miễn phí, không chuyển vùng.",
    keywords: ["nhận SMS khi ở nước ngoài", "nhận SMS số Việt Nam ở nước ngoài", "đọc SMS ở nước ngoài", "nhận mã xác minh khi ở nước ngoài", "chuyển tiếp SMS số quê nhà", "nhận SMS không cần chuyển vùng", "chuyển tiếp SMS cho du học sinh", "nhận SMS khi đi du lịch"],
    h1: "Nhận SMS khi ở nước ngoài: đọc tin nhắn của SIM quê nhà ở mọi nơi",
    lead: "Khi bạn đi du lịch hay chuyển ra nước ngoài, số điện thoại ở quê nhà vẫn liên tục nhận những SMS quan trọng — OTP ngân hàng, thông báo hành chính, cập nhật giao hàng, đăng nhập dịch vụ — nhưng chiếc SIM thì ở lại. SMS Forwarder cho phép bạn để chiếc SIM đó trong một điện thoại cắm sạc ở nhà và đẩy mọi tin nhắn đến Telegram của bạn, để bạn đọc trên điện thoại du lịch hoặc máy tính dù ở đâu. Không phí chuyển vùng, không tráo SIM, không phí chuyển tiếp của nhà mạng.",
    whyH2: "Vì sao không chỉ chuyển vùng hay tráo SIM?",
    whyParas: [
      "Chuyển vùng thì đắt đỏ và thường tắt hoặc làm chậm SMS, còn mang theo SIM quê nhà bên người nghĩa là bạn không thể dùng một SIM địa phương rẻ hơn cùng lúc nếu không có điện thoại hai SIM. Cả hai cách đều chẳng giúp ích một khi bạn đã hạ cánh mà một lần đăng nhập ngân hàng lại cần mã gửi về số ở quê.",
      "Để SIM ở nhà và chuyển tiếp SMS của nó đến Telegram né được tất cả những chuyện đó. Số điện thoại vẫn hoạt động đầy đủ trên mạng quê nhà, còn tin nhắn của nó thì đi đến bạn qua internet — thông qua Telegram bạn vẫn đang dùng — tức thì và miễn phí, trên bất kỳ SIM địa phương hay Wi-Fi nào bạn đang dùng.",
      "Nó còn lưu một bản ghi tìm kiếm được: khác với một tin nhắn biến mất trên chiếc điện thoại bạn không với tới, mỗi tin nhắn đã chuyển tiếp đều nằm lại trong cuộc trò chuyện Telegram, nên bạn có thể tra lại một mã hay một thông báo sau đó nhiều ngày.",
    ],
    casesH2: "Dành cho ai",
    cases: [
      "Người đi du lịch và dân du mục số cần OTP của ngân hàng quê nhà khi ở nước ngoài.",
      "Du học sinh và người xa xứ sống ở nước ngoài nhưng vẫn giữ một số ở quê nhà.",
      "Bất kỳ ai dùng một SIM địa phương rẻ ở nước ngoài mà vẫn phải nhận tin nhắn trên số chính của mình.",
      "Những người duy trì một số ở nước khác để phục vụ gia đình, dịch vụ hoặc tài khoản.",
    ],
    startH2: "Thiết lập trước khi đi (hoặc từ bất cứ đâu)",
    startPara:
      "Cài SMS Forwarder lên chiếc điện thoại sẽ ở lại nhà cùng chiếc SIM, đăng nhập, và liên kết Telegram chỉ với một chạm — không server, không token. Để chiếc điện thoại đó cắm sạc với kết nối Wi-Fi ổn định, cho phép miễn tối ưu hóa pin và tự khởi động, thì SMS của nó sẽ đến Telegram của bạn dù bạn đi đến đâu.",
    fullGuide: "Hướng dẫn thiết lập đầy đủ",
    faqH2: "Câu hỏi thường gặp",
    faqs: [
      { q: "Tôi có cần chuyển vùng hay một gói cước đặc biệt không?", a: "Không. Chiếc điện thoại ở nhà chuyển tiếp qua kết nối internet bình thường của nó (Wi-Fi hoặc dữ liệu của SIM), còn bạn nhận trên Telegram qua bất kỳ kết nối nào bạn có ở nước ngoài. Không có phí chuyển vùng và không dính đến dịch vụ chuyển tiếp SMS của nhà mạng." },
      { q: "Chiếc điện thoại ở nhà có cần bật liên tục không?", a: "Có — hãy để nó cắm sạc, lắp SIM và kết nối internet ổn định. Ứng dụng chạy như một dịch vụ nền, tự khởi động lại khi bật máy, và xếp hàng đợi tin nhắn nếu mất kết nối, nên nó vẫn tiếp tục gửi mà không cần trông coi." },
      { q: "Mã xác minh ngân hàng có kịp đến không?", a: "Có. Mã được tải lên từ một dịch vụ nền đang chạy và chuyển đến Telegram trong vài giây — đủ nhanh cho OTP có thời hạn. Miễn là chiếc điện thoại ở nhà có internet và SIM có sóng, mã sẽ theo bạn ra nước ngoài." },
      { q: "Dữ liệu của tôi có riêng tư khi đi xuyên biên giới không?", a: "Ứng dụng đọc SMS đến chỉ để chuyển tiếp, qua HTTPS. Backend là chuyển-rồi-quên: nội dung một tin nhắn chỉ tồn tại cho đến khi được gửi đến Telegram của bạn, sau đó bị xóa, chỉ để lại một nhật ký metadata. Không quảng cáo, không phân tích; ứng dụng và backend đều là mã nguồn mở." },
      { q: "Nó có miễn phí không?", a: "Có — miễn phí cho mục đích cá nhân, không quảng cáo hay mua trong ứng dụng. Tải APK từ GitHub và cài lên chiếc điện thoại ở lại nhà." },
    ],
    getH2: "Mang số quê nhà theo bạn",
    download: "Tải APK",
    backHome: "Trang chủ SMS Forwarder",
  },
  pt: {
    title: "Receber SMS no exterior — Leia as mensagens do seu SIM de casa em viagem | SMS Forwarder",
    metaDesc:
      "Viajando ou morando fora? Mantenha o SIM do seu país num celular em casa e receba os SMS dele — códigos de verificação, alertas do banco — no Telegram em qualquer lugar. App Android gratuito, sem roaming.",
    keywords: ["receber SMS no exterior", "receber SMS do Brasil no exterior", "ler SMS morando fora", "receber código de verificação no exterior", "encaminhar SMS do número do país de origem", "receber SMS sem roaming", "SMS para expatriados", "receber SMS viajando"],
    h1: "Receber SMS no exterior: leia as mensagens do seu SIM de casa em qualquer lugar",
    lead: "Quando você viaja ou se muda para o exterior, o número do seu país continua recebendo SMS importantes — OTPs de banco, notificações do governo, atualizações de entrega, logins de serviços — mas o SIM fica para trás. O SMS Forwarder permite deixar esse SIM num celular ligado na tomada em casa e receber cada mensagem no seu Telegram, para lê-la no celular ou notebook de viagem onde quer que você esteja. Sem custos de roaming, sem trocar de SIM e sem taxas de encaminhamento da operadora.",
    whyH2: "Por que não simplesmente fazer roaming ou trocar de SIM?",
    whyParas: [
      "O roaming é caro e muitas vezes desativa ou atrasa o SMS, e carregar fisicamente o seu SIM de casa significa que você não pode usar um SIM local mais barato ao mesmo tempo sem um celular dual-SIM. Nenhuma das duas opções ajuda quando você já desembarcou e um login do banco precisa de um código enviado para um número lá no seu país.",
      "Deixar o SIM em casa e encaminhar os SMS dele para o Telegram contorna tudo isso. O número continua totalmente ativo na rede do seu país, e as mensagens dele chegam a você pela internet — pelo Telegram que você já usa — de forma instantânea e gratuita, em qualquer SIM local ou Wi-Fi que você estiver usando.",
      "Ele também mantém um registro pesquisável: diferentemente de uma mensagem que some num celular que você não consegue alcançar, cada mensagem encaminhada fica no chat do Telegram, então você pode consultar um código ou aviso dias depois.",
    ],
    casesH2: "Para quem é",
    cases: [
      "Viajantes e nômades digitais que precisam do OTP do banco do seu país enquanto estão no exterior.",
      "Estudantes e expatriados morando fora, mas mantendo um número do país de origem ativo.",
      "Qualquer pessoa usando um SIM local barato no exterior que ainda precise receber mensagens no seu número principal.",
      "Quem mantém um número em outro país para família, serviços ou contas.",
    ],
    startH2: "Configure antes de viajar (ou de qualquer lugar)",
    startPara:
      "Instale o SMS Forwarder no celular que vai ficar em casa com o SIM, faça login e vincule o Telegram com um toque — sem servidor, sem token. Deixe esse celular ligado na tomada com uma conexão Wi-Fi estável, permita a isenção da otimização de bateria e a inicialização automática, e os SMS dele chegarão ao seu Telegram aonde quer que você vá.",
    fullGuide: "Guia de configuração completo",
    faqH2: "Perguntas frequentes",
    faqs: [
      { q: "Preciso de roaming ou de um plano especial?", a: "Não. O celular de casa encaminha pela conexão de internet normal dele (Wi-Fi ou os dados do SIM), e você recebe no Telegram por qualquer conexão que tiver no exterior. Não há custos de roaming e nenhum serviço de encaminhamento da operadora envolvido." },
      { q: "O celular de casa precisa ficar ligado?", a: "Sim — deixe-o ligado na tomada, com o SIM inserido e uma conexão de internet estável. O app roda como serviço em primeiro plano, reinicia sozinho ao ligar e coloca as mensagens na fila se a conexão cair, então continua entregando sem supervisão." },
      { q: "Os códigos de verificação do banco ainda chegam a tempo?", a: "Sim. Os códigos são enviados a partir de um serviço ativo em primeiro plano e retransmitidos ao Telegram em segundos — rápido o bastante para OTP com tempo limitado. Enquanto o celular de casa tiver internet e o SIM tiver sinal, o código segue você no exterior." },
      { q: "Meus dados ficam privados ao cruzar fronteiras?", a: "O app lê os SMS recebidos apenas para encaminhá-los, por HTTPS. O backend é retransmite e esquece: o conteúdo de uma mensagem fica ali só até ser entregue ao seu Telegram e, depois, é apagado, deixando um registro de metadados. Sem anúncios, sem análise de dados; o app e o backend são de código aberto." },
      { q: "É grátis?", a: "Sim — gratuito para uso pessoal, sem anúncios ou compras dentro do app. Baixe o APK do GitHub e instale-o no celular que vai ficar em casa." },
    ],
    getH2: "Leve o número do seu país com você",
    download: "Baixar APK",
    backHome: "Início do SMS Forwarder",
  },
  es: {
    title: "Recibir SMS en el extranjero — Lee los mensajes de tu SIM de casa mientras viajas | SMS Forwarder",
    metaDesc:
      "¿De viaje o viviendo en el extranjero? Deja la SIM de tu país en un teléfono en casa y recibe sus SMS —códigos de verificación, alertas bancarias— en Telegram en cualquier lugar. App de Android gratuita, sin roaming.",
    keywords: ["recibir SMS en el extranjero", "leer SMS de mi país estando fuera", "recibir SMS en el exterior", "recibir códigos de verificación en el extranjero", "reenviar SMS de la SIM de mi país", "recibir SMS sin roaming", "reenvío de SMS para expatriados", "recibir SMS viajando", "leer SMS de otro país"],
    h1: "Recibir SMS en el extranjero: lee los mensajes de tu SIM de casa en cualquier lugar",
    lead: "Cuando viajas o te mudas al extranjero, tu número de casa sigue recibiendo SMS importantes —OTP bancarios, avisos oficiales, novedades de envíos, inicios de sesión de servicios—, pero la SIM se queda atrás. SMS Forwarder te permite dejar esa SIM en un teléfono conectado en casa y que cada mensaje se envíe a tu Telegram, para que lo leas en tu teléfono de viaje o en tu portátil estés donde estés. Sin cargos de roaming, sin cambiar de SIM y sin tarifas de desvío del operador.",
    whyH2: "¿Por qué no simplemente hacer roaming o cambiar de SIM?",
    whyParas: [
      "El roaming es caro y a menudo desactiva o retrasa los SMS, y llevar físicamente tu SIM de casa significa que no puedes usar a la vez una SIM local más barata sin un teléfono de doble SIM. Ninguna de las dos opciones ayuda una vez que ya has aterrizado y un inicio de sesión bancario necesita un código enviado a un número de tu país.",
      "Dejar la SIM en casa y reenviar sus SMS a Telegram esquiva todo eso. El número sigue plenamente activo en su red de origen, y sus mensajes viajan hasta ti por internet —a través del Telegram que ya usas— al instante y gratis, con cualquier SIM local o Wi-Fi que tengas a mano.",
      "Además, guarda un registro con búsqueda: a diferencia de un mensaje que se esfuma en un teléfono que no puedes alcanzar, cada mensaje reenviado queda en el chat de Telegram, para que puedas consultar un código o un aviso días después.",
    ],
    casesH2: "Para quién es",
    cases: [
      "Viajeros y nómadas digitales que necesitan el OTP de su banco de casa mientras están en el extranjero.",
      "Estudiantes y expatriados que viven fuera pero mantienen activo un número de su país.",
      "Cualquiera que use una SIM local barata en el extranjero pero que aún deba recibir mensajes en su número principal.",
      "Personas que mantienen un número en otro país para la familia, servicios o cuentas.",
    ],
    startH2: "Configúralo antes de irte (o desde cualquier lugar)",
    startPara:
      "Instala SMS Forwarder en el teléfono que se quedará en casa con la SIM, inicia sesión y vincula Telegram con un solo toque: sin servidor ni token. Deja ese teléfono conectado a la corriente con una conexión Wi-Fi estable, permite la exención de la optimización de batería y el arranque automático, y sus SMS llegarán a tu Telegram vayas donde vayas.",
    fullGuide: "Guía de configuración completa",
    faqH2: "Preguntas frecuentes",
    faqs: [
      { q: "¿Necesito roaming o un plan especial?", a: "No. El teléfono de casa reenvía por su conexión a internet normal (Wi-Fi o los datos de la SIM), y tú recibes en Telegram por la conexión que tengas en el extranjero. No hay cargos de roaming ni interviene ningún servicio de desvío del operador." },
      { q: "¿El teléfono de casa tiene que quedar encendido?", a: "Sí: déjalo conectado a la corriente con la SIM puesta y una conexión a internet estable. La app funciona como servicio en primer plano, se reinicia sola al arrancar y pone los mensajes en cola si se cae la conexión, así que sigue entregando sin supervisión." },
      { q: "¿Llegarán a tiempo los códigos de verificación del banco?", a: "Sí. Los códigos se suben desde un servicio en primer plano activo y se retransmiten a Telegram en segundos, lo bastante rápido para un OTP con tiempo limitado. Mientras el teléfono de casa tenga internet y la SIM tenga señal, el código te sigue al extranjero." },
      { q: "¿Están mis datos protegidos al cruzar fronteras?", a: "La app lee los SMS entrantes solo para reenviarlos, por HTTPS. El backend funciona con «retransmitir y olvidar»: el contenido de un mensaje reside solo hasta que se entrega a tu Telegram, tras lo cual se elimina, dejando un registro de metadatos. Sin anuncios, sin analíticas; la app y el backend son de código abierto." },
      { q: "¿Es gratis?", a: "Sí: gratis para uso personal, sin anuncios ni compras dentro de la app. Descarga el APK desde GitHub e instálalo en el teléfono que se queda en casa." },
    ],
    getH2: "Lleva tu número de casa contigo",
    download: "Descargar APK",
    backHome: "Inicio de SMS Forwarder",
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

export default async function ReceiveSmsAbroadPage({ params }: Props) {
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
