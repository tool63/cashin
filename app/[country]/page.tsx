"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";
import FAQ from "@/components/faq/FAQ";

// ===============================
// Feature Card
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
// Helper: Country Name
// ===============================
function formatCountryName(code: string) {
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code.toUpperCase()) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

// ===============================
// Main Page
// ===============================
export default function CountryHomePage() {
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  if (!country) return null;

  const countryName = formatCountryName(country);
  const currentYear = new Date().getFullYear();

  const t = (key: string, fallback: string) =>
    getTranslation("homepage", key, fallback);

  // ===============================
  // SEO
  // ===============================
  const title =
    t(
      "welcome_message",
      `Earn Money Online in ${countryName} (${currentYear}) - Cashog`
    ) ||
    `Earn Money Online in ${countryName} (${currentYear}) - Cashog`;

  const description =
    t(
      "homepage_description",
      `Cashog helps you earn real money online in ${countryName}. Start earning today with surveys, apps, and games.`
    ) ||
    `Cashog helps you earn real money online in ${countryName}.`;

  // ===============================
  // Features
  // ===============================
  const features = useMemo(
    () => [
      {
        title: `Complete Surveys in ${countryName}`,
        description: `Answer surveys tailored for users in ${countryName} and earn instantly.`,
      },
      {
        title: `Install Apps & Earn`,
        description: `Try trending apps in ${countryName} and get rewarded.`,
      },
      {
        title: `Play Games & Get Paid`,
        description: `Play popular games and earn real cash rewards.`,
      },
      {
        title: `Instant Rewards`,
        description: `Earn points and convert them into real money easily.`,
      },
      {
        title: `Secure & Trusted`,
        description: `Verified platform with real payouts and secure tracking.`,
      },
      {
        title: `Daily New Offers`,
        description: `New high-paying earning opportunities added every day.`,
      },
    ],
    [countryName]
  );

  // ===============================
  // FAQ DATA (used by FAQ component)
  // ===============================
  const faqs = [
    {
      q: `Is Cashog legit in ${countryName}?`,
      a: `Yes, thousands of users in ${countryName} are earning daily with real payouts.`,
    },
    {
      q: `How do I start earning?`,
      a: `Sign up, complete offers like surveys or apps, and start earning instantly.`,
    },
    {
      q: `How fast can I withdraw money?`,
      a: `Withdrawals are processed quickly depending on your selected method.`,
    },
    {
      q: `Do I need to pay anything?`,
      a: `No, joining Cashog is completely free.`,
    },
  ];

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  const signupLink = `/${country}/signup`;

  // ===============================
  // UI
  // ===============================
  return (
    <>
      {/* SEO */}
      <SeoRenderer
        path={`/${country}`}
        title={title}
        description={description}
        country={country}
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

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            {description}
          </p>

          <PrimaryCTA href={signupLink} />

          <p className="text-sm mt-4 text-gray-500">
            ✓ Trusted by thousands in {countryName} • No credit card required
          </p>

          <p className="text-sm text-gray-500 mt-2">
            🔒 Secure platform • Verified offers • Real payouts
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Start Earning in {countryName} Today 🚀
          </h2>

          <p className="mb-6">
            Join thousands already earning online.
          </p>

          <PrimaryCTA href={signupLink} />

          <p className="text-sm mt-4 opacity-80">
            🔥 Limited high-paying offers available in {countryName}
          </p>
        </motion.div>

        {/* FAQ (NEW COMPONENT) */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <FAQ faqs={faqs} />
        </div>
      </section>
    </>
  );
}
