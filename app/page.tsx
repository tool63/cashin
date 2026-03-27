// app/page.tsx
import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, COOKIE_KEYS } from "@/app/core/constants";
import { loadAllTranslations } from "@/app/core/i18n/loader";
import { CountryProvider } from "@/app/[country]/providers/CountryProvider";
import { LanguageProvider } from "@/app/[country]/providers/LanguageProvider";
import CountryHomePage from "@/app/[country]/page";

export default async function RootPage() {
  const cookieStore = cookies();
  
  // Get language preference from cookie, or default to English
  const language = (cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value as any) || DEFAULT_LANGUAGE;
  const isOverridden = !!cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
  
  // Load translations for the detected language
  const translations = await loadAllTranslations(language);

  return (
    <CountryProvider initialCountry="global">
      <LanguageProvider
        initialLanguage={language}
        translations={translations}
        isOverridden={isOverridden}
      >
        <CountryHomePage />
      </LanguageProvider>
    </CountryProvider>
  );
}
