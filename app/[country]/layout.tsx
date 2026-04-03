import "@/styles/globals.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// ❌ REMOVE: import { Metadata } from "next";

import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/import "@/styles/globals.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// ❌ Remove Metadata import from layout - layouts shouldn't have metadata
// import { Metadata } from "next";

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

/* ================= LANGUAGE ================= */

function getInitialLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  return getCountry(country).defaultLanguage as SupportedLanguage;
}

/* ================= DIRECTION ================= */

function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  return ["ar", "he", "ur", "fa"].includes(lang) ? "rtl" : "ltr";
}

/* ================= LAYOUT ================= */
// ✅ REMOVED generateMetadata - Layouts should not define metadata
// Each page should define its own generateMetadata

export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ country?: string }> | { country?: string };
}) {
  // ✅ Handle async params (Next.js 15+)
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || countryParam === "global") {
    redirect("/");
  }

  if (!isValidCountryCode(countryParam)) {
    redirect("/");
  }

  const country = countryParam as CountryCode;

  const language = getInitialLanguage(country);
  const dir = getDirection(language);

  const translations = await loadAllTranslations(language);

  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={country}>
            <LanguageProvider
              initialLanguage={language}
              translations={translations}
              isOverridden={false}
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
}cta/FloatingCTA";

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

/* ================= LANGUAGE ================= */

function getInitialLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  return getCountry(country).defaultLanguage as SupportedLanguage;
}

/* ================= DIRECTION ================= */

function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  return ["ar", "he", "ur", "fa"].includes(lang) ? "rtl" : "ltr";
}

/* ================= LAYOUT ================= */
// ❌ REMOVED generateMetadata function - layouts should not have metadata
// Each page should define its own generateMetadata using your SEO utility

export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ country?: string }> | { country?: string };
}) {
  // ✅ Handle async params (Next.js 15+)
  const resolvedParams = await params;
  const countryParam = resolvedParams?.country?.toLowerCase();

  if (!countryParam || countryParam === "global") {
    redirect("/");
  }

  if (!isValidCountryCode(countryParam)) {
    redirect("/");
  }

  const country = countryParam as CountryCode;

  const language = getInitialLanguage(country);
  const dir = getDirection(language);

  const translations = await loadAllTranslations(language);

  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={country}>
            <LanguageProvider
              initialLanguage={language}
              translations={translations}
              isOverridden={false}
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
