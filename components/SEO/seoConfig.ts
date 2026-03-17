// components/SEO/seoConfig.ts

import {
  SITE_URL,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/app/core/i18n/config";

// ===============================
// 🌐 Types
// ===============================

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteName: string;
  siteUrl: string;
  defaultLanguage: SupportedLanguage;
  supportedLanguages: readonly SupportedLanguage[];
  defaultImage: string;
  twitterHandle: string;
  robots: string;
}

export interface SocialMetadata {
  type: "website" | "article" | "product";
  locale: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  twitterCard: "summary" | "summary_large_image";
  twitterSite: string;
  twitterCreator: string;
}

// ===============================
// 🌐 Default SEO
// ===============================

export const DEFAULT_SEO: SeoMetadata = {
  title: "Cashog - Earn Rewards Online",
  description:
    "Earn money online globally by completing offers, surveys, and tasks. Redeem rewards easily worldwide.",
  keywords: [
    "earn money online",
    "global rewards",
    "paid surveys",
    "earn cash worldwide",
    "reward apps",
    "make money online",
  ],
  author: "Cashog",
  siteName: "Cashog",
  siteUrl: SITE_URL,
  defaultLanguage: DEFAULT_LANGUAGE,
  supportedLanguages: SUPPORTED_LANGUAGES,
  defaultImage: `${SITE_URL}/og-image.jpg`,
  twitterHandle: "@cashog",
  robots: "index, follow",
};

// ===============================
// 📱 Social Defaults
// ===============================

export const DEFAULT_SOCIAL_META: SocialMetadata = {
  type: "website",
  locale: "en_US",
  image: DEFAULT_SEO.defaultImage,
  imageAlt: DEFAULT_SEO.title,
  imageWidth: 1200,
  imageHeight: 630,
  twitterCard: "summary_large_image",
  twitterSite: DEFAULT_SEO.twitterHandle,
  twitterCreator: DEFAULT_SEO.twitterHandle,
};

// ===============================
// 🌍 Country / Locale
// ===============================

export function getLocaleFromCountry(country?: string): string {
  try {
    if (!country) return "en_US";

    const region = country.toUpperCase();
    return `en_${region}`;
  } catch {
    return "en_US";
  }
}

// ===============================
// 🔨 Core Helpers
// ===============================

function normalizePath(path: string = ""): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * 🌍 GLOBAL CANONICAL RULE:
 * - Homepage → example.com
 * - Country → example.com/us
 */
export function generateCanonicalUrl(
  path: string = "",
  country?: string
): string {
  const cleanPath = normalizePath(path);

  // 🌍 GLOBAL (NO country)
  if (!country) {
    return `${SITE_URL}${cleanPath}`;
  }

  // 🌎 COUNTRY PAGE
  return `${SITE_URL}/${country.toLowerCase()}${cleanPath}`;
}

// ===============================
// 🏷 Title & Description
// ===============================

export function generatePageTitle(
  pageTitle?: string,
  country?: string
): string {
  if (!pageTitle) return DEFAULT_SEO.siteName;

  if (!country) {
    return `${pageTitle} | ${DEFAULT_SEO.siteName}`;
  }

  const countryName = getCountryName(country);
  return `${pageTitle} in ${countryName} | ${DEFAULT_SEO.siteName}`;
}

export function generateMetaDescription(
  description?: string,
  country?: string
): string {
  if (!description) return DEFAULT_SEO.description;

  if (!country) return description;

  const countryName = getCountryName(country);
  return description.replace(/global|worldwide/i, `in ${countryName}`);
}

// ===============================
// 🌍 Country Name (ALL WORLD)
// ===============================

export function getCountryName(code: string): string {
  try {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(
        code.toUpperCase()
      ) || code.toUpperCase()
    );
  } catch {
    return code.toUpperCase();
  }
}

// ===============================
// 📦 COMPLETE METADATA (Next.js)
// ===============================

export function getCompleteSeoMetadata(
  path: string,
  country?: string,
  title?: string,
  description?: string,
  image?: string
) {
  const finalTitle = generatePageTitle(title, country);
  const finalDescription = generateMetaDescription(description, country);
  const canonical = generateCanonicalUrl(path, country);

  return {
    title: finalTitle,
    description: finalDescription,

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: DEFAULT_SEO.siteName,
      images: [
        {
          url: image || DEFAULT_SEO.defaultImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: getLocaleFromCountry(country),
      type: "website",
    },

    twitter: {
      card: DEFAULT_SOCIAL_META.twitterCard,
      title: finalTitle,
      description: finalDescription,
      images: [image || DEFAULT_SEO.defaultImage],
    },

    alternates: {
      canonical,
    },

    robots: DEFAULT_SEO.robots,
  };
}

// ===============================
// 🧠 STRUCTURED DATA
// ===============================

export function generateOrganizationSchema(country?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: DEFAULT_SEO.siteName,
    url: generateCanonicalUrl("", country),
    logo: `${SITE_URL}/logo.png`,
  };
}

export function generateWebsiteSchema(country?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: DEFAULT_SEO.siteName,
    url: generateCanonicalUrl("", country),
  };
}

// ===============================
// 🧪 Utilities
// ===============================

export function truncateMeta(text: string, max = 160) {
  return text.length > max ? text.slice(0, max - 3) + "..." : text;
}
