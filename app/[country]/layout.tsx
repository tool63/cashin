import "@/styles/globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";
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
// 🌍 GET INITIAL LANGUAGE (SERVER)
// ===============================
function getInitialLanguage(
  country: string,
  cookieStore: ReturnType<typeof cookies>
): SupportedLanguage {
  // Priority 1: Cookie
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // Priority 2: Accept-Language header
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  if (acceptLanguage) {
    const browserLang = acceptLanguage.split(",")[0].split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)) {
      return browserLang as SupportedLanguage;
    }
  }

  // Priority 3: Country mapping
  const mappedLang = getLanguageForCountry(country);
  if (mappedLang && SUPPORTED_LANGUAGES.includes(mappedLang)) {
    return mappedLang;
  }

  // Priority 4: Default
  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌍 GET INITIAL COUNTRY (SERVER)
// ===============================
function getInitialCountry(
  paramsCountry: string,
  cookieStore: ReturnType<typeof cookies>
): string {
  // Priority 1: Forced country cookie (admin override)
  const forcedCountry = cookieStore.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forcedCountry && VALID_COUNTRY_CODES.has(forcedCountry)) {
    return forcedCountry.toLowerCase();
  }

  // Priority 2: User country cookie
  const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
  if (userCountry && VALID_COUNTRY_CODES.has(userCountry)) {
    return userCountry.toLowerCase();
  }

  // Priority 3: URL parameter
  return paramsCountry.toLowerCase();
}

// ===============================
// 🌐 GET HTML DIRECTION
// ===============================
function getHtmlDirection(language: SupportedLanguage): "ltr" | "rtl" {
  const rtlLanguages = ["ar", "he", "ur", "fa"];
  return rtlLanguages.includes(language) ? "rtl" : "ltr";
}

// ===============================
// 🚀 LAYOUT
// ===============================
export default async function CountryLayout({
  children,
  params,
}: LayoutProps) {
  const paramsCountry = params.country.toLowerCase();

  // ------------------------------
  // ❌ VALIDATE COUNTRY
  // ------------------------------
  if (!VALID_COUNTRY_CODES.has(paramsCountry)) {
    notFound();
  }

  // ------------------------------
  // 🍪 GET COOKIES (SERVER)
  // ------------------------------
  const cookieStore = cookies();

  // Resolve actual country and language
  const resolvedCountry = getInitialCountry(paramsCountry, cookieStore);
  const resolvedLanguage = getInitialLanguage(resolvedCountry, cookieStore);

  // ------------------------------
  // 🌐 HTML ATTRIBUTES
  // ------------------------------
  const htmlLang = `${resolvedLanguage}-${resolvedCountry.toUpperCase()}`;
  const htmlDir = getHtmlDirection(resolvedLanguage);

  // ------------------------------
  // 🎯 RENDER
  // ------------------------------
  return (
    <html lang={htmlLang} dir={htmlDir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={resolvedCountry}>
            <LanguageProvider initialLanguage={resolvedLanguage}>
              <Header />
              <main className="min-h-screen pt-20">{children}</main>
              <Footer />
            </LanguageProvider>
          </CountryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
