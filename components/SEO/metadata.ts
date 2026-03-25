import type { Metadata } from "next";
import { SEO_CONFIG } from "./seoConfig";

// ===============================
// 🧠 TYPES
// ===============================
type MetadataProps = {
  title?: string;
  description?: string;
  path: string;
  country?: string;
  language?: string;
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
function generateCanonical({
  path,
  country,
  language,
}: MetadataProps) {
  return SEO_CONFIG.buildUrl({
    path,
    country,
    language,
  });
}

// ===============================
// 🌐 HREFLANG ENGINE (DEDUPED + CLEAN)
// ===============================
function generateHreflangLinks(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const links: { hrefLang: string; href: string }[] = [];

  // x-default
  links.push({
    hrefLang: "x-default",
    href: SEO_CONFIG.buildUrl({ path: cleanPath }),
  });

  // COUNTRIES
  const allCountries = [
    ...SEO_CONFIG.highValueCountries,
    ...SEO_CONFIG.midValueCountries,
    ...SEO_CONFIG.lowValueCountries,
  ];

  const uniqueCountries = Array.from(new Set(allCountries));

  for (const country of uniqueCountries) {
    links.push({
      hrefLang: SEO_CONFIG.getHreflang(country),
      href: SEO_CONFIG.buildUrl({
        path: cleanPath,
        country,
      }),
    });
  }

  // LANGUAGES
  const uniqueLanguages = Array.from(
    new Set(SEO_CONFIG.languages || [])
  );

  for (const lang of uniqueLanguages) {
    if (lang === "en") continue;

    links.push({
      hrefLang: lang,
      href: SEO_CONFIG.buildUrl({
        path: cleanPath,
        language: lang,
      }),
    });
  }

  return links;
}

// ===============================
// 🚀 MAIN METADATA GENERATOR
// ===============================
export function generateMetadata({
  title,
  description,
  path,
  country,
  language,
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
    language,
  });

  const hreflangs = generateHreflangLinks(path);

  // Convert hreflang to Next.js format
  const hreflangMap: Record<string, string> = {};

  hreflangs.forEach((link) => {
    hreflangMap[link.hrefLang] = link.href;
  });

  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical,
      languages: hreflangMap,
    },

    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
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
