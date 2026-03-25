import { SEO_CONFIG } from "./seoConfig";

export function buildMetadata({
  title,
  description,
  canonical,
  keywords,
  noindex,
}: {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  noindex?: boolean;
}) {
  return {
    title,
    description,
    keywords,

    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: SEO_CONFIG.social.twitter,
    },
  };
}
