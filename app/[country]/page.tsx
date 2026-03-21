"use client";

import { useMemo } from "react";
import { useLanguage } from "./providers/LanguageProvider";
import { useCountry } from "./providers/CountryProvider";

// ===============================
// 🧩 FEATURE CARD
// ===============================
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-105">
      <h2 className="font-semibold text-xl mb-2">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

// ===============================
// 🚀 PAGE
// ===============================
export default function CountryHomePage() {
  const { language, translations } = useLanguage();
  const { country } = useCountry();

  // ===============================
  // 📝 TRANSLATION HELPER (OPTIMIZED)
  // ===============================
  const t = useMemo(() => {
    return (key: string, fallback: string): string => {
      return translations?.[key] || fallback;
    };
  }, [translations]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* ===============================
          🎯 HERO
      =============================== */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("welcome_message", "Welcome to PayUp! Earn money online.")}
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t(
            "homepage_description",
            "PayUp helps you earn real money online safely and quickly."
          )}
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
          {t("cta_button", "Get Started Now")}
        </button>
      </div>

      {/* ===============================
          🧩 FEATURES
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title={t("feature_surveys", "Complete Surveys")}
          description={t(
            "feature_surveys_desc",
            "Answer surveys and earn points instantly."
          )}
        />

        <FeatureCard
          title={t("feature_apps", "Install Apps")}
          description={t(
            "feature_apps_desc",
            "Download apps and get paid quickly."
          )}
        />

        <FeatureCard
          title={t("feature_games", "Play Games")}
          description={t(
            "feature_games_desc",
            "Play fun games and earn rewards."
          )}
        />
      </div>

      {/* ===============================
          📊 STATS
      =============================== */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6">
          <div className="text-3xl font-bold text-blue-600">50K+</div>
          <div className="text-gray-600 dark:text-gray-400">
            {t("stats_users", "Active Users")}
          </div>
        </div>

        <div className="p-6">
          <div className="text-3xl font-bold text-blue-600">$2M+</div>
          <div className="text-gray-600 dark:text-gray-400">
            {t("stats_earned", "Total Earned")}
          </div>
        </div>

        <div className="p-6">
          <div className="text-3xl font-bold text-blue-600">150+</div>
          <div className="text-gray-600 dark:text-gray-400">
            {t("stats_countries", "Countries")}
          </div>
        </div>
      </div>
    </section>
  );
}
