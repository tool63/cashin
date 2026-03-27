// app/[country]/page.tsx
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";

// ===============================
// Feature Card Component
// ===============================
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 border rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-105">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

// ===============================
// Country Homepage
// ===============================
export default function CountryHomePage() {
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  // Check if this is a global route
  const isGlobal = country === "global";

  // Translation helper
  const t = useMemo(
    () => (key: string, fallback: string) => getTranslation("homepage", key, fallback),
    [getTranslation]
  );

  // Page content (SEO + UI)
  const pageContent = useMemo(() => {
    // Customize content based on whether it's global or country-specific
    const title = isGlobal
      ? (t("welcome_message_global", "Cashog - Earn Money Online Worldwide") || "Cashog - Earn Money Online Worldwide")
      : (t("welcome_message", `Cashog ${country.toUpperCase()} - Earn Money in ${country.toUpperCase()}`) || `Cashog ${country.toUpperCase()} - Earn Money in ${country.toUpperCase()}`);
    
    const description = isGlobal
      ? (t(
          "homepage_description_global",
          "Cashog helps you earn real money online safely and quickly from anywhere in the world."
        ) || "Cashog helps you earn real money online safely and quickly from anywhere in the world.")
      : (t(
          "homepage_description",
          `Cashog helps you earn real money online safely and quickly in ${country.toUpperCase()}.`
        ) || `Cashog helps you earn real money online safely and quickly in ${country.toUpperCase()}.`);

    return {
      title,
      description,
      features: [
        {
          title: t("feature_surveys", "Complete Surveys"),
          description: t("feature_surveys_desc", "Answer surveys and earn points instantly."),
        },
        {
          title: t("feature_apps", "Install Apps"),
          description: t("feature_apps_desc", "Download apps and get paid quickly."),
        },
        {
          title: t("feature_games", "Play Games"),
          description: t("feature_games_desc", "Play fun games and earn rewards."),
        },
      ],
      finalCta: {
        title: isGlobal
          ? (t("final_cta_title_global", "Start Earning Worldwide Today") || "Start Earning Worldwide Today")
          : (t("final_cta_title", `Start Earning in ${country.toUpperCase()} Today`) || `Start Earning in ${country.toUpperCase()} Today`),
        description: isGlobal
          ? (t(
              "final_cta_description_global",
              "Join thousands of users worldwide already earning with Cashog. It only takes a few seconds to begin."
            ) || "Join thousands of users worldwide already earning with Cashog. It only takes a few seconds to begin.")
          : (t(
              "final_cta_description",
              `Join thousands of users in ${country.toUpperCase()} already earning with Cashog. It only takes a few seconds to begin.`
            ) || `Join thousands of users in ${country.toUpperCase()} already earning with Cashog. It only takes a few seconds to begin.`),
      },
    };
  }, [t, country, isGlobal]);

  // Generate structured data based on page content
  const structuredData = useMemo(() => {
    return generateJsonLd({
      path: "/",
      title: pageContent.title,
      description: pageContent.description,
      type: "low",
    });
  }, [pageContent.title, pageContent.description]);

  // Signup CTA link - handle global vs country-specific
  const signupLink = useMemo(() => {
    if (isGlobal) {
      return "/global/signup";
    }
    return `/${country}/signup`;
  }, [country, isGlobal]);

  return (
    <>
      {/* SEO Renderer - Handles canonical, hreflang, and meta tags */}
      <SeoRenderer
        path="/"
        title={pageContent.title}
        description={pageContent.description}
        country={isGlobal ? undefined : country}
        noindex={false}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {pageContent.title}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            {pageContent.description}
          </p>
          <PrimaryCTA href={signupLink} translationKey="get_started_now" aria-label="Get started now" />
          <p className="text-sm mt-4 text-gray-500">
            No credit card required • Start instantly
          </p>
        </div>

        {/* FEATURES SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageContent.features.map((feature, idx) => (
            <FeatureCard key={idx} title={feature.title} description={feature.description} />
          ))}
        </div>

        {/* FINAL CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 md:p-16 text-white shadow-2xl shadow-blue-500/30"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {pageContent.finalCta.title}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {pageContent.finalCta.description}
          </p>
          <PrimaryCTA href={signupLink} translationKey="get_started_now" aria-label="Get started now" />
          <p className="text-sm mt-4 opacity-80">
            Fast signup • Instant access • No hidden fees
          </p>
        </motion.div>
      </section>
    </>
  );
}
