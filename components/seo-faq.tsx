// SEO / GEO content for the SMS Forwarder landing page: multi-locale use-cases, a comparison
// table, and an FAQ. Written for AI-search extraction (front-loaded, self-contained,
// concrete answers). The FAQ data is also the source for the FAQPage JSON-LD injected by
// app/[locale]/page.tsx, so visible text and schema text stay identical.

type Bi = Record<string, string>; // always has `en`; may have zh/id/vi/pt/es

export const USE_CASES: Bi[] = [
  {
    en: "Receive verification / 2FA codes while away — leave the phone with your SIM plugged in at home and get every code in Telegram wherever you are.",
    zh: "人在外面也能收验证码 / 2FA——把插着你 SIM 卡的手机放家里，无论身处何地，每条验证码都进你的 Telegram。",
    id: "Terima kode verifikasi / 2FA saat sedang di luar — tinggalkan ponsel berisi SIM Anda tercolok di rumah dan terima setiap kode di Telegram di mana pun Anda berada.",
    vi: "Nhận mã xác minh / 2FA khi đi vắng — để chiếc điện thoại lắp SIM của bạn cắm sạc ở nhà và nhận mọi mã trên Telegram dù bạn ở đâu.",
    pt: "Receba códigos de verificação / 2FA estando fora — deixe o celular com o seu SIM ligado na tomada em casa e receba cada código no Telegram onde quer que você esteja.",
    es: "Recibe códigos de verificación / 2FA cuando estás fuera: deja el teléfono con tu SIM conectado en casa y recibe cada código en Telegram estés donde estés.",
  },
  {
    en: "Keep an old number alive — a second or retired phone forwards its SMS to your main device without carrying it around.",
    zh: "让旧号码继续可用——一台备用机或旧手机把它收到的短信转发到你主力设备，不用随身带着。",
    id: "Jaga nomor lama tetap aktif — ponsel kedua atau ponsel pensiunan meneruskan SMS-nya ke perangkat utama Anda tanpa perlu dibawa-bawa.",
    vi: "Giữ một số cũ còn hoạt động — một máy phụ hoặc điện thoại đã nghỉ hưu chuyển tiếp SMS của nó đến thiết bị chính của bạn mà không phải mang theo bên người.",
    pt: "Mantenha um número antigo ativo — um segundo celular ou um aparelho aposentado encaminha os SMS dele para o seu dispositivo principal, sem precisar carregá-lo por aí.",
    es: "Mantén vivo un número antiguo: un segundo teléfono o uno retirado reenvía sus SMS a tu dispositivo principal sin tener que llevarlo encima.",
  },
  {
    en: "Travelling or abroad — read SMS sent to a home-country SIM without roaming, straight in Telegram.",
    zh: "出差或在国外——不用漫游，也能在 Telegram 里读到发往国内 SIM 的短信。",
    id: "Sedang bepergian atau di luar negeri — baca SMS yang dikirim ke SIM negara asal tanpa roaming, langsung di Telegram.",
    vi: "Đi công tác hay ở nước ngoài — đọc SMS gửi đến một SIM ở quê nhà mà không cần chuyển vùng, ngay trong Telegram.",
    pt: "Viajando ou no exterior — leia os SMS enviados para um SIM do seu país sem roaming, direto no Telegram.",
    es: "De viaje o en el extranjero: lee los SMS enviados a una SIM de tu país sin roaming, directamente en Telegram.",
  },
  {
    en: "Bank, carrier and delivery alerts — funnel transactional SMS to a Telegram chat you actually watch.",
    zh: "银行、运营商、快递通知——把交易类短信汇集到你真正会看的 Telegram 会话。",
    id: "Notifikasi bank, operator, dan pengiriman — alirkan SMS transaksional ke chat Telegram yang benar-benar Anda pantau.",
    vi: "Cảnh báo ngân hàng, nhà mạng và giao hàng — dồn các SMS giao dịch về một cuộc trò chuyện Telegram mà bạn thực sự xem.",
    pt: "Alertas de banco, operadora e entregas — direcione os SMS transacionais para um chat do Telegram que você realmente acompanha.",
    es: "Alertas de banco, operador y mensajería: canaliza los SMS transaccionales hacia un chat de Telegram que de verdad revisas.",
  },
  {
    en: "Works on aggressive ROMs — a plugged-in Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor or Huawei / HarmonyOS device keeps forwarding even where background limits kill naive SMS apps.",
    zh: "适配后台限制严苛的定制 ROM——插电常开的三星、小米、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 也能持续转发，普通短信 App 在这些系统上往往直接失灵。",
    id: "Bekerja di ROM agresif — perangkat Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, atau Huawei / HarmonyOS yang tercolok terus meneruskan bahkan di tempat batasan latar belakang mematikan aplikasi SMS biasa.",
    vi: "Chạy được trên các ROM khắt khe — một chiếc Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor hay Huawei / HarmonyOS cắm sạc thường trực vẫn chuyển tiếp đều, ngay cả nơi giới hạn chạy nền khiến những app SMS thông thường chết đứng.",
    pt: "Funciona em ROMs agressivas — um aparelho Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor ou Huawei / HarmonyOS ligado na tomada continua encaminhando mesmo onde os limites de segundo plano derrubam apps de SMS ingênuos.",
    es: "Funciona en ROMs agresivas: un Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor o Huawei / HarmonyOS conectado a la corriente sigue reenviando incluso donde los límites en segundo plano acaban con las apps de SMS ingenuas.",
  },
];

export const COMPARISON: Record<
  string,
  { heading: string; columns: string[]; rows: string[][] }
> = {
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
  id: {
    heading: "SMS Forwarder vs. cara lain menerima SMS dari jarak jauh",
    columns: ["", "SMS Forwarder", "Penerusan SMS operator", "Aplikasi penerus SMS cloud"],
    rows: [
      ["Open source (aplikasi + backend)", "✓", "tidak berlaku", "biasanya tertutup"],
      ["Isi pesan tidak disimpan (relay-and-forget)", "✓", "tidak berlaku", "sering disimpan"],
      ["Tak ada token channel disimpan di aplikasi", "✓", "tidak berlaku", "bervariasi"],
      ["Mengirim ke Telegram", "✓", "— (hanya ke nomor lain)", "✓"],
      ["Bertahan di ROM agresif (Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, Huawei)", "✓ broadcast + polling", "tidak berlaku", "sering dimatikan"],
      ["Bekerja tanpa dukungan operator / biaya tambahan", "✓", "— (bisa berbayar per SMS)", "✓"],
      ["Gratis", "✓ penggunaan pribadi", "bervariasi", "freemium"],
    ],
  },
  vi: {
    heading: "SMS Forwarder so với các cách khác để nhận tin nhắn từ xa",
    columns: ["", "SMS Forwarder", "Chuyển tiếp SMS của nhà mạng", "App chuyển tiếp SMS đám mây"],
    rows: [
      ["Mã nguồn mở (ứng dụng + backend)", "✓", "không áp dụng", "thường đóng"],
      ["Không giữ lại nội dung tin nhắn (chuyển-rồi-quên)", "✓", "không áp dụng", "thường bị lưu"],
      ["Không lưu token kênh trong ứng dụng", "✓", "không áp dụng", "tùy sản phẩm"],
      ["Gửi đến Telegram", "✓", "— (chỉ đến một số khác)", "✓"],
      ["Trụ được trên ROM khắt khe (Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, Huawei)", "✓ broadcast + quét", "không áp dụng", "thường bị kill"],
      ["Chạy được mà không cần nhà mạng hỗ trợ / phí phụ", "✓", "— (có thể tính phí mỗi SMS)", "✓"],
      ["Miễn phí", "✓ dùng cá nhân", "tùy trường hợp", "freemium"],
    ],
  },
  pt: {
    heading: "SMS Forwarder vs. outras formas de receber suas mensagens remotamente",
    columns: ["", "SMS Forwarder", "Encaminhamento de SMS da operadora", "Apps de encaminhamento de SMS na nuvem"],
    rows: [
      ["Código aberto (app + backend)", "✓", "n/d", "geralmente fechado"],
      ["Conteúdo das mensagens não é retido (retransmite e esquece)", "✓", "n/d", "muitas vezes armazenado"],
      ["Nenhum token de canal armazenado no app", "✓", "n/d", "varia"],
      ["Entrega ao Telegram", "✓", "— (apenas outro número)", "✓"],
      ["Sobrevive a ROMs agressivas (Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, Huawei)", "✓ broadcast + verificação", "n/d", "muitas vezes encerrado"],
      ["Funciona sem suporte da operadora / taxas extras", "✓", "— (pode cobrar por SMS)", "✓"],
      ["Grátis", "✓ uso pessoal", "varia", "freemium"],
    ],
  },
  es: {
    heading: "SMS Forwarder frente a otras formas de recibir tus mensajes en remoto",
    columns: ["", "SMS Forwarder", "Desvío de SMS del operador", "Apps de reenvío de SMS en la nube"],
    rows: [
      ["Código abierto (app + backend)", "✓", "n/d", "normalmente cerrado"],
      ["No conserva el contenido de los mensajes (retransmitir y olvidar)", "✓", "n/d", "a menudo lo almacena"],
      ["No guarda tokens de canal en la app", "✓", "n/d", "varía"],
      ["Entrega a Telegram", "✓", "— (solo a otro número)", "✓"],
      ["Sobrevive a ROMs agresivas (Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, Huawei)", "✓ difusión + sondeo", "n/d", "a menudo lo matan"],
      ["Funciona sin soporte del operador / sin tarifas extra", "✓", "— (puede costar por SMS)", "✓"],
      ["Gratis", "✓ uso personal", "varía", "freemium"],
    ],
  },
};

export const FAQS: { q: Bi; a: Bi }[] = [
  {
    q: {
      en: "What is SMS Forwarder?",
      zh: "短信转发是什么？",
      id: "Apa itu SMS Forwarder?",
      vi: "SMS Forwarder là gì?",
      pt: "O que é o SMS Forwarder?",
      es: "¿Qué es SMS Forwarder?",
    },
    a: {
      en: "SMS Forwarder is a free Android app that captures the text messages your phone receives and forwards them to your Telegram. It is a thin client: it uploads each SMS to the SMS Forwarder backend, which relays it to your Telegram and then deletes the body. It ships ready to use — no server to set up. It is built for a phone left plugged in at home so your SMS — verification codes, bank and carrier alerts — reach you anywhere. Requires Android 8.0 (API 26) or later.",
      zh: "短信转发是一款免费的安卓应用，捕获手机收到的短信并转发到你的 Telegram。它是瘦客户端：把每条短信上传到短信转发后端，由后端转发到你的 Telegram 后再删除正文。开箱即用——无需搭建服务器。它专为「插电放在家里的手机」设计，让验证码、银行与运营商通知等短信随时随地都能找到你。需要 Android 8.0（API 26）及以上。",
      id: "SMS Forwarder adalah aplikasi Android gratis yang menangkap pesan teks yang diterima ponsel Anda dan meneruskannya ke Telegram. Ia sebuah thin client: mengunggah setiap SMS ke backend SMS Forwarder, yang meneruskannya ke Telegram Anda lalu menghapus isinya. Aplikasi hadir siap pakai — tak ada server yang perlu disiapkan. Dirancang untuk ponsel yang ditinggal tercolok di rumah sehingga SMS Anda — kode verifikasi, notifikasi bank dan operator — sampai ke Anda di mana saja. Butuh Android 8.0 (API 26) atau lebih baru.",
      vi: "SMS Forwarder là một ứng dụng Android miễn phí, bắt những tin nhắn mà điện thoại của bạn nhận được và chuyển chúng đến Telegram của bạn. Nó là một client gọn nhẹ: tải mỗi SMS lên backend SMS Forwarder, backend này chuyển nó đến Telegram của bạn rồi xóa nội dung. Ứng dụng xuất xưởng đã sẵn sàng dùng — không cần dựng server. Nó được thiết kế cho một chiếc điện thoại cắm sạc để ở nhà, để SMS của bạn — mã xác minh, cảnh báo ngân hàng và nhà mạng — đến được với bạn ở bất cứ đâu. Yêu cầu Android 8.0 (API 26) trở lên.",
      pt: "O SMS Forwarder é um app Android gratuito que captura as mensagens de texto que seu celular recebe e as encaminha para o seu Telegram. É um cliente leve: envia cada SMS ao backend do SMS Forwarder, que o retransmite ao seu Telegram e então apaga o conteúdo. Ele já vem pronto para usar — sem servidor para configurar. Foi feito para um celular deixado ligado na tomada em casa, para que seus SMS — códigos de verificação, alertas do banco e da operadora — cheguem a você em qualquer lugar. Requer Android 8.0 (API 26) ou superior.",
      es: "SMS Forwarder es una app de Android gratuita que captura los mensajes de texto que recibe tu teléfono y los reenvía a tu Telegram. Es un cliente ligero: sube cada SMS al backend de SMS Forwarder, que lo retransmite a tu Telegram y luego elimina el contenido. Viene listo para usar, sin servidor que configurar. Está pensado para un teléfono dejado conectado en casa, de modo que tus SMS —códigos de verificación, alertas del banco y del operador— te lleguen a cualquier lugar. Requiere Android 8.0 (API 26) o superior.",
    },
  },
  {
    q: {
      en: "Do I need to set up a server?",
      zh: "需要自己搭建服务器吗？",
      id: "Apakah saya perlu menyiapkan server?",
      vi: "Tôi có cần dựng một server không?",
      pt: "Preciso configurar um servidor?",
      es: "¿Necesito montar un servidor?",
    },
    a: {
      en: "No. The SMS Forwarder backend is already running and operated by ShuttleLab — just install the app, sign in, and bind Telegram. There is nothing to deploy and no token to paste. Both the app and the backend are open source, so you can inspect the code.",
      zh: "不需要。短信转发的后端已经在运行、由 ShuttleLab 运营——你只要装上 App、登录、绑定 Telegram 即可，无需部署任何东西、也不用粘贴 token。App 与后端均为开源，源码公开可查。",
      id: "Tidak. Backend SMS Forwarder sudah berjalan dan dioperasikan oleh ShuttleLab — cukup pasang aplikasi, masuk, lalu ikat Telegram. Tak ada yang perlu di-deploy dan tak ada token untuk ditempel. Baik aplikasi maupun backend bersifat open source, jadi Anda bisa memeriksa kodenya.",
      vi: "Không. Backend SMS Forwarder đã chạy sẵn và do ShuttleLab vận hành — chỉ cần cài ứng dụng, đăng nhập và liên kết Telegram. Không có gì phải triển khai và không token nào phải dán. Cả ứng dụng lẫn backend đều là mã nguồn mở, nên bạn có thể kiểm tra mã.",
      pt: "Não. O backend do SMS Forwarder já está no ar e é operado pela ShuttleLab — basta instalar o app, fazer login e vincular o Telegram. Não há nada para implantar e nenhum token para colar. Tanto o app quanto o backend são de código aberto, então você pode inspecionar o código.",
      es: "No. El backend de SMS Forwarder ya está en marcha y lo opera ShuttleLab: solo instala la app, inicia sesión y vincula Telegram. No hay nada que desplegar ni ningún token que pegar. Tanto la app como el backend son de código abierto, así que puedes inspeccionar el código.",
    },
  },
  {
    q: {
      en: "Which channels can it forward to?",
      zh: "能转发到哪些渠道？",
      id: "Ke channel apa saja SMS bisa diteruskan?",
      vi: "Nó có thể chuyển tiếp đến những kênh nào?",
      pt: "Para quais canais ele pode encaminhar?",
      es: "¿A qué canales puede reenviar?",
    },
    a: {
      en: "Telegram, via a shared bot. Because channel routing lives on the backend rather than in the app, more channels can be added server-side without rebuilding or reinstalling the app. Binding your Telegram is one tap — open the bot and press Start; there are no tokens to copy on the phone.",
      zh: "Telegram，通过一个共享 Bot。由于渠道路由在后端而非 App 里，以后要加更多渠道可以在服务端完成，无需重新编译或重装 App。绑定 Telegram 只需一步——打开 Bot 点 Start，手机上不用复制任何 token。",
      id: "Telegram, melalui bot bersama. Karena perutean channel berada di backend dan bukan di aplikasi, lebih banyak channel bisa ditambahkan di sisi server tanpa membangun ulang atau memasang ulang aplikasi. Mengikat Telegram Anda cukup satu ketuk — buka bot dan tekan Start; tak ada token untuk disalin di ponsel.",
      vi: "Telegram, qua một bot dùng chung. Vì việc định tuyến kênh nằm trên backend chứ không phải trong ứng dụng, có thể thêm kênh khác ngay phía server mà không cần biên dịch lại hay cài lại ứng dụng. Liên kết Telegram của bạn chỉ với một chạm — mở bot và nhấn Start; không token nào phải sao chép trên điện thoại.",
      pt: "Telegram, por meio de um bot compartilhado. Como o roteamento de canais fica no backend, e não no app, mais canais podem ser adicionados no servidor sem recompilar nem reinstalar o app. Vincular o seu Telegram é um toque — abra o bot e toque em Start; nenhum token para copiar no celular.",
      es: "A Telegram, mediante un bot compartido. Como el enrutamiento de canales vive en el backend y no en la app, se pueden añadir más canales en el servidor sin recompilar ni reinstalar la app. Vincular tu Telegram es un solo toque: abre el bot y pulsa Iniciar; no hay tokens que copiar en el teléfono.",
    },
  },
  {
    q: {
      en: "Does it work on Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor or Huawei / HarmonyOS?",
      zh: "在三星、小米、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 上能用吗？",
      id: "Apakah bekerja di Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, atau Huawei / HarmonyOS?",
      vi: "Nó có chạy trên Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor hay Huawei / HarmonyOS không?",
      pt: "Funciona em Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor ou Huawei / HarmonyOS?",
      es: "¿Funciona en Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor o Huawei / HarmonyOS?",
    },
    a: {
      en: "Yes — that is a core design goal. On aggressive ROMs (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) the system often withholds SMS broadcasts from third-party apps or freezes background work, which breaks naive forwarders. SMS Forwarder captures with both a broadcast receiver and a foreground-service poll of the SMS inbox (using a monotonic id cursor), and uploads directly from the live service rather than via background schedulers the OS throttles. Add it to the auto-start whitelist and battery-optimization exemption for best results.",
      zh: "能——这正是核心设计目标。三星、小米（MIUI/澎湃）、OPPO、vivo、一加、realme、荣耀、华为 / HarmonyOS 等厂商深度定制的 ROM 常常不给第三方 App 下发短信广播、或冻结后台任务，普通转发工具因此失灵。短信转发同时用广播接收器和前台服务轮询短信库来捕获（基于单调递增的 id 游标），并直接从活着的前台服务上传，而不依赖会被系统限流的后台调度。把它加入自启动白名单并豁免电池优化，效果最佳。",
      id: "Ya — itu justru tujuan desain utamanya. Di ROM agresif (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) sistem kerap menahan broadcast SMS dari aplikasi pihak ketiga atau membekukan kerja latar belakang, yang membuat penerus SMS biasa gagal. SMS Forwarder menangkap dengan broadcast receiver sekaligus polling kotak masuk SMS oleh foreground service (memakai cursor id yang selalu naik), dan mengunggah langsung dari layanan yang aktif alih-alih lewat penjadwal latar belakang yang dibatasi sistem. Tambahkan ke daftar putih auto-start dan pengecualian optimasi baterai untuk hasil terbaik.",
      vi: "Có — đó chính là một mục tiêu thiết kế cốt lõi. Trên các ROM khắt khe (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS), hệ thống thường không phát broadcast SMS cho ứng dụng bên thứ ba hoặc đóng băng tác vụ nền, khiến những công cụ chuyển tiếp thông thường bó tay. SMS Forwarder bắt tin bằng cả bộ nhận broadcast lẫn việc quét hộp thư SMS từ dịch vụ nền (dùng con trỏ id tăng đều), và tải lên trực tiếp từ dịch vụ đang chạy thay vì qua các bộ lập lịch nền bị hệ điều hành bóp. Hãy thêm nó vào danh sách tự khởi động và miễn tối ưu hóa pin để đạt kết quả tốt nhất.",
      pt: "Sim — esse é um objetivo central de projeto. Em ROMs agressivas (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS), o sistema costuma reter os broadcasts de SMS de apps de terceiros ou congelar o trabalho em segundo plano, o que quebra os encaminhadores ingênuos. O SMS Forwarder captura tanto com um receptor de broadcast quanto com a verificação da caixa de entrada por um serviço em primeiro plano (usando um cursor de id monotônico), e envia direto do serviço ativo, em vez de por agendadores em segundo plano que o sistema limita. Adicione-o à lista de inicialização automática e à isenção da otimização de bateria para melhores resultados.",
      es: "Sí, es un objetivo de diseño central. En ROMs agresivas (Samsung, Xiaomi/MIUI/HyperOS, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS) el sistema suele retener las difusiones de SMS a las apps de terceros o congelar el trabajo en segundo plano, lo que hace fallar a los reenviadores ingenuos. SMS Forwarder captura con un receptor de difusión y, además, con un sondeo de la bandeja de entrada de SMS desde un servicio en primer plano (usando un cursor de id monótono), y sube directamente desde el servicio activo en lugar de mediante planificadores en segundo plano que el sistema limita. Añádelo a la lista blanca de arranque automático y a la exención de la optimización de batería para obtener los mejores resultados.",
    },
  },
  {
    q: {
      en: "Are my SMS private? Are they stored anywhere?",
      zh: "短信隐私如何？会被存起来吗？",
      id: "Apakah SMS saya privat? Apakah disimpan di suatu tempat?",
      vi: "SMS của tôi có riêng tư không? Chúng có được lưu ở đâu không?",
      pt: "Meus SMS são privados? Ficam armazenados em algum lugar?",
      es: "¿Son privados mis SMS? ¿Se guardan en algún sitio?",
    },
    a: {
      en: "The app reads incoming SMS only to forward them; it uploads nothing else. The backend is relay-and-forget: a message body lives only until it is delivered to your Telegram, then it is deleted, leaving just a metadata log (result, time, sender). The backend is operated by ShuttleLab and keeps no message bodies after delivery. There are no ads, no analytics, and no tracking SDKs.",
      zh: "App 读取来信仅为转发，不上传其它任何内容。后端是「转发即焚」：正文只在投递到你的 Telegram 之前短暂保留，之后即删，只留一份元数据日志（结果、时间、发件人）。后端由 ShuttleLab 运营，投递后不保留任何正文。没有广告、没有统计、没有追踪 SDK。",
      id: "Aplikasi membaca SMS masuk hanya untuk meneruskannya; ia tidak mengunggah apa pun yang lain. Backend menerapkan relay-and-forget: isi pesan hanya bertahan sampai terkirim ke Telegram Anda, lalu dihapus, menyisakan hanya log metadata (hasil, waktu, pengirim). Backend dioperasikan oleh ShuttleLab dan tidak menyimpan isi pesan setelah terkirim. Tak ada iklan, tak ada analitik, dan tak ada SDK pelacak.",
      vi: "Ứng dụng đọc SMS đến chỉ để chuyển tiếp; nó không tải lên bất cứ thứ gì khác. Backend là chuyển-rồi-quên: nội dung một tin nhắn chỉ tồn tại cho đến khi được gửi đến Telegram của bạn, sau đó bị xóa, chỉ để lại một nhật ký metadata (kết quả, thời gian, người gửi). Backend do ShuttleLab vận hành và không giữ nội dung tin nhắn nào sau khi gửi. Không quảng cáo, không phân tích, không SDK theo dõi.",
      pt: "O app lê os SMS recebidos apenas para encaminhá-los; não envia mais nada. O backend é retransmite e esquece: o conteúdo de uma mensagem fica ali só até ser entregue ao seu Telegram e, depois, é apagado, deixando apenas um registro de metadados (resultado, horário, remetente). O backend é operado pela ShuttleLab e não mantém nenhum conteúdo de mensagem após a entrega. Não há anúncios, nem análise de dados, nem SDKs de rastreamento.",
      es: "La app lee los SMS entrantes solo para reenviarlos; no sube nada más. El backend funciona con «retransmitir y olvidar»: el contenido de un mensaje reside solo hasta que se entrega a tu Telegram, tras lo cual se elimina, dejando únicamente un registro de metadatos (resultado, hora, remitente). El backend lo opera ShuttleLab y no conserva ningún contenido de mensajes tras la entrega. No hay anuncios, ni analíticas, ni SDK de rastreo.",
    },
  },
  {
    q: {
      en: "Will it drain the battery?",
      zh: "耗电吗？",
      id: "Apakah boros baterai?",
      vi: "Nó có hao pin không?",
      pt: "Ele consome muita bateria?",
      es: "¿Consume mucha batería?",
    },
    a: {
      en: "It is meant for a phone kept plugged in, so power is a non-issue in the intended setup. The foreground service polls the SMS inbox on a short, configurable interval (a cheap local database read) and uploads only when a new message arrives. There is an optional silent-audio keep-alive for extra resistance to being killed on aggressive ROMs; leave it off if you prefer.",
      zh: "它是为「插电常开」的手机设计的，所以在预期用法下耗电不是问题。前台服务以较短、可配置的间隔轮询短信库（一次很廉价的本地数据库读取），只有来新短信时才上传。还有一个可选的静音音频保活，用于在严苛 ROM 上更抗被杀；不需要可以关掉。",
      id: "Aplikasi ini ditujukan untuk ponsel yang tetap tercolok, jadi soal daya bukan masalah dalam skenario penggunaan yang dimaksud. Foreground service melakukan polling kotak masuk SMS pada interval singkat yang bisa diatur (sebuah pembacaan basis data lokal yang murah) dan hanya mengunggah saat ada pesan baru tiba. Ada keep-alive audio senyap opsional untuk ketahanan ekstra terhadap dimatikan di ROM agresif; biarkan nonaktif bila Anda mau.",
      vi: "Nó được thiết kế cho một chiếc điện thoại luôn cắm sạc, nên pin không phải là vấn đề trong cách dùng dự kiến. Dịch vụ nền quét hộp thư SMS theo một chu kỳ ngắn, có thể tùy chỉnh (một thao tác đọc cơ sở dữ liệu cục bộ rất nhẹ) và chỉ tải lên khi có tin nhắn mới. Có một tính năng phát âm thanh im lặng giữ máy tùy chọn, giúp chống bị kill tốt hơn trên các ROM khắt khe; nếu không cần, cứ để tắt.",
      pt: "Ele foi feito para um celular mantido ligado na tomada, então o consumo não é um problema no uso previsto. O serviço em primeiro plano verifica a caixa de entrada de SMS num intervalo curto e configurável (uma leitura barata do banco de dados local) e só envia quando chega uma nova mensagem. Há um keep-alive opcional de áudio silencioso para mais resistência a ser encerrado em ROMs agressivas; deixe-o desligado se preferir.",
      es: "Está pensado para un teléfono que se mantiene conectado a la corriente, así que el consumo no es un problema en el uso previsto. El servicio en primer plano sondea la bandeja de entrada de SMS en un intervalo corto y configurable (una lectura barata de la base de datos local) y sube solo cuando llega un mensaje nuevo. Hay un mantenimiento opcional con audio silencioso para resistir mejor los cierres en ROMs agresivas; déjalo desactivado si lo prefieres.",
    },
  },
  {
    q: {
      en: "Is it free? Where do I get it?",
      zh: "免费吗？在哪下载？",
      id: "Apakah gratis? Di mana saya mendapatkannya?",
      vi: "Nó có miễn phí không? Tải ở đâu?",
      pt: "É grátis? Onde eu baixo?",
      es: "¿Es gratis? ¿Dónde lo consigo?",
    },
    a: {
      en: "SMS Forwarder is free, for personal use — no ads, no in-app purchases. You download the APK from GitHub (Actions artifacts or Releases) and install it directly; on Huawei you may need to disable Pure Mode first. The client and the backend server are separate open repositories.",
      zh: "短信转发免费、供个人使用——无广告、无内购。APK 从 GitHub（Actions 产物或 Releases）下载并直接安装；华为上可能需要先关闭「纯净模式」。客户端与后端服务器是两个独立的公开仓库。",
      id: "SMS Forwarder gratis, untuk penggunaan pribadi — tanpa iklan, tanpa pembelian dalam aplikasi. Anda mengunduh APK dari GitHub (artifact Actions atau Releases) dan memasangnya langsung; di Huawei Anda mungkin perlu menonaktifkan Pure Mode terlebih dahulu. Klien dan server backend berada di repositori terbuka yang terpisah.",
      vi: "SMS Forwarder miễn phí, dùng cho mục đích cá nhân — không quảng cáo, không mua trong ứng dụng. Bạn tải APK từ GitHub (artifact của Actions hoặc Releases) và cài trực tiếp; trên Huawei bạn có thể cần tắt Pure Mode trước. Client và server backend là hai kho lưu trữ công khai riêng biệt.",
      pt: "O SMS Forwarder é gratuito, para uso pessoal — sem anúncios e sem compras dentro do app. Você baixa o APK do GitHub (artefatos do Actions ou Releases) e instala diretamente; na Huawei pode ser preciso desativar primeiro o Modo Puro (Pure Mode). O cliente e o servidor de backend são repositórios abertos separados.",
      es: "SMS Forwarder es gratis, para uso personal, sin anuncios ni compras dentro de la app. Descargas el APK desde GitHub (artefactos de Actions o Releases) y lo instalas directamente; en Huawei puede que primero tengas que desactivar el Modo puro. El cliente y el servidor backend son dos repositorios abiertos e independientes.",
    },
  },
  {
    q: {
      en: "How is it different from carrier SMS forwarding or a cloud app?",
      zh: "和运营商短信转移或云端转发 App 有何不同？",
      id: "Apa bedanya dengan penerusan SMS operator atau aplikasi cloud?",
      vi: "Nó khác gì so với chuyển tiếp SMS của nhà mạng hay một app đám mây?",
      pt: "Qual a diferença em relação ao encaminhamento de SMS da operadora ou a um app na nuvem?",
      es: "¿En qué se diferencia del desvío de SMS del operador o de una app en la nube?",
    },
    a: {
      en: "Carrier forwarding (if offered) only re-sends to another phone number and may cost per message; a cloud SMS-forward app routes your texts through someone else's server and often stores them. SMS Forwarder is relay-and-forget and open source: it delivers straight to Telegram, keeps no message bodies after delivery, holds no channel tokens in the app, and is engineered to keep running on aggressive Android ROMs.",
      zh: "运营商转移（若提供）只能转到另一个手机号，且可能按条收费；云端转发 App 会把你的短信经由别人的服务器路由、还常常存起来。短信转发是转发即焚 + 开源：直接投递到 Telegram，投完不留正文，App 内不存渠道 token，并且专门针对严苛的定制 ROM 做了保活。",
      id: "Penerusan operator (bila ditawarkan) hanya mengirim ulang ke nomor ponsel lain dan bisa berbiaya per pesan; aplikasi penerus SMS cloud mengarahkan SMS Anda melalui server orang lain dan sering menyimpannya. SMS Forwarder bersifat relay-and-forget dan open source: mengirim langsung ke Telegram, tidak menyimpan isi pesan setelah terkirim, tidak menyimpan token channel di aplikasi, dan direkayasa agar tetap berjalan di ROM Android yang agresif.",
      vi: "Chuyển tiếp của nhà mạng (nếu có) chỉ gửi lại đến một số điện thoại khác và có thể tính phí mỗi tin nhắn; một app chuyển tiếp SMS đám mây định tuyến tin nhắn của bạn qua server của người khác và thường lưu lại chúng. SMS Forwarder là chuyển-rồi-quên và mã nguồn mở: nó gửi thẳng đến Telegram, không giữ nội dung tin nhắn nào sau khi gửi, không giữ token kênh trong ứng dụng, và được thiết kế để tiếp tục chạy trên các ROM Android khắt khe.",
      pt: "O encaminhamento da operadora (quando oferecido) só reenvia para outro número de telefone e pode cobrar por mensagem; um app de encaminhamento de SMS na nuvem roteia suas mensagens pelo servidor de outra pessoa e muitas vezes as armazena. O SMS Forwarder é retransmite e esquece + código aberto: entrega direto no Telegram, não mantém conteúdo de mensagem após a entrega, não guarda nenhum token de canal no app e foi projetado para continuar rodando em ROMs Android agressivas.",
      es: "El desvío del operador (si se ofrece) solo reenvía a otro número de teléfono y puede costar por mensaje; una app de reenvío de SMS en la nube enruta tus mensajes a través del servidor de otra persona y a menudo los almacena. SMS Forwarder es «retransmitir y olvidar» y de código abierto: entrega directamente a Telegram, no conserva el contenido de los mensajes tras la entrega, no guarda tokens de canal en la app y está diseñado para seguir funcionando en ROMs de Android agresivas.",
    },
  },
];

const USE_HEADING: Bi = {
  en: "When to use SMS Forwarder",
  zh: "什么时候用短信转发",
  id: "Kapan memakai SMS Forwarder",
  vi: "Khi nào nên dùng SMS Forwarder",
  pt: "Quando usar o SMS Forwarder",
  es: "Cuándo usar SMS Forwarder",
};

const FAQ_HEADING: Bi = {
  en: "Frequently asked questions",
  zh: "常见问题",
  id: "Pertanyaan yang sering diajukan",
  vi: "Câu hỏi thường gặp",
  pt: "Perguntas frequentes",
  es: "Preguntas frecuentes",
};

export function SeoFaq({ locale }: { locale: string }) {
  const cmp = COMPARISON[locale] ?? COMPARISON.en;
  const pick = (b: Bi) => b[locale] ?? b.en;

  return (
    <>
      {/* Use cases */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            {pick(USE_HEADING)}
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
            {pick(FAQ_HEADING)}
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
