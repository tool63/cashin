// app/[country]/page.tsx
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import {
  getLanguageForCountry,
  VALID_COUNTRY_CODES,
  COOKIE_KEYS,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  DEFAULT_LANGUAGE,
} from "@/app/core/detector";

import { loadTranslations } from "@/app/core/i18n/config";

// 🔴 REQUIRED (keep these)
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Params {
  country: string;
}

// ===============================
// ✅ SAFE LANGUAGE RESOLVER (SERVER)
// ===============================
function resolveLanguage(country: string): SupportedLanguage {
  const cookieStore = cookies();
  const cookieLang = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (cookieLang) {
    const normalized = cookieLang.toLowerCase().split("-")[0];

    // ✅ STRICT VALIDATION
    if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
      return normalized as SupportedLanguage;
    }
  }

  // ✅ FALLBACK CHAIN
  return getLanguageForCountry(country) || DEFAULT_LANGUAGE;
}

// ===============================
// 🚀 PAGE
// ===============================
export default async function CountryHomePage({
  params,
}: {
  params: Params;
}) {
  const country = params.country.toLowerCase();

  if (!VALID_COUNTRY_CODES.has(country)) notFound();

  // ✅ FIX: Use cookie-aware resolver
  const language = resolveLanguage(country);

  // ✅ Load translations
  const translations = await loadTranslations(language, "homepage");

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">
        {translations["welcome_message"] ||
          "Welcome to PayUp! Earn money online."}
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {translations["homepage_description"] ||
          "PayUp helps you earn real money online safely and quickly."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-xl mb-2">
            {translations["feature_surveys"] || "Complete Surveys"}
          </h2>
          <p>
            {translations["feature_surveys_desc"] ||
              "Answer surveys and earn points instantly."}
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-xl mb-2">
            {translations["feature_apps"] || "Install Apps"}
          </h2>
          <p>
            {translations["feature_apps_desc"] ||
              "Download apps and get paid quickly."}
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-xl mb-2">
            {translations["feature_games"] || "Play Games"}
          </h2>
          <p>
            {translations["feature_games_desc"] ||
              "Play fun games and earn rewards."}
          </p>
        </div>
      </div>
    </section>
  );
}
