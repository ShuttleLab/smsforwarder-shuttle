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
  description: "Free Android app that forwards incoming SMS to your Telegram through your own self-hosted backend. A thin, relay-and-forget client built to keep working on aggressive Chinese ROMs (Huawei / HarmonyOS) — ideal for a phone left plugged in at home.",
  url: "https://smsforwarder.shuttlelab.org",
  downloadUrl: "https://github.com/ShuttleLab/SMSForwarder/releases/latest",
  softwareHelp: "https://smsforwarder.shuttlelab.org/",
  screenshot: [
    "https://smsforwarder.shuttlelab.org/screenshots/1.png",
    "https://smsforwarder.shuttlelab.org/screenshots/2.png",
    "https://smsforwarder.shuttlelab.org/screenshots/3.png",
  ],
  featureList: [
    "Real-time SMS capture (broadcast receiver + foreground-service inbox poll)",
    "Forwards to Telegram via a shared bot (one-tap bind)",
    "Self-hosted backend — channel routing lives on the server",
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

const DESC = "Free Android app that forwards the SMS your phone receives to your Telegram, through your own self-hosted backend. A thin, relay-and-forget client engineered to keep running on aggressive Chinese ROMs — ideal for a phone left plugged in at home.";

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
