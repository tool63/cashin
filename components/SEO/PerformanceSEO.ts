import Head from "next/head";

interface PerformanceSEOProps {
  preloadImages?: string[];
  preloadFonts?: { href: string; type: string }[];
  preconnectDomains?: string[];
  dnsPrefetchDomains?: string[];
}

export const PerformanceSEO = ({
  preloadImages = [],
  preloadFonts = [],
  preconnectDomains = [],
  dnsPrefetchDomains = [],
}: PerformanceSEOProps) => {
  return (
    <Head>
      {/* Preconnect */}
      {preconnectDomains.map((domain) => (
        <link
          key={domain}
          rel="preconnect"
          href={domain}
          crossOrigin="anonymous"
        />
      ))}

      {/* DNS Prefetch */}
      {dnsPrefetchDomains.map((domain) => (
        <link key={domain} rel="dns-prefetch" href={domain} />
      ))}

      {/* Preload Images */}
      {preloadImages.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
        />
      ))}

      {/* Preload Fonts */}
      {preloadFonts.map((font) => (
        <link
          key={font.href}
          rel="preload"
          href={font.href}
          as="font"
          type={font.type}
          crossOrigin="anonymous"
        />
      ))}
    </Head>
  );
};
