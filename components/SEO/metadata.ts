import type { Metadata } from "next";
import { SEO_CONFIG } from "./seoConfig";
import { getCanonicalUrl } from "./canonical";

// ===============================
// 🧠 TYPES
// ===============================
type MetadataProps = {
  title?: string;
  description?: string;
  path: string;
  country?: string;
  noindex?: boolean;
};

// ===============================
// 🧠 TITLE ENGINE
// ===============================
function generateTitle({
  title,
  path,
  country,
}: {
  title?: string;
  path: string;
  country?: string;
}) {
  if (title) return title;

  const type = SEO_CONFIG.getPageType(path);

  const baseTitles: Record<string, string> = {
    money: "Earn Money Online",
    earn: "Make Money Fast Online",
    shopping: "Shopping Rewards & Cashback",
    content: "Guides & Insights",
    low: "Online Rewards Platform",
  };

  let base = baseTitles[type] || "Earn Rewards Online";

  if (country) {
    base = `${base} in ${country.toUpperCase()}`;
  }

  return `${base} | ${SEO_CONFIG.siteName}`;
}

// ===============================
// 🧠 DESCRIPTION ENGINE
// ===============================
function generateDescription({
  description,
  path,
  country,
}: {
  description?: string;
  path: string;
  country?: string;
}) {
  if (description) return description;

  const type = SEO_CONFIG.getPageType(path);

  const descriptions: Record<string, string> = {
    money:
      "Start earning money online with surveys, offers, games, and cashback rewards.",
    earn:
      "Complete tasks, play games, and earn real rewards online instantly.",
    shopping:
      "Get cashback, discounts, and rewards while shopping online.",
    content:
      "Learn strategies to maximize your online earnings.",
    low:
      "Join and start earning rewards worldwide.",
  };

  let desc = descriptions[type] || descriptions.low;

  if (country) {
    desc += ` Available in ${country.toUpperCase()}.`;
  }

  return desc;
}

// ===============================
// 🔗 CANONICAL
// ===============================
function generateCanonical(props: MetadataProps): string {
  return getCanonicalUrl({
    path: props.path,
    country: props.country,
  });
}

// ===============================
// 🌐 HREFLANG (COUNTRY ONLY)
// ===============================
function generateHreflangLinks(path: string, country?: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const links: Record<string, string> = {};

  // x-default (global)
  links["x-default"] = SEO_CONFIG.buildUrl({ path: cleanPath });

  // COUNTRIES ONLY
  const countries = Array.from(
    new Set([
      ...SEO_CONFIG.highValueCountries,
      ...SEO_CONFIG.midValueCountries,
      ...SEO_CONFIG.lowValueCountries,
    ])
  );

  for (const c of countries) {
    const hreflang = SEO_CONFIG.getHreflang(c);

    links[hreflang] = SEO_CONFIG.buildUrl({
      path: cleanPath,
      country: c,
    });
  }

  return links;
}

// ===============================
// 🚀 MAIN METADATA
// ===============================
export function generateMetadata({
  title,
  description,
  path,
  country,
  noindex,
}: MetadataProps): Metadata {
  const metaTitle = generateTitle({ title, path, country });

  const metaDescription = generateDescription({
    description,
    path,
    country,
  });

  const canonical = generateCanonical({
    path,
    country,
  });

  const hreflangs = generateHreflangLinks(path, country);

  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical,
      languages: hreflangs, // 👈 OK because it's hreflang map, NOT language system
    },

    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

// ===============================
// 🚀 ALIASES
// ===============================
export const buildMetadata = generateMetadata;
export const createMetadata = generateMetadata;
export const getMetadata = generateMetadata;
export const seoMetadata = generateMetadata;
