// components/SEO/MetadataBuilder.ts

export interface MetadataProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function buildMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
  canonical,
}: MetadataProps) {
  return {
    title,
    description,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
