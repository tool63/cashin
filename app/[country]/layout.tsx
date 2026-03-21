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
  SupportedLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import { isSupportedCountry } from "@/app/core/utils/validation";
import { loadTranslations } from "@/app/core/i18n/translations";

interface LayoutProps {
  children: ReactNode;
  params: { country: string };
}

// ===============================
// 🌍 GET INITIAL LANGUAGE (SERVER)
// ===============================
function getInitialLanguage(
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
  const acceptLanguage = headers().get("accept-language");
  if (acceptLanguage) {
    const browserLang = acceptLanguage.split(",")[0].split("-")[0];

    if (SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)) {
      return browserLang as SupportedLanguage;
    }
  }

  // Default
  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌍 GET INITIAL COUNTRY (SERVER)
// ===============================
function getInitialCountry(
  paramsCountry: string,
  cookieStore: ReturnType<typeof cookies>
): string {
  const normalized = paramsCountry.toLowerCase();

  // ❗ Validate dynamically (NO LIST)
  if (!isSupportedCountry(normalized)) {
    notFound(); // invalid country
  }

  // Priority 1: Forced
  const forced = cookieStore.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forced && isSupportedCountry(forced)) {
    return forced.toLowerCase();
  }

  // Priority 2: Cookie
  const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
  if (userCountry && isSupportedCountry(userCountry)) {
    return userCountry.toLowerCase();
  }

  // Priority 3: URL param
  return normalized;
}

// ===============================
// 🌐 HTML DIRECTION
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
  const cookieStore = cookies();

  // ------------------------------
  // 🌍 COUNTRY (AUTO VALIDATED)
  // ------------------------------
  const resolvedCountry = getInitialCountry(params.country, cookieStore);

  // ------------------------------
  // 🌐 LANGUAGE
  // ------------------------------
  const resolvedLanguage = getInitialLanguage(cookieStore);

  // ------------------------------
  // 🌐 HTML ATTRIBUTES
  // ------------------------------
  const htmlLang = `${resolvedLanguage}-${resolvedCountry.toUpperCase()}`;
  const htmlDir = getHtmlDirection(resolvedLanguage);

  // ------------------------------
  // 🌍 TRANSLATIONS
  // ------------------------------
  let translations: Record<string, string> = {};

  try {
    translations = await loadTranslations(resolvedLanguage, "homepage");
  } catch (error) {
    console.error("❌ Translation load failed:", error);
  }

  // ------------------------------
  // 🎯 RENDER
  // ------------------------------
  return (
    <html lang={htmlLang} dir={htmlDir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={resolvedCountry}>
            <LanguageProvider
              initialLanguage={resolvedLanguage}
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
