// app/[country]/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  VALID_COUNTRY_CODES,
  getLanguageForCountry,
  COOKIE_KEYS,
  SupportedLanguage,
  DEFAULT_LANGUAGE,
} from "@/app/core/detector";

interface LayoutProps {
  children: ReactNode;
  params: { country: string; slug?: string[] };
}

// Helper: Get initial language from cookies (server-side)
function getInitialLanguage(country: string, cookieStore: ReturnType<typeof cookies>): SupportedLanguage {
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  
  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];
    if (normalized === "en" || normalized === "fr" || normalized === "de" || 
        normalized === "es" || normalized === "pt") {
      return normalized as SupportedLanguage;
    }
  }
  
  return getLanguageForCountry(country);
}

export default function CountryLayout({ children, params }: LayoutProps) {
  const country = params.country.toLowerCase();
  
  // Validate country
  if (!VALID_COUNTRY_CODES.has(country)) {
    notFound();
  }

  // Get cookies server-side
  const cookieStore = cookies();
  const initialLanguage = getInitialLanguage(country, cookieStore);
  const htmlLang = `${initialLanguage}-${country.toUpperCase()}`;

  // Set RTL direction if needed
  const rtlLanguages = ['ar', 'he', 'ur', 'fa'];
  const dir = rtlLanguages.includes(initialLanguage) ? 'rtl' : 'ltr';

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <LanguageProvider 
            initialCountry={country}
            initialLanguage={initialLanguage}
          >
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
