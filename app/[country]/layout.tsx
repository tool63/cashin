import "@/styles/globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  COOKIE_KEYS,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  COUNTRY_LANGUAGE_MAP,
} from "@/app/core/constants";

import { isSupportedCountry } from "@/app/core/utils/validation";
import type { SupportedLanguage } from "@/app/core/types";

// ===============================
// 🌍 LOAD TRANSLATIONS
// ===============================
async function loadAllTranslations(lang: SupportedLanguage) {
  try {
    const [homepage, footer] = await Promise.all([
      import(`@/app/locales/${lang}/homepage.json`),
      import(`@/app/locales/${lang}/footer.json`),
    ]);

    return {
      homepage: homepage.default || {},
      footer: footer.default || {},
    };
  } catch {
    const [homepage, footer] = await Promise.all([
      import(`@/app/locales/${DEFAULT_LANGUAGE}/homepage.json`),
      import(`@/app/locales/${DEFAULT_LANGUAGE}/footer.json`),
    ]);

    return {
      homepage: homepage.default || {},
      footer: footer.default || {},
    };
  }
}

// ===============================
// 🌍 GET COUNTRY
// ===============================
function getInitialCountry(paramsCountry: string): string {
  const normalized = paramsCountry.toLowerCase();

  if (!isSupportedCountry(normalized)) {
    notFound();
  }

  const cookieStore = cookies();

  // Check if the country is forcibly set
  const forced = cookieStore.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forced && isSupportedCountry(forced)) {
    return forced.toLowerCase();
  }

  // Check if the user has a saved country preference
  const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
  if (userCountry && isSupportedCountry(userCountry)) {
    return userCountry.toLowerCase();
  }

  // Return the normalized country from the URL if no cookie or forced country is found
  return normalized;
}

// ===============================
// 🌐 GET LANGUAGE (COUNTRY-BASED OR COOKIE)
// ===============================
function getInitialLanguage(country: string): SupportedLanguage {
  const cookieStore = cookies();
  
  // Check if user has a language override
  const userOverride = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (userOverride) {
    const normalizedOverride = userOverride.toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(normalizedOverride as SupportedLanguage)) {
      return normalizedOverride as SupportedLanguage;
    }
  }

  // Get language from country mapping if no user override
  const countryLanguage = COUNTRY_LANGUAGE_MAP[country] || DEFAULT_LANGUAGE;

  // Fallback to language cookie if not overridden
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // Return the country-based language or default
  return countryLanguage;
}

// ===============================
// 🌐 DIRECTION
// ===============================
function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  const rtlLanguages = ["ar", "he", "ur", "fa"];
  return rtlLanguages.includes(lang) ? "rtl" : "ltr";
}

// ===============================
// 🚀 LAYOUT
// ===============================
export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { country: string };
}) {
  const country = getInitialCountry(params.country);
  const language = getInitialLanguage(country);

  const htmlLang = `${language}-${country.toUpperCase()}`;
  const dir = getDirection(language);

  // Load translations for the selected language
  const translations = await loadAllTranslations(language);

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={country}>
            <LanguageProvider
              initialLanguage={language}
              translations={translations}
            >
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
