"use client";

import { useMemo } from "react";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";

import OpeningStyle from "@/components/animations/openingstyle";
import CircleBorder from "@/components/animations/CircleBorder";

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
      `Earn Money Online in ${countryName} (${currentYear})`
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
      { title: "Withdraw", description: "Cash out easily." },
    ],
    []
  );

  const faqs = [
    {
      q: `Is it legit in ${countryName}?`,
      a: `Yes, users are earning daily.`,
    },
    {
      q: `How to start?`,
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
    <main>
      {/* SEO */}
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
      <OpeningStyle>
        <CircleBorder>
          <section className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h1>

            <p className="mb-6 text-lg">{description}</p>

            <PrimaryCTA href={signupLink} />
          </section>
        </CircleBorder>
      </OpeningStyle>

      {/* ================= FEATURES ================= */}
      <OpeningStyle>
        <CircleBorder>
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm opacity-80">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </CircleBorder>
      </OpeningStyle>

      {/* ================= CTA ================= */}
      <OpeningStyle>
        <CircleBorder>
          <section className="max-w-7xl mx-auto px-4 py-12 text-center">
            <div className="p-10 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Start Earning Now 🚀
              </h2>

              <PrimaryCTA href={signupLink} />
            </div>
          </section>
        </CircleBorder>
      </OpeningStyle>

      {/* ================= FAQ ================= */}
      <OpeningStyle>
        <CircleBorder>
          <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>

            <FAQ faqs={faqs} />
          </section>
        </CircleBorder>
      </OpeningStyle>

      <div className="h-12"></div>
    </main>
  );
}
