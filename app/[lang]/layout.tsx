import { ReactNode } from "react";
import { notFound } from "next/navigation";

import RootProviders from "./providers/RootProviders";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import Background from "@/components/Background";

import SeoRenderer from "@/components/SEO/SeoRenderer";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { SEOOutput } from "@/components/SEO/seoEngine";

import { supportedLanguages } from "./core/detector";

interface LangLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

const buildDefaultSeo = (lang: string): SEOOutput => ({
  metadata: {
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription || "",
    keywords: SEO_CONFIG.defaultKeywords || [],
    robots: "index, follow",

    openGraph: {
      type: "website",
      url: `${SEO_CONFIG.siteUrl}/${lang}`,
      title: SEO_CONFIG.siteName,
      description: SEO_CONFIG.defaultDescription || "",
      siteName: SEO_CONFIG.siteName,
      locale: lang,
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
      "theme-color": SEO_CONFIG.themeColor || "#000000",
    },
  },

  canonical: `${SEO_CONFIG.siteUrl}/${lang}`,

  hreflang: {
    en: `${SEO_CONFIG.siteUrl}/en`,
    es: `${SEO_CONFIG.siteUrl}/es`,
    fr: `${SEO_CONFIG.siteUrl}/fr`,
    de: `${SEO_CONFIG.siteUrl}/de`,
    pt: `${SEO_CONFIG.siteUrl}/pt`,
  },

  structuredData: [],

  pageType: {
    type: "unknown",
    hierarchy: ["unknown"],
    metadata: {},
    matches: null,
  },

  links: [],
  preconnect: SEO_CONFIG.preconnect || [],
  dnsPrefetch: SEO_CONFIG.dnsPrefetch || [],
  preload: SEO_CONFIG.preload || [],

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
});

export default function LangLayout({ children, params }: LangLayoutProps) {
  const lang = params?.lang;

  if (!supportedLanguages.includes(lang as any)) {
    notFound();
  }

  const seo = buildDefaultSeo(lang);

  return (
    <html lang={lang}>
      <body>

        <SeoRenderer seo={seo} />

        <Background />

        <RootProviders>
          <div className="flex flex-col min-h-screen relative z-10">

            <Header className="border-b border-theme bg-transparent" />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
              {children}
            </main>

            <Footer className="bg-transparent" />

          </div>

          <div className="fixed bottom-6 right-6 z-50">
            <FloatingCTA />
          </div>

        </RootProviders>

      </body>
    </html>
  );
}
