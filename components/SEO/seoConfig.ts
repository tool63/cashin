// components/SEO/seoConfig.ts

export const SEO_CONFIG = {
  siteName: "Cashog" as const,
  siteUrl: "https://cashog.com" as const,
  siteDomain: "cashog.com" as const,
  defaultLocale: "en" as const,
  supportedLocales: ["en", "es", "fr", "de", "it", "pt", "ru", "zh"] as const,
  defaultDescription: "Cashog is a rewards platform where users earn money online.",
  defaultKeywords: ["earn money", "rewards", "paid surveys", "tasks"] as string[],
  primaryKeyword: "earn money online",
  twitterHandle: "@cashog",
  themeColor: "#0a84ff",
  defaultOgImage: "https://images.cashog.com/og-default.png",
  defaultTwitterImage: "https://images.cashog.com/twitter-default.png",
  preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://images.cashog.com", "https://api.cashog.com"] as string[],
  dnsPrefetch: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"] as string[],
  // Removed non-existing prefetch/prerender/modulePreload to fix TS errors
  pwa: {
    enabled: true,
    manifestPath: "/manifest.json",
  },
};
