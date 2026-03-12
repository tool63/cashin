// app/[lang]/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";

import RootProviders from "./providers/RootProviders";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import Background from "@/components/Background";

import SeoRenderer from "@/components/SEO/SeoRenderer";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { SEOOutput } from "@/components/SEO/seoEngine";

import { LanguageDetector, defaultLanguage } from "./core/detector";

interface LangLayoutProps {
  children: ReactNode;
  params?: { lang: string };
}

// --------------------- SEO Defaults ---------------------
const defaultSeo: SEOOutput = {
  metadata: {
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription || "",
    keywords: SEO_CONFIG.defaultKeywords || [],
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: SEO_CONFIG.siteUrl,
      title: SEO_CONFIG.siteName,
      description: SEO_CONFIG.defaultDescription || "",
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.defaultLocale,
      images: [
        {
          url: SEO_CONFIG.defaultOgImage || "",
          width: 1200,
          height: 630,
          alt: SEO_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle || "",
      images: SEO_CONFIG.defaultTwitterImage ? [SEO_CONFIG.defaultTwitterImage] : [],
      imageAlt: SEO_CONFIG.siteName,
    },
    viewport: "width=device-width, initial-scale=1",
    other: { "theme-color": SEO_CONFIG.themeColor || "#000000" },
  },
  canonical: SEO_CONFIG.siteUrl,
  hreflang: {},
  structuredData: [],
  pageType: { type: "unknown", hierarchy: ["unknown"], metadata: {}, matches: null },
  links: [],
  preconnect: SEO_CONFIG.preconnect || [],
  dnsPrefetch: SEO_CONFIG.dnsPrefetch || [],
  preload: [],
  prefetch: [],
  prerender: [],
  modulePreload: [],
  metrics: {
    pageType: "unknown",
    generationTime: 0,
    metadataSize: 0,
    schemaCount: 0,
    cacheHit: false,
    warnings: 0,
    suggestions: 0,
    seoScore: 0,
    timestamp: Date.now(),
  },
};

// --------------------- Layout Component ---------------------
export default function LangLayout({ children, params }: LangLayoutProps) {
  // Detect language using server-side LanguageDetector
  const detector = new LanguageDetector();
  const lang = detector.detect() || defaultLanguage;

  // Optional: update SEO metadata per language
  const seo: SEOOutput = {
    ...defaultSeo,
    metadata: {
      ...defaultSeo.metadata,
      title: `${SEO_CONFIG.siteName} | ${lang.toUpperCase()}`,
    },
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <SeoRenderer seo={seo} />
      </head>

      <body className="relative text-black dark:text-white antialiased">

        {/* GLOBAL BACKGROUND */}
        <Background />

        <RootProviders>

          <div className="flex flex-col min-h-screen relative z-10">

            {/* HEADER */}
            <Header className="border-b border-theme bg-transparent" />

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
              {children}
            </main>

            {/* FOOTER */}
            <Footer className="bg-transparent" />

          </div>

          {/* FLOATING CTA */}
          <div className="fixed bottom-6 right-6 z-50">
            <FloatingCTA />
          </div>

        </RootProviders>

      </body>
    </html>
  );
}
