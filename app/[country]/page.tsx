"use client";

import { useMemo } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";

// Animations & Layout
import Reveal from "@/components/animations/openingstyle";
import Container from "@/components/animations/container";
import CircleBorder from "@/components/animations/CircleBorder";
import { CardGrid, Card, CardTitle, CardDescription } from "@/components/animations/container";
import FAQ from "@/components/faq/FAQ";

// ===============================
// Helper
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
// Page
// ===============================
export default function CountryHomePage() {
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  if (!country) return null;

  const countryName = formatCountryName(country);
  const currentYear = new Date().getFullYear();

  const t = (key: string, fallback: string) =>
    getTranslation("homepage", key, fallback);

  // SEO
  const title =
    t(
      "welcome_message",
      `Earn Money Online in ${countryName} (${currentYear}) - Cashog`
    ) || `Earn Money Online in ${countryName} (${currentYear}) - Cashog`;

  const description =
    t(
      "homepage_description",
      `Cashog helps you earn real money online in ${countryName}.`
    ) || `Earn Money Online in ${countryName}`;

  // Features
  const features = useMemo(
    () => [
      { title: "Surveys", description: `Earn by completing surveys in ${countryName}.` },
      { title: "Apps", description: `Install apps and get rewarded.` },
      { title: "Games", description: `Play and earn real rewards.` },
      { title: "Withdraw", description: `Cash out your earnings easily.` },
      { title: "Secure", description: `Safe and trusted system.` },
      { title: "Daily Offers", description: `New earning tasks daily.` },
    ],
    [countryName]
  );

  // FAQ
  const faqs = [
    {
      q: `Is Cashog legit in ${countryName}?`,
      a: `Yes, thousands of users in ${countryName} are earning daily.`,
    },
    {
      q: `How do I start earning?`,
      a: `Sign up and complete offers.`,
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
      <SeoRenderer
        path={`/${country}`}
        title={title}
        description={description}
        country={country}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* ================= HERO ================= */}
      <CircleBorder>
        <Container>
          <Reveal>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h1>

              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                {description}
              </p>

              <PrimaryCTA href={signupLink} />

              <p className="text-sm mt-4 text-gray-500">
                ✓ Trusted by thousands in {countryName}
              </p>
            </div>
          </Reveal>
        </Container>
      </CircleBorder>

      {/* ================= FEATURES ================= */}
      <CircleBorder>
        <Container>
          <Reveal delay={0.1}>
            <CardGrid>
              {features.map((f, i) => (
                <Card key={i}>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </Card>
              ))}
            </CardGrid>
          </Reveal>
        </Container>
      </CircleBorder>

      {/* ================= CTA ================= */}
      <CircleBorder>
        <Container>
          <Reveal delay={0.2}>
            <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Start Earning in {countryName} 🚀
              </h2>

              <p className="mb-6">
                Join thousands already earning online.
              </p>

              <PrimaryCTA href={signupLink} />

              <p className="text-sm mt-4 opacity-80">
                🔥 High-paying offers available
              </p>
            </div>
          </Reveal>
        </Container>
      </CircleBorder>

      {/* ================= FAQ ================= */}
      <CircleBorder>
        <Container>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Frequently Asked Questions
              </h2>

              <FAQ faqs={faqs} />
            </div>
          </Reveal>
        </Container>
      </CircleBorder>
    </>
  );
}
