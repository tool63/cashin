"use client";

import { useMemo } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";

import Reveal from "@/components/animations/openingstyle";
import Container from "@/components/animations/container";
import CircleBorder from "@/components/animations/CircleBorder";

import { CardGrid, Card, CardTitle, CardDescription } from "@/components/animations/container";
import FAQ from "@/components/faq/FAQ";

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
export default function CountryHomePage() {
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  if (!country) return null;

  const countryName = formatCountryName(country);
  const currentYear = new Date().getFullYear();

  const t = (key: string, fallback: string) =>
    getTranslation("homepage", key, fallback);

  const title =
    t(
      "welcome_message",
      `Earn Money Online in ${countryName} (${currentYear}) - Cashog`
    ) || `Earn Money Online in ${countryName}`;

  const description =
    t(
      "homepage_description",
      `Earn real money online in ${countryName}.`
    ) || `Earn Money Online`;

  const features = useMemo(
    () => [
      { title: "Surveys", description: "Earn by answering surveys." },
      { title: "Apps", description: "Install apps and earn." },
      { title: "Games", description: "Play games and get rewards." },
    ],
    []
  );

  const faqs = [
    {
      q: `Is Cashog legit in ${countryName}?`,
      a: `Yes, thousands are earning daily.`,
    },
    {
      q: `How do I start?`,
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
      <Container className="relative">
        <CircleBorder />

        <Reveal>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>

            <p className="text-xl mb-6">{description}</p>

            <PrimaryCTA href={signupLink} />
          </div>
        </Reveal>
      </Container>

      {/* ================= FEATURES ================= */}
      <Container className="relative">
        <CircleBorder />

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

      {/* ================= CTA ================= */}
      <Container className="relative">
        <CircleBorder />

        <Reveal delay={0.2}>
          <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-4">
              Start Earning in {countryName} 🚀
            </h2>

            <PrimaryCTA href={signupLink} />
          </div>
        </Reveal>
      </Container>

      {/* ================= FAQ ================= */}
      <Container className="relative">
        <CircleBorder />

        <Reveal delay={0.3}>
          <h2 className="text-2xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>

          <FAQ faqs={faqs} />
        </Reveal>
      </Container>
    </>
  );
}
