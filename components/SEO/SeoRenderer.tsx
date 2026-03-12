// components/SEO/SeoRenderer.tsx
import React from "react";
import { SEOOutput } from "./seoEngine";
import Head from "next/head";

interface SeoRendererProps {
  seo: SEOOutput;
}

export default function SeoRenderer({ seo }: SeoRendererProps) {
  const { metadata, canonical, preconnect, dnsPrefetch, preload } = seo;

  // Fallbacks for SSR
  const ogImages = metadata.openGraph?.images || [];
  const twitterImages = metadata.twitter?.images || [];

  return (
    <Head>
      <title>{metadata.title || "Cashog"}</title>

      {metadata.description && (
        <meta name="description" content={metadata.description} />
      )}
      {metadata.keywords?.length > 0 && (
        <meta name="keywords" content={metadata.keywords.join(", ")} />
      )}
      {metadata.robots && <meta name="robots" content={metadata.robots} />}
      {metadata.viewport && <meta name="viewport" content={metadata.viewport} />}
      {metadata.other &&
        Object.entries(metadata.other).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}

      {canonical && <link rel="canonical" href={canonical} />}

      {preconnect?.map((url) => (
        <link key={url} rel="preconnect" href={url} />
      ))}
      {dnsPrefetch?.map((url) => (
        <link key={url} rel="dns-prefetch" href={url} />
      ))}
      {preload?.map((url) => (
        <link key={url} rel="preload" href={url} />
      ))}

      {/* OpenGraph */}
      {metadata.openGraph && (
        <>
          {metadata.openGraph.title && (
            <meta property="og:title" content={metadata.openGraph.title} />
          )}
          {metadata.openGraph.description && (
            <meta property="og:description" content={metadata.openGraph.description} />
          )}
          {metadata.openGraph.type && (
            <meta property="og:type" content={metadata.openGraph.type} />
          )}
          {metadata.openGraph.url && (
            <meta property="og:url" content={metadata.openGraph.url} />
          )}
          {metadata.openGraph.siteName && (
            <meta property="og:site_name" content={metadata.openGraph.siteName} />
          )}
          {ogImages.map((img, i) => (
            <meta
              key={i}
              property="og:image"
              content={img?.url || "/images/default-og.png"}
            />
          ))}
        </>
      )}

      {/* Twitter */}
      {metadata.twitter && (
        <>
          {metadata.twitter.card && (
            <meta name="twitter:card" content={metadata.twitter.card} />
          )}
          {metadata.twitter.site && (
            <meta name="twitter:site" content={metadata.twitter.site} />
          )}
          {twitterImages.map((img, i) => (
            <meta
              key={i}
              name="twitter:image"
              content={img || "/images/default-og.png"}
            />
          ))}
        </>
      )}
    </Head>
  );
}
