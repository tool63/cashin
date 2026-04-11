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

/* ================= LANGUAGE ================= */

function getInitialLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  // 🔁 User override language
  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  // 💾 Saved language
  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  // 🌍 Country default (SAFE fallback)
  const countryData = getCountry(country);
  return (countryData?.defaultLanguage || "en") as SupportedLanguage;
}

/* ================= DIRECTION ================= */

function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  return ["ar", "he", "ur", "fa"].includes(lang) ? "rtl" : "ltr";
}

/* ================= LAYOUT ================= */

export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ country?: string }> | { country?: string };
}) {
  const resolvedParams = await params;
  let countryParam = resolvedParams?.country?.toLowerCase();

  // ❌ If empty or global → redirect to root
  if (!countryParam || countryParam === "global") {
    redirect("/");
  }

  // ✅ Allow ALL countries (fallback instead of blocking)
  let country: CountryCode;

  if (isValidCountryCode(countryParam)) {
    country = countryParam as CountryCode;
  } else {
    // 🔥 fallback (important for worldwide support)
    country = "us"; // you can change to "global" if needed
  }

  // 🌐 Language + direction
  const language = getInitialLanguage(country);
  const dir = getDirection(language);

  // 🌍 Load translations
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
