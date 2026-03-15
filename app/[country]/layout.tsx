// app/[country]/layout.tsx
import "@/styles/globals.css"; // ← Global styles import
import { ReactNode } from "react";
import { Metadata } from "next";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { SEO_CONFIG, BASE_URL } from "@/components/SEO/seoConfig";
import { buildHreflang } from "@/components/SEO/hreflang";
import { buildCanonical } from "@/components/SEO/canonical";

// Country → HTML lang map
const HREFLANG_MAP: Record<string, string> = {
  us: "en-US",
  uk: "en-GB",
  ca: "en-CA",
  au: "en-AU",
  fr: "fr-FR",
  de: "de-DE",
  in: "en-IN",
};

interface LayoutProps {
  children: ReactNode;
  params: { country: string };
}

/**
 * Generate SEO metadata per country
 */
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const country = params.country.toLowerCase();

  const languages = buildHreflang(`/${country}`);
  const canonical = buildCanonical("", country);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url: `${BASE_URL}/${country}`,
    description: SEO_CONFIG.defaultDescription,
    logo: `${BASE_URL}/logo.png`,
  };

  return {
    title: {
      default: `${SEO_CONFIG.defaultTitle} (${country.toUpperCase()})`,
      template: `%s - ${SEO_CONFIG.siteName} (${country.toUpperCase()})`,
    },
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    alternates: { canonical, languages },
    other: { jsonLd: JSON.stringify(jsonLd) },
  };
}

/**
 * Corporate-grade country layout
 */
export default function CountryLayout({ children, params }: LayoutProps) {
  const country = params.country.toLowerCase();
  const htmlLang = HREFLANG_MAP[country] || "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className="bg-primary text-primary transition-colors duration-200">
        <ThemeProviderWrapper>
          <LanguageProvider country={country}>
            <Header />
            <main className="min-h-screen pt-20 bg-bg-secondary dark:bg-bg-primary">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
