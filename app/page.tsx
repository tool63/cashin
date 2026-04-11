// app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import { LanguageProvider } from "./providers/LanguageProvider";
import { CountryProvider } from "./providers/CountryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import { COOKIE_KEYS, SUPPORTED_LANGUAGES } from "@/app/core/constants";
import { getCountry, isValidCountryCode, type CountryCode } from "@/app/core/countries";
import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

function getInitialLanguageForGlobal(): SupportedLanguage {
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
  
  return "en";
}

export default async function GlobalPage() {
  const language = getInitialLanguageForGlobal();
  const translations = await loadAllTranslations(language);
  const dir = ["ar", "he", "ur", "fa"].includes(language) ? "rtl" : "ltr";
  
  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <CountryProvider initialCountry="global">
            <LanguageProvider
              initialLanguage={language}
              translations={translations}
              isOverridden={false}
            >
              <Header />
              <main className="min-h-screen pt-20">
                {/* Your global homepage content */}
                <h1>Earn Money Online</h1>
                <p>Complete surveys, install apps, play games, and get paid instantly.</p>
              </main>
              <Footer />
              <FloatingCTA />
            </LanguageProvider>
          </CountryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
