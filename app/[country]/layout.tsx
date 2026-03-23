import "@/styles/globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA"; // Import the FloatingCTA

import {
  COOKIE_KEYS,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import { isSupportedCountry } from "@/app/core/utils/validation";
import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

// ===============================
// 🌍 GET COUNTRY
// ===============================
function getInitialCountry(paramsCountry: string): string {
  const normalized = paramsCountry.toLowerCase();

  if (!isSupportedCountry(normalized)) {
    notFound();
  }

  const cookieStore = cookies();

  const forced = cookieStore.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forced && isSupportedCountry(forced)) {
    return forced.toLowerCase();
  }

  const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
  if (userCountry && isSupportedCountry(userCountry)) {
    return userCountry.toLowerCase();
  }

  return normalized;
}

// ===============================
// 🌐 GET LANGUAGE (COOKIE ONLY)
// ===============================
function getInitialLanguage(): SupportedLanguage {
  const cookieStore = cookies();

  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];

    if (
      SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ) {
      return normalized as SupportedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌐 DIRECTION
// ===============================
function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  const rtl = ["ar", "he", "ur", "fa"];
  return rtl.includes(lang) ? "rtl" : "ltr";
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
  const language = getInitialLanguage();

  const htmlLang = `${language}-${country.toUpperCase()}`;
  const dir = getDirection(language);

  // Load all translations for the detected language
  const translations = await loadAllTranslations(language);

  // Check if user has manually overridden language
  const cookieStore = cookies();
  const userOverride = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  const isOverridden = !!userOverride;

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
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

              {/* Floating CTA */}
              <FloatingCTA />
            </LanguageProvider>
          </CountryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
