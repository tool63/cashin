// components/SEO/SeoRenderer.tsx
import React from "react";
import { SEOOutput } from "./seoEngine";
import Head from "next/head";

interface SeoRendererProps {
  seo: SEOOutput;
}

export default function SeoRenderer({ seo }: SeoRendererProps) {
  const { metadata, canonical, preconnect, dnsPrefetch, preload } = seo;

  return (
    <Head>
      <title>{metadata.title}</title>
      {metadata.description && (
        <meta name="description" content={metadata.description} />
      )}
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords.join(", ")} />
      )}
      {metadata.robots && <meta name="robots" content={metadata.robots} />}
      {metadata.viewport && <meta name="viewport" content={metadata.viewport} />}
      {metadata.other &&
        Object.entries(metadata.other).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      {canonical && <link rel="canonical" href={canonical} />}
      {preconnect &&
        preconnect.map((url) => <link key={url} rel="preconnect" href={url} />)}
      {dnsPrefetch &&
        dnsPrefetch.map((url) => <link key={url} rel="dns-prefetch" href={url} />)}
      {preload &&
        preload.map((url) => <link key={url} rel="preload" href={url} />)}

      {/* OpenGraph */}
      {metadata.openGraph && (
        <>
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />
          <meta property="og:type" content={metadata.openGraph.type} />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          {metadata.openGraph.images?.map((img, i) => (
            <meta key={i} property="og:image" content={img.url} />
          ))}
        </>
      )}

      {/* Twitter */}
      {metadata.twitter && (
        <>
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:site" content={metadata.twitter.site} />
          {metadata.twitter.images?.map((img, i) => (
            <meta key={i} name="twitter:image" content={img} />
          ))}
        </>
      )}
    </Head>
  );
}
