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
// 🌍 GLOBAL COUNTRY LIST (SHARED)
// ===============================
const ALL_COUNTRIES = [
  "us","gb","ca","au","de","fr","nl","se","ch","no","dk",
  "it","es","fi","ie","at","be",
  "br","mx","pl","pt","tr","ro",
  "in","id","ph","vn","th","eg",
  "pk","bd","ng","ke","za"
];

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
// 🌐 HREFLANG ENGINE (TIER SAFE)
// ===============================
function generateHreflangLinks(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const links: Record<string, string> = {};

  // 🌍 x-default
  links["x-default"] = SEO_CONFIG.buildUrl({ path: cleanPath });

  // 🌎 ALL COUNTRIES (CONTROLLED LIST)
  for (const country of ALL_COUNTRIES) {
    const hreflang = SEO_CONFIG.getHreflang(country);

    links[hreflang] = SEO_CONFIG.buildUrl({
      path: cleanPath,
      country,
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

  const hreflangs = generateHreflangLinks(path);

  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical,
      languages: hreflangs,
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
