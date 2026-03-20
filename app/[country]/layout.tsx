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
  SUPPORTED_LANGUAGES,
} from "@/app/core/detector";

interface LayoutProps {
  children: ReactNode;
  params: { country: string };
}

// ===============================
// 🌍 LANGUAGE RESOLVER (SERVER SAFE)
// ===============================
function getInitialLanguage(
  country: string,
  cookieStore: ReturnType<typeof cookies>
): SupportedLanguage {
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];

    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  return getLanguageForCountry(country) || DEFAULT_LANGUAGE;
}

// ===============================
// 🚀 LAYOUT
// ===============================
export default function CountryLayout({
  children,
  params,
}: LayoutProps) {
  const country = params.country.toLowerCase();

  // ------------------------------
  // ❌ INVALID COUNTRY
  // ------------------------------
  if (!VALID_COUNTRY_CODES.has(country)) {
    notFound();
  }

  // ------------------------------
  // 🍪 COOKIES (SERVER)
  // ------------------------------
  const cookieStore = cookies();

  const initialLanguage = getInitialLanguage(country, cookieStore);

  // ------------------------------
  // 🌐 HTML ATTRIBUTES
  // ------------------------------
  const htmlLang = `${initialLanguage}-${country.toUpperCase()}`;

  const rtlLanguages = ["ar", "he", "ur", "fa"];
  const dir = rtlLanguages.includes(initialLanguage) ? "rtl" : "ltr";

  // ------------------------------
  // 🎯 RENDER
  // ------------------------------
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
