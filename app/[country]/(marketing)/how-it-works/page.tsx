"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { motion } from "framer-motion";
import PrimaryCTA from "@/components/cta/PrimaryCTA";  // Import the CTA component

// ===============================
// 🧩 STEP CARD (Expandable)
// ===============================
function StepCard({
  title,
  description,
  icon,
  expandedContent,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  expandedContent: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="p-6 border rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
      whileHover={{ scale: 1.05 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-4 mb-4 cursor-pointer">
        <div className="p-4 bg-blue-600 text-white rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>

      {isExpanded && (
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          <p>{expandedContent}</p>
        </div>
      )}
    </motion.div>
  );
}

// ===============================
// 🚀 PAGE
// ===============================
export default function HowItWorksPage() {
  const { language, getTranslation } = useLanguage();
  const { country } = useCountry();

  // ===============================
  // 📝 TRANSLATION HELPER FOR HOW-IT-WORKS NAMESPACE
  // ===============================
  const t = useMemo(() => {
    return (key: string, fallback: string): string => {
      return getTranslation("how-it-works", key, fallback);
    };
  }, [getTranslation]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* ===============================
          🎯 HERO SECTION
      =============================== */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("how_it_works_title", "How PayUp Works")}
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t(
            "how_it_works_description",
            "Follow these simple steps to start earning money online with PayUp!"
          )}
        </p>

        {/* Primary CTA - Hero Section */}
        <PrimaryCTA href={`/${country}/start-earning`}>
          {t("cta_button", "Get Started Now")}
        </PrimaryCTA>
      </div>

      {/* ===============================
          🧩 STEPS (Interactive & Expandable)
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StepCard
          title={t("step_1_title", "Sign Up")}
          description={t(
            "step_1_desc",
            "Create a free account with PayUp to get started."
          )}
          icon={<i className="fas fa-user-plus text-3xl" />}
          expandedContent={t(
            "step_1_expanded",
            "Signing up is simple and only takes a few minutes. You'll receive a confirmation email to get started."
          )}
        />

        <StepCard
          title={t("step_2_title", "Complete Offers")}
          description={t(
            "step_2_desc",
            "Complete surveys, install apps, play games, and more to earn points."
          )}
          icon={<i className="fas fa-tasks text-3xl" />}
          expandedContent={t(
            "step_2_expanded",
            "Explore a variety of offers on our platform. Choose the ones you enjoy and start earning points."
          )}
        />

        <StepCard
          title={t("step_3_title", "Cash Out")}
          description={t(
            "step_3_desc",
            "Redeem your points for real money via PayPal or other methods."
          )}
          icon={<i className="fas fa-credit-card text-3xl" />}
          expandedContent={t(
            "step_3_expanded",
            "Once you've earned enough points, simply request a cashout. You can choose to receive your rewards through PayPal or other available payment methods."
          )}
        />
      </div>

      {/* ===============================
          🖼️ IMAGE / GRAPHIC SECTION
      =============================== */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          {t("how_it_works_graphic_title", "See How It Works in Action")}
        </h2>
        <img
          src="/images/how-it-works.png"
          alt="How PayUp Works"
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>

      {/* ===============================
          ✅ CALL TO ACTION - Final Section
      =============================== */}
      <div className="text-center mt-12">
        <PrimaryCTA href={`/${country}/start-earning`}>
          {t("cta_button", "Get Started Now")}
        </PrimaryCTA>
      </div>
    </section>
  );
}
