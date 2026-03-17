import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { VALID_COUNTRY_CODES, getCountryName, getLanguageForCountry } from "@/app/core/detector";

interface LayoutProps {
  children: ReactNode;
  params: { country: string; slug?: string[] };
}

// Viewport config
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Static params for SSG
export function generateStaticParams() {
  const pages = ["", "how-it-works", "about", "faq"]; // add future pages here
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

// Metadata per country + page
export function generateMetadata({ params }: LayoutProps): Metadata {
  const country = params.country.toLowerCase();
  if (!VALID_COUNTRY_CODES.has(country)) notFound();

  const countryName = getCountryName(country);
  const language = getLanguageForCountry(country);

  const slug = params.slug?.join("/") || "";

  const pageTitle = slug
    ? `${slug.replace(/-/g, " ")} in ${countryName} | PayUp`
    : `Earn Money Online in ${countryName} | PayUp`;

  const pageDescription = slug
    ? `Learn about ${slug.replace(/-/g, " ")} and earn money in ${countryName} with PayUp.`
    : `Earn real money online in ${countryName}. Complete surveys, install apps, play games, and get paid instantly with PayUp.`;

  const baseUrl = "https://payup-pi.vercel.app"; // update later if using custom domain
  const canonicalUrl = `${baseUrl}/${country}${slug ? `/${slug}` : ""}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-us": `${baseUrl}/us${slug ? `/${slug}` : ""}`,
        "en-gb": `${baseUrl}/gb${slug ? `/${slug}` : ""}`,
        "fr-fr": `${baseUrl}/fr${slug ? `/${slug}` : ""}`,
        "de-de": `${baseUrl}/de${slug ? `/${slug}` : ""}`,
        "x-default": `${baseUrl}/us${slug ? `/${slug}` : ""}`,
      },
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

// Layout component
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
