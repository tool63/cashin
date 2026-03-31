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

import { loadAllTranslations } from "@/app/core/i18n/loader";

/* ================= LANGUAGE HELPERS ================= */

function getInitialLanguage(country: CountryCode) {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as any)) return lang;
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as any)) return lang;
  }

  return getCountry(country).defaultLanguage;
}

function getDirection(lang: string): "ltr" | "rtl" {
  return ["ar", "he", "ur", "fa"].includes(lang) ? "rtl" : "ltr";
}

/* ================= METADATA ================= */

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
    title: `Earn Money Online in ${countryData.name}`,
    description: `Earn money online in ${countryData.name} with Cashog.`,
    alternates: {
      canonical: `https://cashog.com/${country}`,
    },
  };
}

/* ================= LAYOUT ================= */

export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { country?: string };
}) {
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || countryParam === "global") redirect("/");
  if (!isValidCountryCode(countryParam)) redirect("/");

  const country = countryParam as CountryCode;

  const language = getInitialLanguage(country);
  const dir = getDirection(language);

  const translations = await loadAllTranslations(language);

  return (
    <html lang={language} dir={dir}>
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
