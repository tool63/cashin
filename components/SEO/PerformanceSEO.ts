import React from 'react';
import Head from 'next/head';

interface PerformanceSEOProps {
  preconnectUrls?: string[];
  prefetchUrls?: string[];
  preloadImages?: string[];
  dnsPrefetchUrls?: string[];
  preloadFonts?: string[];
  preloadScripts?: string[];
  slug?: string;
}

export const PerformanceSEO: React.FC<PerformanceSEOProps> = ({
  preconnectUrls = [],
  prefetchUrls = [],
  preloadImages = [],
  dnsPrefetchUrls = [],
  preloadFonts = [],
  preloadScripts = [],
  slug,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';

  return (
    <Head>
      {/* Preconnect */}
      {preconnectUrls.map(url => (
        <link key={url} rel="preconnect" href={url} />
      ))}
      
      {/* DNS Prefetch */}
      {dnsPrefetchUrls.map(url => (
        <link key={url} rel="dns-prefetch" href={url} />
      ))}
      
      {/* Prefetch pages */}
      {prefetchUrls.map(url => (
        <link 
          key={url} 
          rel="prefetch" 
          href={url.startsWith('http') ? url : `${baseUrl}${url}`} 
        />
      ))}
      
      {/* Preload images */}
      {preloadImages.map(url => (
        <link 
          key={url} 
          rel="preload" 
          href={url.startsWith('http') ? url : `${baseUrl}${url}`} 
          as="image" 
        />
      ))}
      
      {/* Preload fonts */}
      {preloadFonts.map(url => (
        <link 
          key={url} 
          rel="preload" 
          href={url} 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
      ))}
      
      {/* Preload scripts */}
      {preloadScripts.map(url => (
        <link 
          key={url} 
          rel="preload" 
          href={url} 
          as="script" 
        />
      ))}
    </Head>
  );
};

// Page-specific performance configs
export const HomePerformanceSEO: React.FC<{ slug?: string }> = ({ slug }) => (
  <PerformanceSEO
    preconnectUrls={[
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
    ]}
    dnsPrefetchUrls={[
      'https://cdn.cashog.com',
      'https://api.cashog.com',
    ]}
    prefetchUrls={[
      '/surveys',
      '/app-installs',
      '/play-games',
    ]}
    preloadImages={[
      '/hero-image.webp',
      '/logo.png',
    ]}
    preloadFonts={[
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
    ]}
    slug={slug}
  />
);

export const EarningMethodPerformanceSEO: React.FC<{ slug?: string }> = ({ slug }) => (
  <PerformanceSEO
    preconnectUrls={[
      'https://fonts.googleapis.com',
      'https://www.google-analytics.com',
    ]}
    dnsPrefetchUrls={[
      'https://cdn.cashog.com',
      'https://api.cashog.com',
    ]}
    preloadImages={[
      '/method-hero.webp',
    ]}
    slug={slug}
  />
);
