import { buildMetadata } from "./metadata";
import { detectPageType } from "./pageTypes";
import { buildOrganizationSchema, buildWebsiteSchema } from "./schema";
import { logSeoMetrics } from "./seoAnalytics";

import { COUNTRY_LANGUAGE_MAP, DEFAULT_COUNTRY, SupportedLanguage } from "@/app/core/detector";

interface BuildSEOParams {
  route: string;                    // Page path e.g., "/how-it-works"
  title: string;                     // Page title
  description?: string;              // Page description
  countryCode?: string;              // Optional ISO country code like "US", "FR"
  keywords?: string[];
}

/**
 * Ultra-premium SEO engine for corporate multi-country SaaS / Reward platforms
 */
export async function buildSEO({
  route,
  title,
  description,
  countryCode,
  keywords,
}: BuildSEOParams) {
  const start = Date.now();

  // -----------------------------
  // 1️⃣ Normalize country & language
  // -----------------------------
  const country = countryCode?.toLowerCase() && COUNTRY_LANGUAGE_MAP[countryCode.toLowerCase()]
    ? countryCode.toLowerCase()
    : DEFAULT_COUNTRY;

  const language: SupportedLanguage = COUNTRY_LANGUAGE_MAP[country] ?? "en";

  // -----------------------------
  // 2️⃣ Build Metadata
  // -----------------------------
  const metadata = buildMetadata({
    title,
    description,
    path: route,
    countryCode: country,
    keywords,
  });

  // -----------------------------
  // 3️⃣ Detect Page Type
  // -----------------------------
  const pageType = detectPageType(route);

  // -----------------------------
  // 4️⃣ Build Structured Data (JSON-LD)
  // -----------------------------
  const structuredData = [
    buildOrganizationSchema({ country }),
    buildWebsiteSchema({ country }),
  ];

  // -----------------------------
  // 5️⃣ Log SEO metrics
  // -----------------------------
  const generationTime = Date.now() - start;

  logSeoMetrics({
    page: route,
    country,
    language,
    pageType: pageType.type,
    generationTime,
  });

  // -----------------------------
  // 6️⃣ Return full SEO object
  // -----------------------------
  return {
    metadata,
    structuredData,
    pageType,
    countryCode: country,
    language,
  };
}
