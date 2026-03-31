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

import { loadAllTranslations } from "@/app/core/i18n/loader";

/* ================= HELPER ================= */
function resolveLanguage(
  country: CountryCode,
  cookieStore: ReturnType<typeof cookies>
) {
  const cookieLang =
    cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value ||
    cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (cookieLang) {
    const normalized = cookieLang.split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(normalized as any)) {
      return normalized;
    }
  }

  return getCountry(country).defaultLanguage;
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

  if (!countryParam || countryParam === "global") {
    redirect("/");
  }

  if (!isValidCountryCode(countryParam)) {
    redirect("/");
  }

  const country = countryParam as CountryCode;

  const cookieStore = cookies();

  const language = resolveLanguage(country, cookieStore);

  const isOverridden = !!cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE);

  const translations = await loadAllTranslations(language);

  return (
    <html lang={language} suppressHydrationWarning>
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
