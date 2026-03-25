import { SEO_CONFIG } from "./seoConfig";
import { getCanonicalUrl } from "./canonical";
import { buildMetadata } from "./metadata";
import type { SeoInput } from "./pageTypes";

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
  const finalTitle =
    title ||
    SEO_CONFIG.defaultTitle ||
    `${SEO_CONFIG.siteName} | Earn Rewards Online`;

  // ===============================
  // 📝 DESCRIPTION ENGINE
  // ===============================
  const finalDescription =
    description ||
    SEO_CONFIG.defaultDescription ||
    "Earn rewards, cashback, and money online worldwide.";

  // ===============================
  // 🔑 KEYWORDS ENGINE
  // ===============================
  const finalKeywords =
    keywords ||
    SEO_CONFIG.defaultKeywords ||
    [
      "earn money online",
      "cashback",
      "rewards",
      "affiliate",
      "online earning",
    ];

  // ===============================
  // 🔗 CANONICAL URL (FIXED CALL)
  // ===============================
  const canonical = getCanonicalUrl({
    path,
    country,
    language,
  });

  // ===============================
  // 🌐 HREFLANG GENERATION
  // ===============================
  const hreflang = SEO_CONFIG.languages.map((lang) => ({
    lang,
    url: SEO_CONFIG.buildUrl({
      path,
      language: lang,
      country: country || SEO_CONFIG.defaultCountry,
    }),
  }));

  // ===============================
  // ⚡ PRIORITY + CHANGE FREQ
  // ===============================
  const priority = SEO_CONFIG.getPriority(path, country);
  const changeFrequency = SEO_CONFIG.getChangeFrequency(country);

  // ===============================
  // 🚫 ROBOTS CONTROL
  // ===============================
  const robots =
    noindex === true
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // ===============================
  // 🚀 FINAL METADATA OBJECT
  // ===============================
  return buildMetadata({
    title: finalTitle,
    description: finalDescription,
    canonical,
    keywords: finalKeywords,
    hreflang,
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
