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
// 🌍 GET INITIAL COUNTRY (with cookie priority)
// ===============================
function getInitialCountry(
  paramsCountry: string,
  cookieStore: ReturnType<typeof cookies>
): string {
  // Check for forced country cookie first (from middleware)
  const forcedCountry = cookieStore.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forcedCountry && VALID_COUNTRY_CODES.has(forcedCountry)) {
    return forcedCountry.toLowerCase();
  }

  // Check for user country cookie
  const userCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
  if (userCountry && VALID_COUNTRY_CODES.has(userCountry)) {
    return userCountry.toLowerCase();
  }

  // Fall back to params country
  return paramsCountry.toLowerCase();
}

// ===============================
// 🚀 LAYOUT
// ===============================
export default function CountryLayout({
  children,
  params,
}: LayoutProps) {
  const paramsCountry = params.country.toLowerCase();

  // ------------------------------
  // ❌ INVALID COUNTRY
  // ------------------------------
  if (!VALID_COUNTRY_CODES.has(paramsCountry)) {
    notFound();
  }

  // ------------------------------
  // 🍪 COOKIES (SERVER)
  // ------------------------------
  const cookieStore = cookies();

  // Resolve actual country (cookie takes priority)
  const resolvedCountry = getInitialCountry(paramsCountry, cookieStore);
  const initialLanguage = getInitialLanguage(resolvedCountry, cookieStore);

  // ------------------------------
  // 🌐 HTML ATTRIBUTES
  // ------------------------------
  const htmlLang = `${initialLanguage}-${resolvedCountry.toUpperCase()}`;

  const rtlLanguages = ["ar", "he", "ur", "fa"];
  const dir = rtlLanguages.includes(initialLanguage) ? "rtl" : "ltr";

  // ------------------------------
  // 🎯 RENDER
  // ------------------------------
  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={resolvedCountry}>
            <LanguageProvider initialLanguage={initialLanguage}>
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
