import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";

export const dynamic = "force-static";

const PATHS = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/forward-sms-to-telegram", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/forward-otp-verification-codes-to-telegram", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/receive-sms-abroad", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority, changeFrequency } of PATHS) {
    const languages = hreflangAlternates(path);
    for (const locale of locales) {
      entries.push({
        url: canonicalUrl(locale, path),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }
  return entries;
}
