// components/SEO/seoConfig.ts

export const SEO_CONFIG = {
  siteName: "Cashog",
  siteUrl: "https://cashog.com",
  siteDomain: "cashog.com",
  defaultLocale: "en",
  supportedLocales: [
    "en", "es", "fr", "de", "it", "pt", "ru", "ja", "zh"
  ],
  primaryKeyword: "earn money online",
  defaultDescription: "Earn money online completing surveys, tasks, and games.",
  defaultKeywords: ["earn money", "online rewards", "cash", "paid surveys", "online tasks"],
  secondaryKeywords: ["games for money", "app rewards", "task rewards"],

  twitterHandle: "@cashog",
  defaultOgImage: "/og-image.png",
  defaultTwitterImage: "/twitter-image.png",
  themeColor: "#000000",

  preconnect: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://images.cashog.com",
    "https://api.cashog.com"
  ],
  dnsPrefetch: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://images.cashog.com",
    "https://api.cashog.com"
  ],
  prefetch: [] as string[],
  prerender: [] as string[],
  modulePreload: [] as string[],

  pwa: {
    enabled: true,
    manifestPath: "/manifest.json",
    themeColor: "#000000",
    backgroundColor: "#ffffff",
  },
} as const;
