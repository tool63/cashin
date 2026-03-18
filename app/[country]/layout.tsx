// app/[country]/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

// ✅ FIXED IMPORTS
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  VALID_COUNTRY_CODES,
  getLanguageForCountry,
  COUNTRY_LANGUAGE_MAP,
  DEFAULT_COUNTRY,
} from "@/app/core/detector";

// ------------------------------
// Helper: Country Name Resolver
// ------------------------------
function getCountryName(code: string): string {
  const names: Record<string, string> = {
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
    bd: "Bangladesh",
    pk: "Pakistan",
    br: "Brazil",
  };

  return names[code.toLowerCase()] || code.toUpperCase();
}

// ------------------------------
interface LayoutProps {
  children: ReactNode;
  params: { country: string; slug?: string[] };
}

// ------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ------------------------------
export function generateStaticParams() {
  const pages = ["", "how-it-works", "about", "faq"];
  const countries = Array.from(VALID_COUNTRY_CODES);

  const params: { country: string; slug?: string[] }[] = [];

  for (const country of countries) {
    for (const slug of pages) {
      params.push({
        country,
        slug: slug ? [slug] : undefined,
      });
    }
  }

  return params;
}

// ------------------------------
export function generateMetadata({ params }: LayoutProps): Metadata {
  const country = params.country.toLowerCase();

  if (!VALID_COUNTRY_CODES.has(country)) {
    notFound();
  }

  const countryName = getCountryName(country);
  const language = getLanguageForCountry(country);
  const slug = params.slug?.join("/") || "";

  const cleanSlug = slug.replace(/-/g, " ");

  const title = slug
    ? `${cleanSlug} in ${countryName} | PayUp`
    : `Earn Money Online in ${countryName} | PayUp`;

  const description = slug
    ? `Learn about ${cleanSlug} and earn money in ${countryName} with PayUp.`
    : `Earn real money online in ${countryName}. Complete surveys, install apps, play games, and get paid instantly with PayUp.`;

  const baseUrl = "https://payup-pi.vercel.app";
  const canonical = `${baseUrl}/${country}${slug ? `/${slug}` : ""}`;

  const languages: Record<string, string> = {};

  for (const c in COUNTRY_LANGUAGE_MAP) {
    const lang = COUNTRY_LANGUAGE_MAP[c];
    languages[`${lang}-${c}`] = `${baseUrl}/${c}${slug ? `/${slug}` : ""}`;
  }

  languages["x-default"] = `${baseUrl}/${DEFAULT_COUNTRY}${slug ? `/${slug}` : ""}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "PayUp",
      locale: `${language}-${country.toUpperCase()}`,
      type: "website",
    },
  };
}

// ------------------------------
export default function CountryLayout({ children, params }: LayoutProps) {
  const country = params.country.toLowerCase();

  if (!VALID_COUNTRY_CODES.has(country)) {
    notFound();
  }

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
