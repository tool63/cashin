import { SEO_CONFIG } from "./seoConfig";
import { buildMetadata } from "./metadata";
import type { SeoInput } from "./pageTypes";

// ===============================
// 🧠 DEFAULT FALLBACKS
// ===============================
const DEFAULT_TITLE = `${SEO_CONFIG.siteName} | Earn Rewards Online`;

const DEFAULT_DESCRIPTION =
  "Earn rewards, cashback, and money online worldwide.";

// ===============================
// 🧠 MAIN SEO ENGINE (CLEAN)
// ===============================
export function generateSeo(input: SeoInput) {
  const { title, description, path, country, noindex } = input;

  // ===============================
  // 🏷 TITLE ENGINE
  // ===============================
  const finalTitle = title || DEFAULT_TITLE;

  // ===============================
  // 📝 DESCRIPTION ENGINE
  // ===============================
  const finalDescription = description || DEFAULT_DESCRIPTION;

  // ===============================
  // 🚀 SINGLE SOURCE OF TRUTH
  // ===============================
  return buildMetadata({
    title: finalTitle,
    description: finalDescription,
    path,
    country,
    noindex,
  });
}

// ===============================
// 🚀 ENTERPRISE ALIASES
// ===============================
export const buildSeo = generateSeo;
export const createSeo = generateSeo;
export const getSeo = generateSeo;
export const seoEngine = generateSeo;
