import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  getCompleteSeoMetadata,
  generateOrganizationSchema,
  generateWebsiteSchema,
  DEFAULT_SEO,
  COUNTRY_LOCALE_MAP,
} from "@/components/SEO/seoConfig";

import { generateHreflangMetadata } from "@/components/SEO/hreflang";
import { generateCanonicalUrl } from "@/components/SEO/canonical";

import { defaultLanguage } from "@/app/core/i18n/config";

// ===============================
// 🌍 Types
// ===============================

interface LayoutProps {
  children: ReactNode;
  params: { country: string };
}

// ===============================
// 📱 Viewport
// ===============================

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

// ===============================
// 🌍 Static Countries (IMPORTANT)
// ===============================

const SUPPORTED_COUNTRIES = [
  "us",
  "fr",
  "bd",
  "in",
];

// ===============================
// 🧠 Metadata (FAST + STATIC)
// ===============================

export function generateMetadata({ params }: LayoutProps): Metadata {
  const country = params.country;

  const currentPath = "";

  const canonical = generateCanonicalUrl(currentPath, country);
  const hreflang = generateHreflangMetadata(currentPath, country);

  const countryName = getCountryDisplayName(country);

  const title = `Earn Money Online in ${countryName}`;
  const description = `Earn real money online in ${countryName}. Complete surveys, apps, and tasks on Cashog.`;

  const seo = getCompleteSeoMetadata(
    currentPath,
    country,
    title,
    description
  );

  const schemas = [
    generateOrganizationSchema(country),
    generateWebsiteSchema(country),
  ];

  return {
    title: {
      default: title,
      template: `%s | Cashog`,
    },

    description,

    openGraph: {
      ...seo.openGraph,
      title,
      description,
      url: canonical,
      locale: COUNTRY_LOCALE_MAP[country] || "en_US",
    },

    twitter: {
      ...seo.twitter,
      title,
      description,
    },

    alternates: {
      canonical,
      languages: hreflang,
    },

    robots: {
      index: true,
      follow: true,
    },

    // ✅ FIXED JSON-LD
    other: {
      "ld+json": JSON.stringify(schemas),
    },
  };
}

// ===============================
// 🧠 Static Params (SSG)
// ===============================

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((country) => ({
    country,
  }));
}

// ===============================
// 🌍 Layout
// ===============================

export default function CountryLayout({
  children,
  params,
}: LayoutProps) {
  const country = params.country;

  const language = defaultLanguage;
  const htmlLang = getHtmlLang(country, language);
  const dir = getTextDirection(language);

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <body className="bg-primary text-primary transition-colors duration-200">
        <ThemeProviderWrapper>
          <LanguageProvider country={country} language={language}>
            <Header country={country} />

            <main className="min-h-screen pt-20">
              {children}
            </main>

            <Footer country={country} />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

// ===============================
// 🔧 Helpers
// ===============================

function getCountryDisplayName(countryCode: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(
      countryCode.toUpperCase()
    )!;
  } catch {
    return countryCode.toUpperCase();
  }
}

function getHtmlLang(country: string, language: string): string {
  return `${language}-${country.toUpperCase()}`;
}

function getTextDirection(language: string): "ltr" | "rtl" {
  return ["ar", "he", "fa", "ur"].includes(language) ? "rtl" : "ltr";
}
