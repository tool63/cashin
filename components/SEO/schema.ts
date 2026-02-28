import { PageType } from "./pageTypes";
import { SEO_CONFIG } from "./seoConfig";

interface SchemaInput {
  pageType: PageType;
  route: string;
  data?: any;
}

export function buildStructuredData(input: SchemaInput): object[] {
  const { pageType, route, data } = input;

  const schemas: object[] = [];

  // Organization schema (global)
  schemas.push(buildOrganizationSchema());

  // Website schema (global)
  schemas.push(buildWebsiteSchema());

  // Page-specific schemas
  switch (pageType) {
    case "home":
      schemas.push(buildBreadcrumbSchema("Home", route));
      break;

    case "earn":
    case "guides":
    case "rewards":
    case "cashback":
      schemas.push(buildBreadcrumbSchema(data?.title || "Page", route));
      break;

    case "blog":
      schemas.push(buildArticleSchema(data));
      schemas.push(buildBreadcrumbSchema(data?.title || "Blog", route));
      break;

    case "affiliate":
      schemas.push(buildBreadcrumbSchema("Affiliate", route));
      break;

    default:
      break;
  }

  // FAQ schema (if available)
  if (data?.faqs && Array.isArray(data.faqs)) {
    schemas.push(buildFaqSchema(data.faqs));
  }

  return schemas;
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
  };
}

function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
  };
}

function buildBreadcrumbSchema(title: string, route: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SEO_CONFIG.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${SEO_CONFIG.siteUrl}${route}`,
      },
    ],
  };
}

function buildArticleSchema(data?: any) {
  if (!data) return {};

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: data.image || `${SEO_CONFIG.siteUrl}/default.jpg`,
    author: {
      "@type": "Person",
      name: data.author || SEO_CONFIG.siteName,
    },
    datePublished: data.publishedAt,
  };
}

function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
