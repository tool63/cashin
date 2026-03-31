import "@/styles/globals.css";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Metadata } from "next";

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

/* ===============================
📝 METADATA
=============================== */
export async function generateMetadata({
  params,
}: {
  params: { country?: string };
}): Promise<Metadata> {
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return {
      title: "Country Not Found | Cashog",
      robots: { index: false },
    };
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);

  return {
    title: `Earn Money Online in ${countryData.name} | Cashog`,
    description: `Earn money online in ${countryData.name} with surveys, apps, and tasks.`,
    robots: { index: true, follow: true },
  };
}

/* ===============================
🌐 HELPERS
=============================== */
function getCountryLanguage(country: CountryCode): SupportedLanguage {
  return getCountry(country).defaultLanguage as SupportedLanguage;
}

function getInitialLanguage(
  country: CountryCode,
  cookieStore: ReturnType<typeof cookies>
): SupportedLanguage {
  const userOverride = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (userOverride) {
    const lang = userOverride.split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  return getCountryLanguage(country);
}

function isLanguageOverridden(cookieStore: ReturnType<typeof cookies>) {
  return !!cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
}

function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  const rtl = ["ar", "he", "ur", "fa"];
  return rtl.includes(lang) ? "rtl" : "ltr";
}

/* ===============================
🚀 LAYOUT
=============================== */
export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { country?: string };
}) {
  const cookieStore = cookies(); // ⚠️ Next.js 14 supports this (sync API)

  const countryParam = params?.country?.toLowerCase();

  /* ❌ VALIDATION */
  if (!countryParam || countryParam === "global") {
    redirect("/");
  }

  if (!isValidCountryCode(countryParam)) {
    redirect("/");
  }

  const country = countryParam as CountryCode;

  /* 🌐 LANGUAGE */
  const language = getInitialLanguage(country, cookieStore);
  const isOverridden = isLanguageOverridden(cookieStore);
  const dir = getDirection(language);

  /* 📦 TRANSLATIONS */
  const translations = await loadAllTranslations(language);

  /* 🎯 RENDER */
  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
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
