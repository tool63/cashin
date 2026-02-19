"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";

interface SeoEngineProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
}

export default function SeoEngine({
  title,
  description,
  keywords,
  image,
  noIndex = false,
}: SeoEngineProps) {
  const pathname = usePathname();

  const siteName = "Cashog";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://cashog.com";

  const defaultTitle = "Cashog - Earn Real Money Online";
  const defaultDescription =
    "Complete offers, play games, answer surveys and cash out instantly on Cashog.";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || `${baseUrl}/og-image.png`;
  const url = `${baseUrl}${pathname}`;

  return (
    <Head>
      {/* ================= BASIC ================= */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />

      {/* ================= OPEN GRAPH ================= */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalImage} />

      {/* ================= TWITTER ================= */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Head>
  );
}
