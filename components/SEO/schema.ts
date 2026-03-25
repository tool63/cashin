import { SEO_CONFIG } from "./seoConfig";
import type { PageType } from "./pageTypes";

// ===============================
// 🧠 TYPES
// ===============================
export type SchemaInput = {
  path: string;
  title?: string;
  description?: string;
  url?: string;
  type?: PageType;
};

// ===============================
// 🧠 BASE SCHEMA (WEBSITE)
// ===============================
function baseSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ===============================
// 💰 MONEY SCHEMA (EARN PAGES)
// ===============================
function moneySchema({ url, title }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: title || "Earn Money Online",
    description:
      "Earn money online through surveys, offers, and rewards.",
    url,
  };
}

// ===============================
// 🎯 EARN SCHEMA (TASK PAGES)
// ===============================
function earnSchema({ url, title }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title || "Earn Rewards",
    description:
      "Complete tasks and earn rewards instantly.",
    url,
  };
}

// ===============================
// 🛍 SHOPPING SCHEMA
// ===============================
function shoppingSchema({ url, title }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title || "Shopping Rewards",
    description:
      "Earn cashback and rewards while shopping online.",
    url,
  };
}

// ===============================
// 📚 CONTENT SCHEMA
// ===============================
function contentSchema({ url, title, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
    },
    url,
  };
}

// ===============================
// 🔽 LOW PRIORITY SCHEMA
// ===============================
function defaultSchema({ url, title }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title || SEO_CONFIG.siteName,
    url,
  };
}

// ===============================
// 🧠 SCHEMA ENGINE (CORE)
// ===============================
function generateSchema(input: SchemaInput) {
  const { path, title, description, url } = input;

  const finalUrl = url || `${SEO_CONFIG.baseUrl}${path}`;

  const type = input.type || SEO_CONFIG.getPageType(path);

  switch (type) {
    case "money":
      return moneySchema({ ...input, url: finalUrl });
    case "earn":
      return earnSchema({ ...input, url: finalUrl });
    case "shopping":
      return shoppingSchema({ ...input, url: finalUrl });
    case "content":
      return contentSchema({ ...input, url: finalUrl });
    default:
      return defaultSchema({ ...input, url: finalUrl });
  }
}

// ===============================
// 🚀 JSON-LD WRAPPER
// ===============================
export function generateJsonLd(input: SchemaInput) {
  const schema = generateSchema(input);

  return {
    type: "application/ld+json",
    innerHTML: JSON.stringify(schema),
  };
}

// ===============================
// 🚀 MULTI-SCHEMA COMBINER
// ===============================
export function generateSchemas(input: SchemaInput) {
  const base = baseSchema(
    input.url || `${SEO_CONFIG.baseUrl}${input.path}`
  );

  const specific = generateSchema(input);

  return [base, specific];
}

// ===============================
// 🚀 ALIASES (ENTERPRISE PATTERN)
// ===============================
export const buildSchema = generateSchema;
export const getSchema = generateSchema;
export const createSchema = generateSchema;
export const schemaEngine = generateSchema;
