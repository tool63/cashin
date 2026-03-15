// components/SEO/seoConfig.ts
export const SEO_CONFIG = {
  siteUrl: "https://payup-pi.vercel.app", // Main domain
  siteName: "Cashog", // Corporate site name
  defaultTitle: "Earn Money Online - Cashog",
  defaultDescription:
    "Earn money by completing surveys, installing apps, playing games, and watching videos on Cashog.",
  defaultImage: "/images/og-default.png", // OG image
  defaultOgImage: "/images/og-default.png", // Explicit OG property
  twitterHandle: "@Cashog",
  twitterSite: "@Cashog",
  themeColor: "#2563EB", // Brand color
  defaultKeywords: "cashog, rewards, surveys, apps, games, earn money online", // SEO keywords
};

// Shortcut for BASE_URL (used in robots, sitemap, canonical)
export const BASE_URL = SEO_CONFIG.siteUrl;
