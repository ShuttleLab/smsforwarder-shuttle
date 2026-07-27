import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smsforwarder.shuttlelab.org";
  const lastModified = new Date();
  const paths = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/forward-sms-to-telegram", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/forward-otp-verification-codes-to-telegram", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/receive-sms-abroad", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];
  return paths.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}/`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: { en: `${baseUrl}${path}/`, zh: `${baseUrl}/zh${path}/`, "x-default": `${baseUrl}${path}/` } },
  }));
}
