// app/[country]/layout.tsx

import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";

import ThemeProviderWrapper from "../[country]/providers/ThemeProviderWrapper";
import LanguageProvider from "../[country]/providers/LanguageProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  getCompleteSeoMetadata,
  getCountryName,
} from "@/components/SEO/seoConfig";

import { buildHreflang } from "@/components/SEO/hreflang";

import { defaultLanguage } from "@/app/core/i18n/config";
import { detect } from "@/app/core/detector";

// ===============================
// 🌍 Types
// ===============================

interface LayoutProps {
  children: ReactNode;
  params?: { country?: string };
}

// ===============================
// 🧠 Generate Metadata (SEO)
// ===============================

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { country } = detect(params?.country);

  // 🌍 Path for country homepage
  const path = "";

  const seo = getCompleteSeoMetadata(
    path,
    country,
    "Earn Money Online",
    "Earn money by completing offers, surveys, and tasks worldwide."
  );

  const languages = buildHreflang(country ? `/${country}` : "/");

  // 🌍 Better title with real country name
  const countryName = country ? getCountryName(country) : "";

  const title = {
    default: country
      ? `Earn Money Online in ${countryName}`
      : "Earn Money Online",
    template: `%s | Cashog`,
  };

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cashog",
    url: seo.alternates.canonical,
    logo: `${seo.alternates.canonical}/logo.png`,
  };

  return {
    title,
    description: seo.description,

    openGraph: seo.openGraph,
    twitter: seo.twitter,

    alternates: {
      canonical: seo.alternates.canonical,
      languages,
    },

    robots: seo.robots,

    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}

// ===============================
// 🌍 Layout Component
// ===============================

export default function CountryLayout({
  children,
  params,
}: LayoutProps) {
  const { country, language } = detect(params?.country);

  // 🌍 Better html lang (SEO important)
  const htmlLang = language || defaultLanguage;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className="bg-primary text-primary transition-colors duration-200">
        <ThemeProviderWrapper>
          <LanguageProvider
            country={country || defaultLanguage}
            language={language}
          >
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="min-h-screen pt-20 bg-bg-secondary dark:bg-bg-primary">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
