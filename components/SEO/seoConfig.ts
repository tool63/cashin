// components/SEO/seoConfig.ts

/**
 * Global SEO configuration
 * Used across metadata, sitemap, robots, canonical, and hreflang
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://payup-pi.vercel.app";

export const SEO_CONFIG = {
  siteUrl: SITE_URL,
  siteName: "Cashog",

  /**
   * Default SEO
   */
  defaultTitle: "Earn Money Online | Cashog",
  titleTemplate: "%s | Cashog",

  defaultDescription:
    "Earn real money online by completing surveys, installing apps, playing games, and watching videos on Cashog.",

  /**
   * Keywords
   */
  defaultKeywords: [
    "cashog",
    "earn money online",
    "paid surveys",
    "reward apps",
    "get paid for games",
    "online rewards platform",
  ],

  /**
   * Images
   */
  defaultImage: "/images/og-default.png",
  defaultOgImage: "/images/og-default.png",

  /**
   * Social
   */
  twitterHandle: "@Cashog",
  twitterSite: "@Cashog",

  /**
   * Brand color
   */
  themeColor: "#2563EB",

  /**
   * Robots defaults
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /**
   * Organization Schema
   */
  organization: {
    name: "Cashog",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
  },

  /**
   * OpenGraph defaults
   */
  openGraph: {
    type: "website",
    locale: "en_US",
  },
};

/**
 * BASE URL
 */
export const BASE_URL = SEO_CONFIG.siteUrl;
