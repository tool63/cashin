// app/[country]/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { SEO_CONFIG, BASE_URL } from "@/components/SEO/seoConfig";
import { buildHreflang } from "@/components/SEO/hreflang";
import { buildCanonical } from "@/components/SEO/canonical";

// ✅ Local i18n files inside country folder
import { countryLangMap, defaultLanguage } from "./core/config";
import { detectCountryAndLang } from "./core/detector";

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

/** Props */
interface LayoutProps {
  children: ReactNode;
  params?: { country?: string };
}

/**
 * Generate SEO metadata per country
 */
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { country, language } = detectCountryAndLang(params?.country);

  // Canonical & hreflang
  const canonical = buildCanonical(country ? `/${country.toLowerCase()}` : "/");
  const languages = buildHreflang(country ? `/${country.toLowerCase()}` : "/", countryLangMap);

  // JSON-LD Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url: country ? `${BASE_URL}/${country.toLowerCase()}` : BASE_URL,
    description: SEO_CONFIG.defaultDescription,
    logo: `${BASE_URL}/logo.png`,
  };

  return {
    title: {
      default: `${SEO_CONFIG.defaultTitle}${country ? ` (${country})` : ""}`,
      template: `%s - ${SEO_CONFIG.siteName}${country ? ` (${country})` : ""}`,
    },
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    alternates: { canonical, languages },
    other: { jsonLd: JSON.stringify(jsonLd) },
  };
}

/**
 * Country-aware layout
 */
export default function CountryLayout({ children, params }: LayoutProps) {
  const { country } = detectCountryAndLang(params?.country);

  // <html lang>
  const htmlLang = country ? HREFLANG_MAP[country.toLowerCase()] || "en" : "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className="bg-primary text-primary transition-colors duration-200">
        <ThemeProviderWrapper>
          <LanguageProvider country={country || defaultLanguage}>
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
