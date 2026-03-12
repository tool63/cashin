// components/SEO/seoEngine.ts
// CASHOG ULTRA-PREMIUM CORPORATE SEO ENGINE

import { cache } from "react";
import { detectPageType, PageTypeResult, isPaginated } from "./pageTypes";
import { buildMetadata, MetadataInput } from "./metadata";
import { buildStructuredData, SchemaInput } from "./schema";
import { buildCanonical, CanonicalOptions } from "./canonical";
import { buildHreflang, HreflangOptions } from "./hreflang";
import { SEO_CONFIG } from "./seoConfig";
import { trackSEOGeneration, SEOAnalytics } from "./seoAnalytics";

/* -------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------- */

export interface SEOInput {
  route: string;
  locale?: string;
  data?: Record<string, any>;
  queryParams?: Record<string, string>;

  title?: string;
  description?: string;
  keywords?: string[];

  customTitle?: string;
  customDescription?: string;

  tags?: string[];

  noindex?: boolean;
  nofollow?: boolean;

  skipSchema?: boolean;
  skipHreflang?: boolean;

  priority?: number;

  openGraph?: Record<string, any>;
  twitter?: Record<string, any>;
}

export interface SEOOutput {
  metadata: Record<string, any>;
  structuredData: object[];
  canonical: string;
  hreflang: Record<string, string>;
  pageType: PageTypeResult;

  metrics?: SEOAnalytics & { seoScore?: number };
  warnings?: string[];
}

/* -------------------------------------------------- */
/* CACHE */
/* -------------------------------------------------- */

const seoCache = new Map<string, SEOOutput>();
const CACHE_TTL = 60 * 60 * 1000;

/* -------------------------------------------------- */
/* KEYWORD EXPANSION */
/* -------------------------------------------------- */

function expandKeywords(base: string[], tags: string[] = []) {
  const set = new Set<string>();

  base.forEach((k) => set.add(k));
  tags.forEach((tag) => {
    set.add(tag);
    set.add(`earn ${tag}`);
    set.add(`${tag} rewards`);
    set.add(`${tag} online`);
    set.add(`${tag} fast`);
  });

  return Array.from(set);
}

/* -------------------------------------------------- */
/* INTELLIGENT LONG-TAIL SEO GENERATOR */
/* -------------------------------------------------- */

function generateLongTailSEO(route: string) {
  const site = SEO_CONFIG.siteName || "Cashog";

  const routes: Record<string, { title: string; description: string }> = {
    "/": {
      title:
        `Earn Money Online Fast | Complete Tasks, Surveys & Games | Get Paid Daily | ${site}`,
      description:
        `${site} is a premium rewards platform where users earn money online by completing surveys, playing games, testing apps, and finishing offers.`,
    },

    "/how-it-works": {
      title:
        `How ${site} Works | Complete Tasks, Play Games & Earn Money Online`,
      description:
        `Learn how ${site} works step-by-step. Complete simple tasks, surveys, and games to earn rewards and withdraw via PayPal, crypto or gift cards.`,
    },

    "/play-games": {
      title:
        `Play Games & Earn Money Online | Get Paid for Gaming | ${site}`,
      description:
        `Play mobile and PC games to earn real money online. ${site} rewards players for completing levels, testing apps and gaming offers.`,
    },

    "/surveys": {
      title:
        `Paid Surveys Online | Earn Cash Completing Surveys | ${site}`,
      description:
        `Complete high-paying surveys and earn real money online. ${site} connects users with top survey providers worldwide.`,
    },
  };

  if (routes[route]) return routes[route];

  /* fallback generator */

  const keyword = route.replace(/\//g, " ").trim();

  const title =
    `Earn Money Online | ${keyword
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} | ${site}`;

  const description =
    `Complete ${keyword} tasks, surveys and offers to earn money online on ${site}.`;

  return { title, description };
}

/* -------------------------------------------------- */
/* SEO SCORE */
/* -------------------------------------------------- */

function calculateSEOScore(metadata: any, schema: object[]) {
  let score = 50;

  const titleLength = metadata.title?.length || 0;
  const descLength = metadata.description?.length || 0;

  if (titleLength >= 40 && titleLength <= 60) score += 15;
  if (descLength >= 120 && descLength <= 160) score += 15;
  if (schema.length > 0) score += 10;
  if (metadata.keywords?.length > 8) score += 10;
  if (metadata.openGraph) score += 10;
  if (metadata.twitter) score += 5;

  return Math.min(score, 100);
}

/* -------------------------------------------------- */
/* MAIN SEO ENGINE */
/* -------------------------------------------------- */

export const buildSEO = cache(async (input: SEOInput): Promise<SEOOutput> => {
  const start = Date.now();

  const {
    route,
    locale = SEO_CONFIG.defaultLocale,
    data = {},
    queryParams = {},

    title,
    description,
    keywords = [],
    tags = [],

    customTitle,
    customDescription,

    skipSchema = false,
    skipHreflang = false,

    noindex = false,
    nofollow = false,

    openGraph,
    twitter,
  } = input;

  const cacheKey = `${route}:${locale}`;

  if (seoCache.has(cacheKey)) {
    return seoCache.get(cacheKey)!;
  }

  const warnings: string[] = [];

  try {
    /* -------------------------------------------------- */
    /* PAGE TYPE */
    /* -------------------------------------------------- */

    const pageType =
      detectPageType(route, queryParams) ||
      ({
        type: "unknown",
        hierarchy: ["unknown"],
        metadata: {},
        matches: null,
      } as PageTypeResult);

    /* -------------------------------------------------- */
    /* CANONICAL */
    /* -------------------------------------------------- */

    const canonicalOptions: CanonicalOptions = {
      includeQuery: false,
      trailingSlash: true,
      lowercase: true,
      secure: true,
      normalizeSlashes: true,
    };

    const canonical = buildCanonical(route, canonicalOptions);

    /* -------------------------------------------------- */
    /* HREFLANG */
    /* -------------------------------------------------- */

    const hreflang = !skipHreflang
      ? buildHreflang(route, {
          includeDefault: true,
          includeXDefault: true,
          locales: [...SEO_CONFIG.supportedLocales],
        } as HreflangOptions)
      : {};

    /* -------------------------------------------------- */
    /* METADATA BASE */
    /* -------------------------------------------------- */

    const metadataInput: MetadataInput = {
      pageType: pageType.type,
      route,
      locale,
      canonical,
      data,
      queryParams,
      noindex,
      nofollow,
      siteName: SEO_CONFIG.siteName,
    };

    let metadata = buildMetadata(metadataInput);

    /* -------------------------------------------------- */
    /* AUTO LONG-TAIL */
    /* -------------------------------------------------- */

    const autoSEO = generateLongTailSEO(route);

    metadata.title =
      customTitle ||
      title ||
      autoSEO.title ||
      SEO_CONFIG.defaultTitle;

    metadata.description =
      customDescription ||
      description ||
      autoSEO.description ||
      SEO_CONFIG.defaultDescription;

    metadata.keywords = expandKeywords(
      [...keywords, ...(SEO_CONFIG.defaultKeywords || [])],
      tags
    );

    if (openGraph) metadata.openGraph = openGraph;
    if (twitter) metadata.twitter = twitter;

    /* -------------------------------------------------- */
    /* STRUCTURED DATA */
    /* -------------------------------------------------- */

    const structuredData = !skipSchema
      ? buildStructuredData({
          pageType: pageType.type,
          route,
          canonical,
          data,
          metadata,
          pageTypeHierarchy: pageType.hierarchy,
        } as SchemaInput)
      : [];

    /* -------------------------------------------------- */
    /* SEO SCORE */
    /* -------------------------------------------------- */

    const seoScore = calculateSEOScore(metadata, structuredData);

    /* -------------------------------------------------- */
    /* METRICS */
    /* -------------------------------------------------- */

    const metrics = trackSEOGeneration({
      pageType: pageType.type,
      generationTime: Date.now() - start,
      metadataSize: JSON.stringify(metadata).length,
      schemaCount: structuredData.length,
      cacheHit: false,
      warnings: warnings.length,
      suggestions: 0,
    });

    const output: SEOOutput = {
      metadata,
      structuredData,
      canonical,
      hreflang,
      pageType,
      metrics: { ...metrics, seoScore },
      warnings,
    };

    seoCache.set(cacheKey, output);

    return output;
  } catch (error) {
    console.error("SEO engine failed:", error);

    return {
      metadata: {
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
      },
      structuredData: [],
      canonical: SEO_CONFIG.siteUrl,
      hreflang: {},
      pageType: {
        type: "unknown",
        hierarchy: ["unknown"],
        metadata: {},
        matches: null,
      },
      warnings: ["SEO generation failed"],
    };
  }
});

export default buildSEO;
