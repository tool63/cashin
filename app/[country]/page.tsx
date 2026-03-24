"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./providers/LanguageProvider";
import { useCountry } from "./providers/CountryProvider";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

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
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  const t = useMemo(() => {
    return (key: string, fallback: string): string => {
      return getTranslation("homepage", key, fallback);
    };
  }, [getTranslation]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* ===============================
          🎯 HERO
      =============================== */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("welcome_message", "Welcome to PayUp! Earn money online.")}
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          {t(
            "homepage_description",
            "PayUp helps you earn real money online safely and quickly."
          )}
        </p>

        {/* ✅ CLEAN CTA (NO CHILDREN, NO MIXING) */}
        <PrimaryCTA
          href={`/${country}/signup`}
          translationKey="get_started_now"
        />

        <p className="text-sm mt-4 text-gray-500">
          No credit card required • Start instantly
        </p>
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
          💎 FINAL CTA SECTION
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-24 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 md:p-16 text-white shadow-2xl shadow-blue-500/30"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("final_cta_title", "Start Earning Today")}
        </h2>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          {t(
            "final_cta_description",
            "Join thousands of users already earning with PayUp. It only takes a few seconds to begin."
          )}
        </p>

        {/* ✅ FINAL CTA (CORRECT) */}
        <PrimaryCTA
          href={`/${country}/signup`}
          translationKey="get_started_now"
        />

        <p className="text-sm mt-4 opacity-80">
          Fast signup • Instant access • No hidden fees
        </p>
      </motion.div>
    </section>
  );
}
