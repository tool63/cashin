// components/SEO/seoEngine.ts
import { buildMetadata } from "./metadata";
import { detectPageType } from "./pageTypes";
import { buildOrganizationSchema, buildWebsiteSchema } from "./schema";
import { logSeoMetrics } from "./seoAnalytics";
import { countryHreflangMap, defaultLanguage } from "@/app/core/i18n/config";

interface BuildSEOParams {
  route: string;
  title: string;
  description?: string;
  countryCode?: string; // use uppercase ISO 3166-1 alpha-2
  keywords?: string[];
}

/**
 * Ultra-premium SEO engine for corporate SaaS
 */
export async function buildSEO({
  route,
  title,
  description,
  countryCode,
  keywords,
}: BuildSEOParams) {
  const start = Date.now();

  // Validate country / fallback
  const countryKey = countryCode && countryHreflangMap[countryCode.toUpperCase()]
    ? countryCode.toUpperCase()
    : defaultLanguage.toUpperCase();

  // -----------------------------
  // 1️⃣ Build Metadata
  // -----------------------------
  const metadata = buildMetadata({
    title,
    description,
    path: route,
    countryCode: countryKey,
    keywords,
  });

  // -----------------------------
  // 2️⃣ Detect Page Type for structured data / SEO scoring
  // -----------------------------
  const pageType = detectPageType(route);

  // -----------------------------
  // 3️⃣ Build Structured Data
  // -----------------------------
  const structuredData = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    // Additional corporate-level structured data could be added here:
    // e.g., WebPage schema, Offer schema, Product schema
  ];

  // -----------------------------
  // 4️⃣ Log SEO metrics (for enterprise monitoring)
  // -----------------------------
  const generationTime = Date.now() - start;
  logSeoMetrics({
    page: route,
    generationTime,
  });

  return {
    metadata,
    structuredData,
    pageType,
    countryCode: countryKey, // optional, can be used in layout for <html lang>
  };
}
