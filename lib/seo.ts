export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
}

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://payup-pi.vercel.app";

const defaultSeo = {
  title: "Cashog - Earn Real Money Online",
  description:
    "Complete offers, play games, answer surveys and cash out instantly.",
  image: `${baseUrl}/og-image.png`,
  siteName: "Cashog",
};

export function buildSeo(data: SeoData = {}) {
  const title = data.title || defaultSeo.title;
  const description = data.description || defaultSeo.description;
  const image = data.image || defaultSeo.image;

  return {
    title,
    description,
    robots: {
      index: !data.noIndex,
      follow: !data.noIndex,
    },
    openGraph: {
      title,
      description,
      siteName: defaultSeo.siteName,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
