import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildSeo, buildStructuredData, SeoData } from '@/lib/seo';

interface MetadataBuilderProps extends SeoData {
  children?: React.ReactNode;
  structuredDataOnly?: boolean;
}

export const MetadataBuilder: React.FC<MetadataBuilderProps> = ({ 
  children,
  structuredDataOnly = false,
  ...customData 
}) => {
  const router = useRouter();
  const path = router.asPath.split('?')[0]; // Remove query params
  
  // Build SEO metadata
  const metadata = buildSeo(customData, path);
  const structuredData = buildStructuredData(customData, path);

  if (structuredDataOnly) {
    return (
      <Head>
        {structuredData.map((item, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </Head>
    );
  }

  return (
    <Head>
      {/* Basic Metadata */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords} />
      )}
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={`${metadata.robots.index ? 'index' : 'noindex'}, ${metadata.robots.follow ? 'follow' : 'nofollow'}`} 
      />
      
      {/* Canonical */}
      {metadata.alternates?.canonical && (
        <link rel="canonical" href={metadata.alternates.canonical} />
      )}
      
      {/* Open Graph */}
      {metadata.openGraph && (
        <>
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          <meta property="og:locale" content={metadata.openGraph.locale} />
          <meta property="og:type" content={metadata.openGraph.type} />
          
          {metadata.openGraph.images?.map((image, i) => (
            <React.Fragment key={i}>
              <meta property="og:image" content={image.url} />
              <meta property="og:image:width" content={image.width?.toString()} />
              <meta property="og:image:height" content={image.height?.toString()} />
              <meta property="og:image:alt" content={image.alt} />
            </React.Fragment>
          ))}

          {metadata.openGraph.publishedTime && (
            <meta property="article:published_time" content={metadata.openGraph.publishedTime} />
          )}
          {metadata.openGraph.modifiedTime && (
            <meta property="article:modified_time" content={metadata.openGraph.modifiedTime} />
          )}
          {metadata.openGraph.author && (
            <meta property="article:author" content={metadata.openGraph.author} />
          )}
          {metadata.openGraph.section && (
            <meta property="article:section" content={metadata.openGraph.section} />
          )}
          {metadata.openGraph.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      {metadata.twitter && (
        <>
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:site" content={metadata.twitter.site} />
          <meta name="twitter:creator" content={metadata.twitter.creator} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta name="twitter:description" content={metadata.twitter.description} />
          {metadata.twitter.images?.map((image, i) => (
            <meta key={i} name="twitter:image" content={image} />
          ))}
        </>
      )}
      
      {/* Additional meta */}
      {metadata.other && Object.entries(metadata.other).map(([key, value]) => (
        <meta key={key} property={key} content={value as string} />
      ))}
      
      {/* Icons */}
      {metadata.icons?.icon?.map((icon, i) => (
        <link key={i} rel="icon" href={icon.url} type={icon.type} />
      ))}
      
      {metadata.icons?.apple?.map((icon, i) => (
        <link key={i} rel="apple-touch-icon" href={icon.url} />
      ))}
      
      {/* Manifest */}
      {metadata.manifest && (
        <link rel="manifest" href={metadata.manifest} />
      )}
      
      {/* Viewport */}
      {metadata.viewport && (
        <meta 
          name="viewport" 
          content={`width=${metadata.viewport.width}, initial-scale=${metadata.viewport.initialScale}, maximum-scale=${metadata.viewport.maximumScale}`} 
        />
      )}
      
      {/* Theme */}
      {metadata.themeColor && (
        <meta name="theme-color" content={metadata.themeColor} />
      )}
      
      {/* Structured Data */}
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      
      {/* Children (for additional tags) */}
      {children}
    </Head>
  );
};
