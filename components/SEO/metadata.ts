import { SEO_CONFIG } from "./seoConfig";

type MetadataProps = {
  title?: string;
  description?: string;
  path: string;
  country?: string;
  language?: string;
};

// ===============================
// 🧠 META TITLE ENGINE
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

  // Add country targeting for high-value SEO
  if (country) {
    base = `${base} in ${country.toUpperCase()}`;
  }

  return `${base} | ${SEO_CONFIG.siteName}`;
}

// ===============================
// 🧠 META DESCRIPTION ENGINE
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
// 🔗 CANONICAL URL
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
// 🌐 HREFLANG BUILDER
// ===============================
function generateHreflangTags(path: string, country?: string) {
  const links: {
    rel: string;
    hrefLang: string;
    href: string;
  }[] = [];

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // x-default (GLOBAL)
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: SEO_CONFIG.buildUrl({ path: cleanPath }),
  });

  // Country-based hreflang
  const countries = [
    ...SEO_CONFIG.highValueCountries,
    ...SEO_CONFIG.midValueCountries,
    ...SEO_CONFIG.lowValueCountries,
  ];

  for (const c of countries) {
    const hreflang = SEO_CONFIG.getHreflang(c);

    links.push({
      rel: "alternate",
      hrefLang: hreflang,
      href: SEO_CONFIG.buildUrl({
        path: cleanPath,
        country: c,
      }),
    });
  }

  // Language-based hreflang
  for (const lang of SEO_CONFIG.languages) {
    if (lang === "en") continue;

    links.push({
      rel: "alternate",
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
}: MetadataProps) {
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

  const hreflangs = generateHreflangTags(path, country);

  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical,
      languages: hreflangs.reduce((acc: any, link) => {
        acc[link.hrefLang] = link.href;
        return acc;
      }, {}),
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
