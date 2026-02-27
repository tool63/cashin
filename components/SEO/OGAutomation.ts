interface OGOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article" | "product";
  siteName?: string;
  twitterCard?: "summary" | "summary_large_image";
}

export function generateOG({
  title,
  description,
  url,
  image,
  type = "website",
  siteName = "Cashog",
  twitterCard = "summary_large_image",
}: OGOptions) {
  const defaultImage = `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.jpg`;

  const finalImage = image || defaultImage;

  return {
    openGraph: {
      title,
      description,
      url,
      type,
      site_name: siteName,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [finalImage],
    },
  };
}
