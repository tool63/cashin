import type { Metadata } from "next";
import { SEO_CONFIG } from "./seoConfig";
import { PageType } from "./pageTypes";

interface MetadataInput {
  pageType: PageType;
  route: string;
  locale?: string;
  canonical?: string;
  data?: {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string[];
  };
}

export function buildMetadata(input: MetadataInput): Metadata {
  const {
    pageType,
    route,
    locale = "en_US",
    canonical,
    data,
  } = input;

  const title = buildTitle(pageType, data);
  const description = buildDescription(pageType, data);
  const image = data?.image || SEO_CONFIG.defaultOgImage;
  const finalCanonical =
    canonical || `${SEO_CONFIG.siteUrl}${route}`;

  const keywords = buildKeywords(pageType, data?.keywords);

  return {
    metadataBase: new URL(SEO_CONFIG.siteUrl),

    title,
    description,
    keywords, // ✅ Added here

    alternates: {
      canonical: finalCanonical,
    },

    openGraph: {
      title,
      description,
      url: finalCanonical,
      siteName: SEO_CONFIG.siteName,
      locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: SEO_CONFIG.twitterHandle,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ------------------ Title Builder ------------------ */

function buildTitle(
  pageType: PageType,
  data?: MetadataInput["data"]
): string {
  const site = SEO_CONFIG.siteName;

  switch (pageType) {
    case "home":
      return SEO_CONFIG.defaultTitle;

    case "earn":
      return data?.title
        ? `${data.title} | ${site}`
        : `Earn Money Online | ${site}`;

    case "guides":
      return data?.title
        ? `${data.title} | ${site} Guide`
        : `${site} Guides – Learn How to Earn`;

    case "rewards":
      return data?.title
        ? `${data.title} | ${site} Rewards`
        : `${site} Rewards – PayPal, Gift Cards & More`;

    case "cashback":
      return data?.title
        ? `${data.title} | ${site} Cashback`
        : `${site} Cashback – Save & Earn`;

    case "affiliate":
      return `${site} Affiliate Program`;

    case "blog":
      return data?.title
        ? `${data.title} | ${site} Blog`
        : `${site} Blog`;

    case "static":
      return data?.title || site;

    default:
      return SEO_CONFIG.defaultTitle;
  }
}

/* ------------------ Description Builder ------------------ */

function buildDescription(
  pageType: PageType,
  data?: MetadataInput["data"]
): string {
  switch (pageType) {
    case "home":
      return SEO_CONFIG.defaultDescription;

    case "earn":
      return (
        data?.description ||
        "Complete tasks, surveys, and offers to earn real money online with Cashog."
      );

    case "guides":
      return (
        data?.description ||
        "Step-by-step guides to help you earn more with Cashog rewards."
      );

    case "rewards":
      return (
        data?.description ||
        "Redeem PayPal cash, gift cards, and crypto rewards with Cashog."
      );

    case "cashback":
      return (
        data?.description ||
        "Shop online and earn cashback rewards with Cashog."
      );

    case "affiliate":
      return (
        data?.description ||
        "Join the Cashog affiliate program and earn commissions by referring users."
      );

    case "blog":
      return (
        data?.description ||
        "Tips, strategies, and updates from the Cashog team."
      );

    case "static":
      return data?.description || SEO_CONFIG.defaultDescription;

    default:
      return SEO_CONFIG.defaultDescription;
  }
}

/* ------------------ Keyword Builder ------------------ */

function buildKeywords(
  pageType: PageType,
  pageKeywords?: string[]
): string[] {
  const defaultKeywords = SEO_CONFIG.defaultKeywords || [];

  const pageTypeKeywords: Record<PageType, string[]> = {
    home: ["earn money online", "cash rewards", "make money app"],
    earn: ["complete offers", "paid surveys", "task rewards"],
    guides: ["earning guide", "money tips", "reward tutorials"],
    rewards: ["paypal rewards", "gift cards", "crypto rewards"],
    cashback: ["cashback offers", "shopping rewards"],
    affiliate: ["affiliate program", "refer and earn"],
    blog: ["money blog", "earning tips"],
    static: [],
  };

  const merged = [
    ...defaultKeywords,
    ...pageTypeKeywords[pageType],
    ...(pageKeywords || []),
  ];

  // Remove duplicates
  return Array.from(new Set(merged));
}
