"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";

// ===============================
// Feature Card Component
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

  // Safety check
  if (!country) return null;

  // Get country data
  const countryNames: Record<string, string> = {
    us: "United States",
    uk: "United Kingdom",
    bd: "Bangladesh",
    pk: "Pakistan",
    au: "Australia",
    ca: "Canada",
    in: "India",
  };
  
  const countryName = countryNames[country] || country.toUpperCase();

  // Simple translation helper
  const t = (key: string, fallback: string) =>
    getTranslation("homepage", key, fallback);

  // Page content with country name embedded
  const title =
    t(
      "welcome_message",
      `Cashog ${countryName} - Earn Money in ${countryName}`
    ) || `Cashog ${countryName} - Earn Money in ${countryName}`;

  const description =
    t(
      "homepage_description",
      `Cashog helps you earn real money online safely and quickly in ${countryName}. Join thousands of successful earners in ${countryName} and start making money today!`
    ) ||
    `Cashog helps you earn real money online safely and quickly in ${countryName}. Join thousands of successful earners in ${countryName} and start making money today!`;

  const features = [
    {
      title: t("feature_surveys", `Complete Surveys in ${countryName}`),
      description: t(
        "feature_surveys_desc",
        `Answer surveys tailored for ${countryName} users and earn points instantly.`
      ),
    },
    {
      title: t("feature_apps", `Install Apps Popular in ${countryName}`),
      description: t(
        "feature_apps_desc",
        `Download and try apps popular in ${countryName} and get paid quickly.`
      ),
    },
    {
      title: t("feature_games", `Play Games Loved in ${countryName}`),
      description: t(
        "feature_games_desc",
        `Play fun games that are trending in ${countryName} and earn rewards.`
      ),
    },
  ];

  const finalCta = {
    title:
      t(
        "final_cta_title",
        `Start Earning in ${countryName} Today`
      ) || `Start Earning in ${countryName} Today`,
    description:
      t(
        "final_cta_description",
        `Join thousands of users in ${countryName} already earning with Cashog. It only takes a few seconds to begin your earning journey in ${countryName}.`
      ) ||
      `Join thousands of users in ${countryName} already earning with Cashog. It only takes a few seconds to begin your earning journey in ${countryName}.`,
  };

  // Structured Data with country name
  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  // Signup link
  const signupLink = `/${country}/signup`;

  return (
    <>
      {/* SEO */}
      <SeoRenderer
        path={`/${country}`}
        title={title}
        description={description}
        country={country}
        noindex={false}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* HERO */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            {description}
          </p>

          <PrimaryCTA
            href={signupLink}
            translationKey="get_started_now"
            aria-label="Get started now"
          />

          <p className="text-sm mt-4 text-gray-500">
            ✓ Trusted by {countryName} users • No credit card required • Start instantly
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* FINAL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 md:p-16 text-white shadow-2xl shadow-blue-500/30"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {finalCta.title}
          </h2>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {finalCta.description}
          </p>

          <PrimaryCTA
            href={signupLink}
            translationKey="get_started_now"
            aria-label="Get started now"
          />

          <p className="text-sm mt-4 opacity-80">
            Fast signup • Instant access • No hidden fees • Available in {countryName}
          </p>
        </motion.div>
      </section>
    </>
  );
}
