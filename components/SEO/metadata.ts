import { SEO_CONFIG } from "./seoConfig";
import { PageType } from "./pageTypes";

interface MetadataInput {
  pageType: PageType;
  route: string;
  locale: string;
  canonical: string;
  data?: any;
}

export function buildMetadata(input: MetadataInput) {
  const { pageType, route, locale, canonical, data } = input;

  const title = buildTitle(pageType, data);
  const description = buildDescription(pageType, data);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}${route}`,
      siteName: SEO_CONFIG.siteName,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical,
    },
  };
}

function buildTitle(pageType: PageType, data?: any): string {
  switch (pageType) {
    case "home":
      return SEO_CONFIG.defaultTitle;

    case "earn":
      return data?.title
        ? `${data.title} | Cashog`
        : "Earn Money Online | Cashog";

    case "guides":
      return data?.title
        ? `${data.title} | Cashog Guide`
        : "Cashog Guides – Learn How to Earn";

    case "rewards":
      return data?.title
        ? `${data.title} | Cashog Rewards`
        : "Cashog Rewards – PayPal, Gift Cards & More";

    case "cashback":
      return data?.title
        ? `${data.title} | Cashog Cashback`
        : "Cashog Cashback – Save & Earn";

    case "affiliate":
      return "Cashog Affiliate Program";

    case "blog":
      return data?.title ? `${data.title} | Cashog Blog` : "Cashog Blog";

    case "static":
      return data?.title || "Cashog";

    default:
      return SEO_CONFIG.defaultTitle;
  }
}

function buildDescription(pageType: PageType, data?: any): string {
  switch (pageType) {
    case "home":
      return SEO_CONFIG.defaultDescription;

    case "earn":
      return (
        data?.description ||
        "Complete tasks and earn money online with Cashog rewards."
      );

    case "guides":
      return (
        data?.description ||
        "Learn how to earn money online with proven Cashog guides."
      );

    case "rewards":
      return (
        data?.description ||
        "Earn PayPal, gift cards, and crypto by completing offers."
      );

    case "cashback":
      return (
        data?.description ||
        "Shop and earn cashback with Cashog rewards."
      );

    case "affiliate":
      return "Join Cashog affiliate program and earn commissions.";

    case "blog":
      return data?.description || "Cashog blog – tips to earn and save money.";

    default:
      return SEO_CONFIG.defaultDescription;
  }
}
