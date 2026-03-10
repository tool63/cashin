"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";

import RootProviders from "./providers/RootProviders";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import Background from "@/components/Background";

import SeoRenderer from "@/components/SEO/SeoRenderer";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { SEOOutput } from "@/components/SEO/seoEngine";

interface RootLayoutProps {
  children: ReactNode;
}

/* Static SEO object */
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
        { url: SEO_CONFIG.defaultOgImage || "", width: 1200, height: 630, alt: SEO_CONFIG.siteName },
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
  metrics: { pageType: "unknown", generationTime: 0, metadataSize: 0, schemaCount: 0, cacheHit: false, warnings: 0, suggestions: 0, seoScore: 0, timestamp: Date.now() },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SeoRenderer seo={defaultSeo} />
      </head>

      <body className="relative min-h-screen flex flex-col text-black dark:text-white antialiased">

        {/* GLOBAL BACKGROUND */}
        <div className="fixed inset-0 -z-10">
          <Background />
        </div>

        {/* MAIN WRAPPER */}
        <RootProviders>
          <ThemeProviderWrapper>
            <LanguageProvider>

              {/* HEADER */}
              <Header />

              {/* PAGE CONTENT */}
              <main className="flex-1 w-full">
                <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
                  {children}
                </div>
              </main>

              {/* FOOTER */}
              <Footer />

              {/* FLOATING CTA */}
              <div className="fixed bottom-6 right-6 z-50">
                <FloatingCTA />
              </div>

            </LanguageProvider>
          </ThemeProviderWrapper>
        </RootProviders>

      </body>
    </html>
  );
}
