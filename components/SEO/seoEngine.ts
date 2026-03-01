import { detectPageType } from "./pageTypes";
import { buildMetadata } from "./metadata";
import { buildStructuredData } from "./schema";
import { buildCanonical } from "./canonical";
import { buildHreflang } from "./hreflang";
import { SEO_CONFIG } from "./seoConfig";

export interface SEOInput {
  route: string;
  locale?: string;
  data?: Record<string, any>;
}

export interface SEOOutput {
  metadata: Record<string, any>;
  structuredData: object[];
  canonical: string;
  hreflang: Record<string, string>;
  pageType: string;
}

export function buildSEO(input: SEOInput): SEOOutput {
  const {
    route,
    locale = SEO_CONFIG.defaultLocale,
    data = {},
  } = input;

  /**
   * 1️⃣ Detect page type
   * Example: home | offer | blog | auth | dashboard
   */
  const pageType = detectPageType(route);

  /**
   * 2️⃣ Build canonical URL
   */
  const canonical = buildCanonical(route, locale);

  /**
   * 3️⃣ Build hreflang map (multi-language ready)
   */
  const hreflang = buildHreflang(route);

  /**
   * 4️⃣ Build metadata
   */
  const metadata = buildMetadata({
    pageType,
    route,
    locale,
    canonical,
    data,
  });

  /**
   * 5️⃣ Build structured data (JSON-LD)
   */
  const structuredData = buildStructuredData({
    pageType,
    route,
    locale,
    canonical,
    data,
  });

  /**
   * 6️⃣ Optional: noindex handling (dashboard, auth, etc.)
   */
  if (["dashboard", "auth"].includes(pageType)) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return {
    metadata,
    structuredData,
    canonical,
    hreflang,
    pageType,
  };
}
