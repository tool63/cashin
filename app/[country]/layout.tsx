import "@/styles/globals.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";

import {
  COOKIE_KEYS,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
} from "@/app/core/countries";

import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

// ===============================
// 🌍 COUNTRY → LANGUAGE
// ===============================
function getCountryLanguage(countryCode: CountryCode): SupportedLanguage {
  const country = getCountry(countryCode);
  return country.defaultLanguage as SupportedLanguage;
}

// ===============================
// 🌐 LANGUAGE DETECTION
// ===============================
function getInitialLanguage(
  country: CountryCode,
  cookieStore: ReturnType<typeof cookies>
): SupportedLanguage {
  // 1. User override (highest priority)
  const userOverride = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (userOverride) {
    const normalized = userOverride.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // 2. Saved language
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // 3. Country default
  return getCountryLanguage(country);
}

// ===============================
// 🌐 LANGUAGE OVERRIDE FLAG
// ===============================
function isLanguageOverridden(cookieStore: ReturnType<typeof cookies>): boolean {
  return !!cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
}

// ===============================
// 🌐 RTL / LTR
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
  // 🌍 VALIDATE COUNTRY (STRICT)
  // -------------------------------
  const countryParam = params?.country?.toLowerCase();

  // ❌ No country OR /global → redirect root
  if (!countryParam || countryParam === "global") {
    redirect("/");
  }

  // ❌ Invalid country → redirect root
  if (!isValidCountryCode(countryParam)) {
    redirect("/");
  }

  const country = countryParam as CountryCode;

  // -------------------------------
  // 🌐 LANGUAGE
  // -------------------------------
  const language = getInitialLanguage(country, cookieStore);
  const isOverridden = isLanguageOverridden(cookieStore);
  const dir = getDirection(language);

  // -------------------------------
  // 📦 LOAD TRANSLATIONS
  // -------------------------------
  const translations = await loadAllTranslations(language);

  // -------------------------------
  // 🎯 RENDER
  // -------------------------------
  return (
    <div lang={language} dir={dir} suppressHydrationWarning>
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
    </div>
  );
}
