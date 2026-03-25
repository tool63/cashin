import { SEO_CONFIG } from "./seoConfig";
import { getCanonicalUrl } from "./canonical";
import { buildMetadata } from "./metadata";
import type { SeoInput } from "./pageTypes";

// ===============================
// 🧠 DEFAULT FALLBACKS
// ===============================
const DEFAULT_TITLE = `${SEO_CONFIG.siteName} | Earn Rewards Online`;

const DEFAULT_DESCRIPTION =
  "Earn rewards, cashback, and money online worldwide.";

const DEFAULT_KEYWORDS = [
  "earn money online",
  "cashback",
  "rewards",
  "affiliate",
  "online earning",
];

// ===============================
// 🧠 MAIN SEO ENGINE
// ===============================
export function generateSeo(input: SeoInput) {
  const {
    title,
    description,
    keywords,
    path,
    country,
    language,
    noindex,
  } = input;

  // ===============================
  // 🏷 TITLE ENGINE
  // ===============================
  const finalTitle = title || DEFAULT_TITLE;

  // ===============================
  // 📝 DESCRIPTION ENGINE
  // ===============================
  const finalDescription = description || DEFAULT_DESCRIPTION;

  // ===============================
  // 🔑 KEYWORDS ENGINE
  // ===============================
  const finalKeywords = keywords || DEFAULT_KEYWORDS;

  // ===============================
  // 🔗 CANONICAL (FIXED & SAFE)
  // ===============================
  const canonical = getCanonicalUrl({
    path,
    country,
    language,
  });

  // ===============================
  // 🌐 HREFLANG (DEDUPED + CORRECT)
  // ===============================
  const hreflangMap: Record<string, string> = {};

  // x-default
  hreflangMap["x-default"] = SEO_CONFIG.buildUrl({ path });

  // COUNTRY LINKS
  const allCountries = Array.from(
    new Set([
      ...SEO_CONFIG.highValueCountries,
      ...SEO_CONFIG.midValueCountries,
      ...SEO_CONFIG.lowValueCountries,
    ])
  );

  for (const countryCode of allCountries) {
    hreflangMap[SEO_CONFIG.getHreflang(countryCode)] =
      SEO_CONFIG.buildUrl({
        path,
        country: countryCode,
      });
  }

  // LANGUAGE LINKS
  const languages = Array.from(new Set(SEO_CONFIG.languages || []));

  for (const lang of languages) {
    if (lang === "en") continue;

    hreflangMap[lang] = SEO_CONFIG.buildUrl({
      path,
      language: lang,
    });
  }

  // ===============================
  // ⚡ PRIORITY + CHANGE FREQUENCY
  // ===============================
  const priority = SEO_CONFIG.getPriority(path, country);
  const changeFrequency = SEO_CONFIG.getChangeFrequency(country);

  // ===============================
  // 🚫 ROBOTS CONTROL
  // ===============================
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // ===============================
  // 🚀 FINAL METADATA OBJECT
  // ===============================
  return buildMetadata({
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    canonical,
    hreflang: hreflangMap,
    robots,

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
    },

    extra: {
      priority,
      changeFrequency,
    },
  });
}

// ===============================
// 🚀 ENTERPRISE ALIASES (STABLE API)
// ===============================
export const buildSeo = generateSeo;
export const createSeo = generateSeo;
export const getSeo = generateSeo;
export const seoEngine = generateSeo;
