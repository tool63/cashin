// app/[country]/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";

import {
  COOKIE_KEYS,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import { getCountry, isValidCountryCode, type CountryCode } from "@/app/core/countries";
import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

// ===============================
// 🌍 COUNTRY LANGUAGE MAP (from countries.ts)
// ===============================
function getCountryLanguage(countryCode: string): SupportedLanguage {
  const country = getCountry(countryCode);
  return country.defaultLanguage as SupportedLanguage;
}

// ===============================
// 🌍 GET COUNTRY
// ===============================
function getInitialCountry(
  paramsCountry: string | undefined,
  cookieStore: ReturnType<typeof cookies>
): CountryCode {
  // Handle global/no country route
  if (!paramsCountry || paramsCountry === "global") {
    return "global";
  }

  const normalized = paramsCountry.toLowerCase();

  // Check if it's a valid country code
  if (!isValidCountryCode(normalized)) {
    notFound();
  }

  // Check for forced country cookie (admin override)
  const forced = cookieStore.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forced && isValidCountryCode(forced)) {
    return forced.toLowerCase() as CountryCode;
  }

  // Check for saved user country cookie
  const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
  if (userCountry && isValidCountryCode(userCountry)) {
    return userCountry.toLowerCase() as CountryCode;
  }

  // Return the URL country
  return normalized as CountryCode;
}

// ===============================
// 🌐 GET LANGUAGE
// ===============================
function getInitialLanguage(
  country: CountryCode,
  cookieStore: ReturnType<typeof cookies>
): SupportedLanguage {
  // Check if user manually selected language (highest priority)
  const userOverride = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (userOverride) {
    const normalized = userOverride.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // Check for saved language cookie
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // For global route, return default language
  if (country === "global") {
    return DEFAULT_LANGUAGE;
  }

  // Return language based on country
  return getCountryLanguage(country);
}

// ===============================
// 🌐 CHECK IF LANGUAGE IS OVERRIDDEN
// ===============================
function isLanguageOverridden(cookieStore: ReturnType<typeof cookies>): boolean {
  return !!cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
}

// ===============================
// 🌐 DIRECTION
// ===============================
function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  const rtlLanguages = ["ar", "he", "ur", "fa"];
  return rtlLanguages.includes(lang) ? "rtl" : "ltr";
}

// ===============================
// 🔗 GET CURRENT PATHNAME FROM HEADERS
// ===============================
function getCurrentPathname(): string {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-url") || "/";
  return pathname;
}

// ===============================
// 🔗 BUILD CANONICAL URL
// ===============================
function getCanonicalUrl(country: CountryCode, pathname: string): string {
  const baseUrl = "https://cashog.com";
  
  // Remove the country prefix from pathname for canonical URL
  let cleanPath = pathname;
  if (country !== "global") {
    // Remove the country segment from the path for canonical
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments[0] === country) {
      cleanPath = "/" + pathSegments.slice(1).join("/");
    }
  }
  
  // Ensure path is normalized
  if (!cleanPath) cleanPath = "/";
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
  
  if (country === "global") {
    return `${baseUrl}${cleanPath}`;
  }
  
  return `${baseUrl}/${country}${cleanPath}`;
}

// ===============================
// 🌐 GENERATE HREFLANG LINKS
// ===============================
function generateHreflangLinks(country: CountryCode, pathname: string): ReactNode {
  const baseUrl = "https://cashog.com";
  let cleanPath = pathname;
  
  // Remove the country prefix from pathname for hreflang
  if (country !== "global") {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments[0] === country) {
      cleanPath = "/" + pathSegments.slice(1).join("/");
    }
  }
  
  if (!cleanPath) cleanPath = "/";
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
  
  const links = [
    <link key="x-default" rel="alternate" hrefLang="x-default" href={`${baseUrl}${cleanPath}`} />
  ];
  
  // Get all countries from the countries module
  const { ISO_COUNTRIES } = require("@/app/core/countries");
  
  for (const countryCode of ISO_COUNTRIES) {
    const hrefLang = getCountryLanguage(countryCode);
    const url = `${baseUrl}/${countryCode}${cleanPath}`;
    links.push(
      <link key={countryCode} rel="alternate" hrefLang={hrefLang} href={url} />
    );
  }
  
  return links;
}

// ===============================
// 🚀 COUNTRY LAYOUT
// ===============================
export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { country?: string };
}) {
  const cookieStore = cookies();
  const headersList = headers();
  
  // Get current pathname from headers (set in middleware)
  const pathname = headersList.get("x-pathname") || "/";

  // -------------------------------
  // 🌍 COUNTRY (Handle global/no country)
  // -------------------------------
  const country = getInitialCountry(params?.country, cookieStore);

  // -------------------------------
  // 🌐 LANGUAGE
  // -------------------------------
  const language = getInitialLanguage(country, cookieStore);
  const isOverridden = isLanguageOverridden(cookieStore);

  // -------------------------------
  // 🌐 HTML ATTRIBUTES
  // -------------------------------
  const htmlLang = language;
  const dir = getDirection(language);

  // -------------------------------
  // 📦 LOAD TRANSLATIONS
  // -------------------------------
  const translations = await loadAllTranslations(language);

  // -------------------------------
  // 🚀 CANONICAL URL for current page
  // -------------------------------
  const canonicalUrl = getCanonicalUrl(country, pathname);
  const hreflangLinks = generateHreflangLinks(country, pathname);

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <head>
        <meta httpEquiv="content-language" content={language} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang links */}
        {hreflangLinks}
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </head>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={country}>
            <LanguageProvider
              initialLanguage={language}
              translations={translations}
              isOverridden={isOverridden}
            >
              <Header />
              <main className="min-h-screen pt-20">{children}</main>
              <Footer />
              <FloatingCTA />
            </LanguageProvider>
          </CountryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
