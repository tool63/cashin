// app/[country]/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import ThemeProviderWrapper from "../providers/ThemeProviderWrapper";
import LanguageProvider from "../providers/LanguageProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  VALID_COUNTRY_CODES,
  getLanguageForCountry,
  // Added getCountryName helper directly here
  COUNTRY_LANGUAGE_MAP,
  DEFAULT_COUNTRY,
} from "@/app/core/detector";

// ------------------------------
// Helper: get human-readable country name
// ------------------------------
export function getCountryName(code: string): string {
  const NAMES: Record<string, string> = {
    us: "United States",
    gb: "United Kingdom",
    ca: "Canada",
    fr: "France",
    de: "Germany",
    es: "Spain",
    pt: "Portugal",
    au: "Australia",
    nz: "New Zealand",
    in: "India",
    br: "Brazil",
    // Add more as needed
  };
  return NAMES[code.toLowerCase()] || code.toUpperCase();
}

// ------------------------------
// Layout Props
// ------------------------------
interface LayoutProps {
  children: ReactNode;
  params: { country: string; slug?: string[] };
}

// ------------------------------
// Viewport config
// ------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ------------------------------
// Static params for SSG
// ------------------------------
export function generateStaticParams() {
  const pages = ["", "how-it-works", "about", "faq"]; // add more pages here
  const countries = Array.from(VALID_COUNTRY_CODES);

  const params: { country: string; slug?: string[] }[] = [];

  countries.forEach((country) => {
    pages.forEach((slug) => {
      params.push({
        country,
        slug: slug ? [slug] : undefined,
      });
    });
  });

  return params;
}

// ------------------------------
// Metadata generator
// ------------------------------
export function generateMetadata({ params }: LayoutProps): Metadata {
  const country = params.country.toLowerCase();
  if (!VALID_COUNTRY_CODES.has(country)) notFound();

  const countryName = getCountryName(country);
  const language = getLanguageForCountry(country);
  const slug = params.slug?.join("/") || "";

  const pageTitle = slug
    ? `${slug.replace(/-/g, " ")} in ${countryName} | Cashog`
    : `Earn Money Online in ${countryName} | Cashog`;

  const pageDescription = slug
    ? `Learn about ${slug.replace(/-/g, " ")} and earn money in ${countryName} with PayUp.`
    : `Earn real money online in ${countryName}. Complete surveys, install apps, play games, and get paid instantly with PayUp.`;

  const baseUrl = "https://payup-pi.vercel.app";
  const canonicalUrl = `${baseUrl}/${country}${slug ? `/${slug}` : ""}`;

  const alternates: Record<string, string> = {};
  Object.keys(COUNTRY_LANGUAGE_MAP).forEach((c) => {
    const lang = COUNTRY_LANGUAGE_MAP[c];
    alternates[`${lang}-${c}`] = `${baseUrl}/${c}${slug ? `/${slug}` : ""}`;
  });
  alternates["x-default"] = `${baseUrl}/${DEFAULT_COUNTRY}${slug ? `/${slug}` : ""}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "PayUp",
      locale: `${language}-${country.toUpperCase()}`,
      type: "website",
    },
  };
}

// ------------------------------
// Layout Component
// ------------------------------
export default function CountryLayout({ children, params }: LayoutProps) {
  const country = params.country.toLowerCase();
  if (!VALID_COUNTRY_CODES.has(country)) notFound();

  const language = getLanguageForCountry(country);
  const htmlLang = `${language}-${country.toUpperCase()}`;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
