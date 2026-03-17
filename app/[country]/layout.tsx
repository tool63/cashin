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
  params: { country: string };
}

// Viewport config
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Static params for SSG
export function generateStaticParams() {
  return Array.from(VALID_COUNTRY_CODES).map((country) => ({ country }));
}

// Metadata per country
export function generateMetadata({ params }: LayoutProps): Metadata {
  const country = params.country.toLowerCase();
  if (!VALID_COUNTRY_CODES.has(country)) notFound();

  const countryName = getCountryName(country);
  const language = getLanguageForCountry(country);

  return {
    title: {
      default: `Earn Money Online in ${countryName} | Cashog`,
      template: `%s | Cashog ${countryName}`,
    },
    description: `Earn real money online in ${countryName}. Complete surveys, install apps, play games, and get paid instantly with Cashog.`,
    alternates: {
      canonical: `https://cashog.com/${country}`,
      languages: {
        "en-us": "https://cashog.com/us",
        "en-gb": "https://cashog.com/gb",
        "fr-fr": "https://cashog.com/fr",
        "de-de": "https://cashog.com/de",
        "x-default": "https://cashog.com/us",
      },
    },
    openGraph: {
      title: `Earn Money Online in ${countryName}`,
      description: `Join Cashog and start earning real money in ${countryName}.`,
      url: `https://cashog.com/${country}`,
      siteName: "Cashog",
      locale: `${language}-${country.toUpperCase()}`,
      type: "website",
    },
  };
}

// Layout component
export default function CountryLayout({ children, params }: LayoutProps) {
  const country = params.country.toLowerCase();
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
