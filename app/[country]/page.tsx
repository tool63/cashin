import { ReactNode } from "react";
import { notFound } from "next/navigation";

import { DEFAULT_COUNTRY, VALID_COUNTRY_CODES, getLanguageForCountry } from "@/app/core/detector";
import { loadTranslations } from "@/app/core/i18n/config";

// ------------------------------
// Types
// ------------------------------
interface HomePageProps {
  params: { country: string };
  children?: ReactNode;
}

// ------------------------------
// Server Component
// ------------------------------
export default async function CountryHomePage({ params }: HomePageProps) {
  const country = params.country.toLowerCase();

  // ------------------------------
  // Validate country code
  // ------------------------------
  if (!VALID_COUNTRY_CODES.has(country)) notFound();

  // ------------------------------
  // Detect language for country
  // ------------------------------
  const language = getLanguageForCountry(country);

  // ------------------------------
  // Load translations (example)
  // ------------------------------
  const translations = await loadTranslations(language, "common");

  // ------------------------------
  // Example content
  // ------------------------------
  const countryName = translations["country_name"] || country.toUpperCase();
  const welcomeText =
    translations["welcome_message"] ||
    `Welcome to PayUp in ${countryName}! Earn money online by completing surveys, installing apps, and playing games.`;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{welcomeText}</h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {translations["homepage_description"] ||
          "PayUp helps you earn real money online safely and quickly."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example feature cards */}
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-xl mb-2">
            {translations["feature_surveys"] || "Complete Surveys"}
          </h2>
          <p>{translations["feature_surveys_desc"] || "Answer surveys and earn points instantly."}</p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-xl mb-2">
            {translations["feature_apps"] || "Install Apps"}
          </h2>
          <p>{translations["feature_apps_desc"] || "Download apps and get paid quickly."}</p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-xl mb-2">
            {translations["feature_games"] || "Play Games"}
          </h2>
          <p>{translations["feature_games_desc"] || "Play fun games and earn rewards."}</p>
        </div>
      </div>
    </section>
  );
}
