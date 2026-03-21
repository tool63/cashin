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
  COOKIE_KEYS,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import { isSupportedCountry } from "@/app/core/utils/validation";
import { loadTranslations } from "@/app/core/i18n/translations";

import type { SupportedLanguage } from "@/app/core/constants";

// ===============================
// 🌐 GET INITIAL LANGUAGE
// ===============================
function getInitialLanguage(): SupportedLanguage {
  const cookieStore = cookies();

  // 1️⃣ Cookie
  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];

    if (
      SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ) {
      return normalized as SupportedLanguage;
    }
  }

  // 2️⃣ Accept-Language header
  const acceptLanguage = headers().get("accept-language");

  if (acceptLanguage) {
    const browserLang = acceptLanguage.split(",")[0].split("-")[0];

    if (
      SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)
    ) {
      return browserLang as SupportedLanguage;
    }
  }

  // 3️⃣ Default
  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌍 GET INITIAL COUNTRY
// ===============================
function getInitialCountry(paramsCountry: string): string {
  const normalized = paramsCountry.toLowerCase();

  // ❗ Validate using unified logic
  if (!isSupportedCountry(normalized)) {
    notFound();
  }

  const cookieStore = cookies();

  // 1️⃣ Forced country (priority)
  const forced = cookieStore.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;

  if (forced && isSupportedCountry(forced)) {
    return forced.toLowerCase();
  }

  // 2️⃣ User country (cookie)
  const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;

  if (userCountry && isSupportedCountry(userCountry)) {
    return userCountry.toLowerCase();
  }

  // 3️⃣ URL param
  return normalized;
}

// ===============================
// 🌐 TEXT DIRECTION
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
  // ------------------------------
  // 🌍 COUNTRY
  // ------------------------------
  const country = getInitialCountry(params.country);

  // ------------------------------
  // 🌐 LANGUAGE
  // ------------------------------
  const language = getInitialLanguage();

  // ------------------------------
  // 🌐 HTML ATTRIBUTES
  // ------------------------------
  const htmlLang = `${language}-${country.toUpperCase()}`;
  const dir = getDirection(language);

  // ------------------------------
  // 🌍 TRANSLATIONS
  // ------------------------------
  let translations: Record<string, string> = {};

  try {
    translations = await loadTranslations(language, "homepage");
  } catch (error) {
    console.error("❌ Failed to load translations:", error);
  }

  // ------------------------------
  // 🎯 RENDER
  // ------------------------------
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
