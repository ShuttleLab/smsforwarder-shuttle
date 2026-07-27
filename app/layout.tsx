import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-sync";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1528" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "SMS Forwarder",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "SMS Forwarding",
  operatingSystem: "Android 8.0+",
  description: "Free Android app that forwards incoming SMS to your Telegram. A thin, relay-and-forget client built to keep working on aggressive ROMs — Samsung, Xiaomi (MIUI/HyperOS), OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS — ideal for a phone left plugged in at home. Ready to use: sign in and go, no server to set up.",
  url: "https://smsforwarder.shuttlelab.org",
  downloadUrl: "https://github.com/ShuttleLab/SMSForwarder/releases/latest/download/SMSForwarder.apk",
  softwareHelp: "https://smsforwarder.shuttlelab.org/",
  screenshot: [
    "https://smsforwarder.shuttlelab.org/screenshots/1.jpg",
    "https://smsforwarder.shuttlelab.org/screenshots/2.jpg",
    "https://smsforwarder.shuttlelab.org/screenshots/3.jpg",
  ],
  featureList: [
    "Real-time SMS capture (broadcast receiver + foreground-service inbox poll)",
    "Forwards to Telegram via a shared bot (one-tap bind)",
    "Ready-to-use backend — channel routing lives on the server, no setup",
    "Reliable delivery with retry and server-side idempotency (no duplicates)",
    "Long-term survival on plugged-in / aggressive-ROM phones",
    "Bilingual (English / 中文), relay-and-forget privacy",
  ],
  isAccessibleForFree: true,
  sameAs: [
    "https://github.com/ShuttleLab/SMSForwarder",
    "https://github.com/ShuttleLab/smsforwarder-api",
  ],
  author: {
    "@type": "Organization",
    name: "ShuttleLab",
    url: "https://shuttlelab.org",
  },
  publisher: {
    "@type": "Organization",
    name: "ShuttleLab",
    url: "https://shuttlelab.org",
  },
  offers: [{ "@type": "Offer", price: "0", priceCurrency: "USD" }],
};

const DESC = "Free Android app that forwards the SMS your phone receives to your Telegram. A thin, relay-and-forget client engineered to keep running on aggressive ROMs — Samsung, Xiaomi, OPPO, vivo, OnePlus, Realme, Honor, Huawei / HarmonyOS — ideal for a phone left plugged in at home. Ready to use, no server setup.";

export const metadata: Metadata = {
  metadataBase: new URL("https://smsforwarder.shuttlelab.org"),
  title: "SMS Forwarder — Forward incoming SMS to Telegram (Android)",
  description: DESC,
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SMS Forwarder — Forward incoming SMS to Telegram (Android)",
    description: DESC,
    siteName: "SMS Forwarder",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMS Forwarder — Forward incoming SMS to Telegram (Android)",
    description: DESC,
  },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "SMS Forwarder" },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          {children}
          <ServiceWorkerRegister />
          <Toaster position="top-center" richColors closeButton duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
