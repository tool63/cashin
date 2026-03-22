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
  COOKIE_KEYS,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import { isSupportedCountry } from "@/app/core/utils/validation";
import type { SupportedLanguage } from "@/app/core/types";

// ===============================
// 🌍 LOAD TRANSLATIONS
// ===============================
async function loadAllTranslations(lang: SupportedLanguage) {
  try {
    const [homepage, footer] = await Promise.all([
      import(`@/app/locales/${lang}/homepage.json`),
      import(`@/app/locales/${lang}/footer.json`),
    ]);

    return {
      homepage: homepage.default || {},
      footer: footer.default || {},
    };
  } catch {
    // fallback to default language
    const [homepage, footer] = await Promise.all([
      import(`@/app/locales/${DEFAULT_LANGUAGE}/homepage.json`),
      import(`@/app/locales/${DEFAULT_LANGUAGE}/footer.json`),
    ]);

    return {
      homepage: homepage.default || {},
      footer: footer.default || {},
    };
  }
}

// ===============================
// 🌐 GET COUNTRY (clean & safe)
// ===============================
function getInitialCountry(paramsCountry: string): string {
  const normalized = paramsCountry.toLowerCase();

  if (!isSupportedCountry(normalized)) {
    notFound();
  }

  const cookieStore = cookies();

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
// 🌐 GET LANGUAGE (TRUST COOKIE ONLY)
// ===============================
function getInitialLanguage(): SupportedLanguage {
  const cookieStore = cookies();

  const langCookie = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];

    if (
      SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ) {
      return normalized as SupportedLanguage;
    }
  }

  // ✅ STRICT fallback (NO header re-check here)
  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌐 DIRECTION
// ===============================
function getDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  const rtl = ["ar", "he", "ur", "fa"];
  return rtl.includes(lang) ? "rtl" : "ltr";
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
  const country = getInitialCountry(params.country);
  const language = getInitialLanguage();

  const htmlLang = `${language}-${country.toUpperCase()}`;
  const dir = getDirection(language);

  // ✅ Load translations safely
  const translations = await loadAllTranslations(language);

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry={country}>
            <LanguageProvider
              initialLanguage={language}
              initialCountry={country}
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
