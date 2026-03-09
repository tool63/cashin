"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import RootProviders from "./providers/RootProviders";

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

const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 12
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 }
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25 }
  }
};

export default function RootLayout({ children }: RootLayoutProps) {

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
        images: SEO_CONFIG.defaultTwitterImage
          ? [SEO_CONFIG.defaultTwitterImage]
          : [],
        imageAlt: SEO_CONFIG.siteName,
      },
      viewport: "width=device-width, initial-scale=1",
      other: {
        "theme-color": SEO_CONFIG.themeColor || "#000000"
      },
    },
    canonical: SEO_CONFIG.siteUrl,
    hreflang: {},
    structuredData: [],
    pageType: {
      type: "unknown",
      hierarchy: ["unknown"],
      metadata: {},
      matches: null
    },
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

  return (
    <html lang="en">
      <head>
        <SeoRenderer seo={defaultSeo} />
      </head>

      <body className="flex flex-col min-h-screen overflow-x-hidden text-black dark:text-white">

        <RootProviders>

          {/* GLOBAL BACKGROUND */}
          <Background />

          {/* HEADER */}
          <Header
            className="
              fixed top-0 left-0 right-0
              z-40
              backdrop-blur-xl
              bg-white/60 dark:bg-black/60
              border-b border-gray-200 dark:border-white/10
            "
          />

          {/* MAIN CONTENT */}
          <main className="flex-1 pt-20 relative z-10">

            <div className="max-w-7xl mx-auto px-6 py-10">

              <AnimatePresence mode="wait">
                <motion.div
                  key="page"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  {children}
                </motion.div>
              </AnimatePresence>

            </div>

          </main>

          {/* FOOTER */}
          <Footer
            className="
              relative z-10
              border-t border-gray-200 dark:border-white/10
              bg-white/80 dark:bg-black/80
              backdrop-blur-xl
            "
          />

          {/* FLOATING CTA */}
          <div className="fixed bottom-6 right-6 z-50">
            <FloatingCTA />
          </div>

        </RootProviders>

      </body>
    </html>
  );
}
