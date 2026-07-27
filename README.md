<div align="center">
  <h1>SMS Forwarder — Website</h1>
  <p>
    <strong>Marketing &amp; download landing page for SMS Forwarder</strong><br/>
    a free app that forwards incoming SMS to Telegram, by ShuttleLab.
  </p>
  <p>
    🌐 <a href="https://smsforwarder.shuttlelab.org">Forward SMS to Telegram on Android — SMS Forwarder</a>
    &nbsp;·&nbsp;
    📱 Android app: <a href="https://github.com/ShuttleLab/SMSForwarder">ShuttleLab/SMSForwarder</a>
    &nbsp;·&nbsp;
    🔌 Backend: <a href="https://github.com/ShuttleLab/smsforwarder-api">ShuttleLab/smsforwarder-api</a>
  </p>
</div>

> **This repo is just the website.** The SMS Forwarder Android app (Kotlin) lives at
> **[ShuttleLab/SMSForwarder](https://github.com/ShuttleLab/SMSForwarder)** and its backend
> at **[ShuttleLab/smsforwarder-api](https://github.com/ShuttleLab/smsforwarder-api)**.
> Bilingual (English / 中文), static export, deployable anywhere.

## Features

- **Landing page** — hero, feature overview, how-it-works, a dedicated "forward SMS to Telegram" SEO page, and a download call-to-action.
- **SEO / GEO** — per-locale metadata, `hreflang`, sitemap / robots, and JSON-LD (MobileApplication, FAQPage, HowTo, TechArticle).
- **Bilingual** — English and Chinese via URL-based i18n (next-intl).
- **Themeable** — ShuttleLab palette with light / dark / system appearance.

## Run locally

```bash
npm install
npm run dev
```

(During development open `/en` or `/zh` — `/` is promoted to English only in the production build.)

## Build

```bash
npm run build
```

Output is in `out/` — a static export for Cloudflare Pages.

## License

Licensed under the GNU Affero General Public License v3.0 — see [LICENSE](./LICENSE).
