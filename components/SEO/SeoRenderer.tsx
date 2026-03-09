'use client';

import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import { SEOOutput, LinkHint } from './seoEngine';

export interface SeoRendererProps {
  seo: SEOOutput;
  children?: React.ReactNode;
  defer?: boolean;
  priority?: 'high' | 'low';
  onRender?: (metrics: SEORenderMetrics) => void;
}

export interface SEORenderMetrics {
  pathname: string;
  searchParams: Record<string, string>;
  pageType: string;
  canonical?: string;
  schemaCount: number;
  metadataSize: number;
  timestamp: number;
}

export default function SeoRenderer({
  seo,
  children,
  defer = false,
  priority = 'high',
  onRender,
}: SeoRendererProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const structuredDataScripts = useMemo(() => {
    if (!seo.structuredData?.length) return null;

    return seo.structuredData
      .filter((schema) => schema && Object.keys(schema).length > 0)
      .map((schema, index) => {
        const schemaWithContext = {
          '@context': 'https://schema.org',
          ...schema,
        };

        return (
          <script
            key={`schema-${index}-${(schema as any)['@type'] || 'data'}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schemaWithContext),
            }}
            defer={defer}
          />
        );
      });
  }, [seo.structuredData, defer]);

  const metaTags = useMemo(() => {
    const tags: React.ReactNode[] = [];
    const metadata = seo.metadata;
    if (!metadata) return tags;

    if (metadata.title) {
      tags.push(
        <title key="title">{metadata.title}</title>,
        <meta key="og:title" property="og:title" content={metadata.title} />,
        <meta key="twitter:title" name="twitter:title" content={metadata.title} />
      );
    }

    if (metadata.description) {
      const description = String(metadata.description);
      tags.push(
        <meta key="description" name="description" content={description} />,
        <meta key="og:description" property="og:description" content={description} />,
        <meta key="twitter:description" name="twitter:description" content={description} />
      );
    }

    if (seo.canonical) {
      tags.push(<link key="canonical" rel="canonical" href={String(seo.canonical)} />);
    }

    if (seo.hreflang) {
      Object.entries(seo.hreflang).forEach(([lang, href]) => {
        tags.push(
          <link
            key={`hreflang-${lang}`}
            rel="alternate"
            hrefLang={lang}
            href={String(href)}
          />
        );
      });
    }

    return tags;
  }, [seo]);

  useEffect(() => {
    if (!onRender) return;

    const metrics: SEORenderMetrics = {
      pathname,
      searchParams: Object.fromEntries(searchParams.entries()),
      pageType: seo.pageType?.type || 'unknown',
      canonical: seo.canonical,
      schemaCount: seo.structuredData?.length || 0,
      metadataSize: JSON.stringify(seo.metadata || {}).length,
      timestamp: Date.now(),
    };

    onRender(metrics);
  }, [seo, pathname, searchParams, onRender]);

  return (
    <>
      <Head>
        {metaTags}
        {structuredDataScripts}
      </Head>
      {children}
    </>
  );
}

/* =========================================================
   Lazy Loaded Version
========================================================= */
export const LazySeoRenderer = React.lazy(() =>
  Promise.resolve({ default: SeoRenderer })
);
