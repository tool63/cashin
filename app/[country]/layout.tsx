// app/[country]/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

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
// 🌍 COUNTRY LANGUAGE MAP
// ===============================
function getCountryLanguage(countryCode: string): SupportedLanguage {
  if (countryCode === "global") return DEFAULT_LANGUAGE;
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
  if (!paramsCountry) {
    // Check for saved user country cookie
    const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
    if (userCountry && isValidCountryCode(userCountry)) {
      return userCountry.toLowerCase() as CountryCode;
    }
    return "global";
  }

  const normalized = paramsCountry.toLowerCase();

  // Allow "global" as a special value
  if (normalized === "global") {
    return "global";
  }

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

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <head>
        <meta httpEquiv="content-language" content={language} />
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
