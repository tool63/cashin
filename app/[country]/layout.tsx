import "@/styles/globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { VALID_COUNTRY_CODES, getLanguageForCountry } from "@/app/core/detector";

interface LayoutProps {
  children: ReactNode;
  params: { country: string; slug?: string[] };
}

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
