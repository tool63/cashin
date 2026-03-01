import { PageType } from "./pageTypes";
import { SEO_CONFIG } from "./seoConfig";

interface FAQ {
  question: string;
  answer: string;
}

interface SchemaData {
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  faqs?: FAQ[];
}

interface SchemaInput {
  pageType: PageType;
  route: string;
  data?: SchemaData;
}

export function buildStructuredData(
  input: SchemaInput
): Record<string, any>[] {
  const { pageType, route, data } = input;

  const schemas: Record<string, any>[] = [];
  const fullUrl = `${SEO_CONFIG.siteUrl}${route}`;

  // Global schemas
  schemas.push(buildOrganizationSchema());
  schemas.push(buildWebsiteSchema());
  schemas.push(buildWebPageSchema(data?.title, data?.description, fullUrl));

  // Page-specific schemas
  switch (pageType) {
    case "blog":
      const article = buildArticleSchema(data, fullUrl);
      if (article) schemas.push(article);
      break;

    default:
      break;
  }

  // Breadcrumb
  schemas.push(buildBreadcrumbSchema(data?.title || "Page", fullUrl));

  // FAQ
  if (data?.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
    schemas.push(buildFaqSchema(data.faqs));
  }

  return schemas;
}

/* ------------------ Organization ------------------ */

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    sameAs: SEO_CONFIG.socialLinks || [],
  };
}

/* ------------------ Website ------------------ */

function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/* ------------------ WebPage ------------------ */

function buildWebPageSchema(
  title?: string,
  description?: string,
  url?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title || SEO_CONFIG.siteName,
    description: description || SEO_CONFIG.defaultDescription,
    url,
  };
}

/* ------------------ Breadcrumb ------------------ */

function buildBreadcrumbSchema(title: string, fullUrl: string) {
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
        item: fullUrl,
      },
    ],
  };
}

/* ------------------ Article ------------------ */

function buildArticleSchema(
  data: SchemaData | undefined,
  fullUrl: string
) {
  if (!data?.title) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description || SEO_CONFIG.defaultDescription,
    image: data.image || `${SEO_CONFIG.siteUrl}/default.jpg`,
    author: {
      "@type": "Person",
      name: data.author || SEO_CONFIG.siteName,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.siteUrl}/logo.png`,
      },
    },
    datePublished: data.publishedAt,
    dateModified: data.updatedAt || data.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };
}

/* ------------------ FAQ ------------------ */

function buildFaqSchema(faqs: FAQ[]) {
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
