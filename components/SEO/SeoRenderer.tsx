"use client"; // ensures this component only runs on the client

import Head from "next/head";
import { trackSEOGeneration } from "./seoAnalytics";

type SeoProps = {
  seo?: any;
};

export default function SeoRenderer({ seo }: SeoProps) {
  if (!seo) return null;

  const meta = seo.metadata || {};
  const og = meta.openGraph || {};
  const twitter = meta.twitter || {};

  // Track SEO generation on client-side only
  if (typeof window !== "undefined") {
    trackSEOGeneration({
      pageType: meta.title || "unknown",
      metadataSize: JSON.stringify(seo).length,
      schemaCount: seo.schema?.["@graph"]?.length || 0,
      cacheHit: false,
      generationTime: 0,
      timestamp: Date.now(),
    });
  }

  return (
    <Head>
      <title>{meta.title}</title>

      {meta.description && (
        <meta name="description" content={meta.description} />
      )}

      {meta.keywords && (
        <meta name="keywords" content={meta.keywords.join(", ")} />
      )}

      {meta.robots && <meta name="robots" content={meta.robots} />}

      {/* OpenGraph */}
      {og.title && <meta property="og:title" content={og.title} />}
      {og.description && <meta property="og:description" content={og.description} />}
      {og.url && <meta property="og:url" content={og.url} />}
      {og.type && <meta property="og:type" content={og.type} />}
      {og.images?.length > 0 && <meta property="og:image" content={og.images[0].url} />}

      {/* Twitter */}
      {twitter.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter.site && <meta name="twitter:site" content={twitter.site} />}
      {twitter.images?.length > 0 && <meta name="twitter:image" content={twitter.images[0]} />}

      {seo.canonical && <link rel="canonical" href={seo.canonical} />}
    </Head>
  );
}
