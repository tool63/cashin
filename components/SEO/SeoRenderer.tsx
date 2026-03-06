'use client';

import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import { SEOOutput } from './seoEngine';

interface SeoRendererProps {
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

/* =========================================================
   Ultra Premium: SEO Renderer (Type Safe)
========================================================= */
export default function SeoRenderer({
  seo,
  children,
  defer = false,
  priority = 'high',
  onRender,
}: SeoRendererProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ========================================================
  // Structured Data (Schema.org)
  // ========================================================
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

  // ========================================================
  // Meta Tags (Type Safe)
  // ========================================================
  const metaTags = useMemo(() => {
    const tags: React.ReactNode[] = [];
    const metadata = seo.metadata;

    if (!metadata) return tags;

    // Title
    if (metadata.title) {
      tags.push(
        <title key="title">{metadata.title}</title>,
        <meta key="og:title" property="og:title" content={metadata.title} />,
        <meta key="twitter:title" name="twitter:title" content={metadata.title} />
      );
    }

    // Description
    if (metadata.description) {
      const description = String(metadata.description);

      tags.push(
        <meta key="description" name="description" content={description} />,
        <meta key="og:description" property="og:description" content={description} />,
        <meta key="twitter:description" name="twitter:description" content={description} />
      );
    }

    // Keywords
    if (metadata.keywords) {
      const keywords = Array.isArray(metadata.keywords)
        ? metadata.keywords.join(', ')
        : String(metadata.keywords);

      tags.push(<meta key="keywords" name="keywords" content={keywords} />);
    }

    // Canonical
    if (seo.canonical) {
      tags.push(<link key="canonical" rel="canonical" href={String(seo.canonical)} />);
    }

    // Hreflang
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

    // Robots
    if (metadata.robots) {
      const robotsValue =
        typeof metadata.robots === 'string'
          ? metadata.robots
          : `${metadata.robots.index ? 'index' : 'noindex'}, ${
              metadata.robots.follow ? 'follow' : 'nofollow'
            }`;

      tags.push(<meta key="robots" name="robots" content={robotsValue} />);
    }

    // OpenGraph
    if (metadata.openGraph) {
      const og = metadata.openGraph;

      if (og.images?.[0]?.url) {
        tags.push(
          <meta key="og:image" property="og:image" content={String(og.images[0].url)} />,
          <meta
            key="og:image:width"
            property="og:image:width"
            content={String(og.images[0].width || 1200)}
          />,
          <meta
            key="og:image:height"
            property="og:image:height"
            content={String(og.images[0].height || 630)}
          />,
          <meta
            key="og:image:alt"
            property="og:image:alt"
            content={String(og.images[0].alt || metadata.title || '')}
          />
        );
      }

      if (og.url) tags.push(<meta key="og:url" property="og:url" content={String(og.url)} />);
      if (og.type) tags.push(<meta key="og:type" property="og:type" content={String(og.type)} />);
      if (og.siteName)
        tags.push(<meta key="og:site_name" property="og:site_name" content={String(og.siteName)} />);
      if (og.locale)
        tags.push(<meta key="og:locale" property="og:locale" content={String(og.locale)} />);
    }

    // Twitter Card
    if (metadata.twitter) {
      const twitter = metadata.twitter;

      if (twitter.card)
        tags.push(<meta key="twitter:card" name="twitter:card" content={String(twitter.card)} />);
      if (twitter.site)
        tags.push(<meta key="twitter:site" name="twitter:site" content={String(twitter.site)} />);
      if (twitter.images?.[0])
        tags.push(
          <meta key="twitter:image" name="twitter:image" content={String(twitter.images[0])} />
        );
      if (twitter.imageAlt)
        tags.push(
          <meta
            key="twitter:image:alt"
            name="twitter:image:alt"
            content={String(twitter.imageAlt)}
          />
        );
    }

    // Viewport
    if (metadata.viewport) {
      const viewportValue =
        typeof metadata.viewport === 'string'
          ? metadata.viewport
          : `width=${metadata.viewport.width}, initial-scale=${metadata.viewport.initialScale}`;

      tags.push(<meta key="viewport" name="viewport" content={viewportValue} />);
    }

    // Theme color
    if (metadata.other?.['theme-color']) {
      tags.push(
        <meta
          key="theme-color"
          name="theme-color"
          content={String(metadata.other['theme-color'])}
        />
      );
    }

    // Verification (Type Safe)
    if (metadata.verification) {
      Object.entries(metadata.verification).forEach(([key, value]) => {
        if (value) {
          tags.push(
            <meta
              key={`verify-${key}`}
              name={`${key}-verification`}
              content={String(value)}
            />
          );
        }
      });
    }

    return tags;
  }, [seo]);

  // ========================================================
  // Resource Hints
  // ========================================================
  const resourceHints = useMemo(() => {
    const hints: React.ReactNode[] = [];

    seo.preconnect?.forEach((url, index) => {
      hints.push(<link key={`preconnect-${index}`} rel="preconnect" href={String(url)} />);
    });

    seo.links?.forEach((link, index) => {
      hints.push(
        <link
          key={`link-${index}`}
          rel={link.rel}
          href={String(link.href)}
          {...(link.hreflang && { hrefLang: link.hreflang })}
        />
      );
    });

    seo.prefetch?.forEach((url, index) => {
      hints.push(<link key={`prefetch-${index}`} rel="prefetch" href={String(url)} />);
    });

    seo.prerender?.forEach((url, index) => {
      hints.push(<link key={`prerender-${index}`} rel="prerender" href={String(url)} />);
    });

    return hints;
  }, [seo]);

  // ========================================================
  // Performance Monitoring
  // ========================================================
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
        {resourceHints}
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
