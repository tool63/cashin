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
  breadcrumbs?: { name: string; url: string }[];
  faq?: { question: string; answer: string }[];
  reviews?: { author: string; reviewBody: string; rating: number }[];
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
function moneySchema({ url, title, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: title || "Earn Money Online",
    description:
      description || "Earn money online through surveys, offers, and rewards.",
    url,
  };
}

// ===============================
// 🎯 EARN SCHEMA (TASK PAGES)
// ===============================
function earnSchema({ url, title, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title || "Earn Rewards",
    description:
      description || "Complete tasks and earn rewards instantly.",
    url,
  };
}

// ===============================
// 🛍 SHOPPING SCHEMA
// ===============================
function shoppingSchema({ url, title, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title || "Shopping Rewards",
    description:
      description || "Earn cashback and rewards while shopping online.",
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
    headline: title || SEO_CONFIG.siteName,
    description: description || "",
    author: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
    },
    url,
  };
}

// ===============================
// 📂 FAQ SCHEMA (Optional)
// ===============================
function faqSchema(faq: SchemaInput["faq"]) {
  if (!faq || faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ===============================
// ⭐ REVIEW SCHEMA (Optional)
// ===============================
function reviewSchema(reviews: SchemaInput["reviews"], url: string) {
  if (!reviews || reviews.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    url,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
}

// ===============================
// 📌 BREADCRUMB SCHEMA (Optional)
// ===============================
function breadcrumbSchema(breadcrumbs: SchemaInput["breadcrumbs"], url: string) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.url || url,
    })),
  };
}

// ===============================
// 🧠 SCHEMA ENGINE
// ===============================
function generateSchema(input: SchemaInput) {
  const { path, url, type, faq, breadcrumbs, reviews } = input;
  const finalUrl = url || `${SEO_CONFIG.baseUrl}${path}`;
  const pageType: PageType = type || SEO_CONFIG.getPageType(path);

  let mainSchema;
  switch (pageType) {
    case "money":
      mainSchema = moneySchema({ ...input, url: finalUrl });
      break;
    case "earn":
      mainSchema = earnSchema({ ...input, url: finalUrl });
      break;
    case "shopping":
      mainSchema = shoppingSchema({ ...input, url: finalUrl });
      break;
    case "content":
      mainSchema = contentSchema({ ...input, url: finalUrl });
      break;
    default:
      mainSchema = { "@context": "https://schema.org", "@type": "WebPage", name: input.title || SEO_CONFIG.siteName, url: finalUrl };
  }

  const schemas = [
    baseSchema(finalUrl),
    mainSchema,
    faqSchema(faq),
    reviewSchema(reviews, finalUrl),
    breadcrumbSchema(breadcrumbs, finalUrl),
  ].filter(Boolean); // Remove nulls

  return schemas;
}

// ===============================
// 🚀 JSON-LD WRAPPER
// ===============================
export function generateJsonLd(input: SchemaInput) {
  const schemas = generateSchema(input);
  return {
    type: "application/ld+json",
    innerHTML: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
  };
}

// ===============================
// 🚀 ALIASES
// ===============================
export const buildSchema = generateSchema;
export const getSchema = generateSchema;
export const createSchema = generateSchema;
export const schemaEngine = generateSchema;
