// app/layouts/CountryLayout.tsx
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
  COUNTRY_LANGUAGE_MAP,
} from "@/app/core/constants";

import { isSupportedCountry } from "@/app/core/utils/validation";
import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

// ===============================
// 🌍 GET COUNTRY
// ===============================
function getInitialCountry(
  paramsCountry: string,
  cookieStore: ReturnType<typeof cookies>
): string {
  const normalized = paramsCountry.toLowerCase();

  if (!isSupportedCountry(normalized)) {
    notFound();
  }

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
// 🌐 GET LANGUAGE (COOKIE)
// ===============================
function getInitialLanguage(
  cookieStore: ReturnType<typeof cookies>
): SupportedLanguage {
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
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
  params: { country: string };
}) {
  const cookieStore = cookies();

  // -------------------------------
  // 🌍 COUNTRY
  // -------------------------------
  const country = getInitialCountry(params.country, cookieStore);

  // -------------------------------
  // 🌐 LANGUAGE
  // -------------------------------
  let language = getInitialLanguage(cookieStore);

  // Check if user manually selected language
  const userOverride = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  const isOverridden = !!userOverride;

  // Force correct language per country if not overridden
  if (!isOverridden) {
    language = COUNTRY_LANGUAGE_MAP[country] || DEFAULT_LANGUAGE;
  }

  // -------------------------------
  // 🌐 HTML ATTRIBUTES
  // -------------------------------
  const htmlLang = language; // SEO: just language code
  const dir = getDirection(language);

  // -------------------------------
  // 📦 LOAD TRANSLATIONS
  // -------------------------------
  const translations = await loadAllTranslations(language);

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Optional SEO meta for language */}
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

              {/* Floating CTA */}
              <FloatingCTA />
            </LanguageProvider>
          </CountryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
