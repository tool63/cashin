import { notFound } from "next/navigation";
import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
  getCountryLanguage,
} from "@/app/core/countries";
import { loadAllTranslations } from "@/app/core/i18n/loader";

import CircleBorder from "@/components/animations/CircleBorder";
import OpeningStyle from "@/components/animations/openingstyle";

import HeroSection from "@/components/homepage/HeroSection";
import FAQ from "@/components/faq/FAQ";

import { generateJsonLd } from "@/components/SEO/schema";
import dynamic from "next/dynamic";
import React from "react";

/* =============================== */
const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"));

/* =============================== */
export const revalidate = 3600;

/* =============================== */
type Translations = {
  homepage?: {
    hero?: any;
    faq?: {
      title?: string;
    } | string;
  };
};

/* =============================== */
function formatCountryName(code: string) {
  try {
    if (typeof Intl === "undefined" || !("DisplayNames" in Intl)) {
      return code.toUpperCase();
    }
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code.toUpperCase()) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

/* =============================== */
function Section({ children }: { children: React.ReactNode }) {
  return (
    <OpeningStyle>
      <div className="w-full px-4 py-10 flex justify-center">
        <div className="w-full max-w-7xl">
          <CircleBorder>
            <div className="w-full">{children}</div>
          </CircleBorder>
        </div>
      </div>
    </OpeningStyle>
  );
}

/* =============================== */
export default async function HomePage({
  params,
}: {
  params: { country?: string };
}) {
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    notFound();
  }

  const country = countryParam as CountryCode;

  const countryData = getCountry(country);
  if (!countryData) {
    notFound();
  }

  const countryName = formatCountryName(country);
  const currentYear = new Date().getFullYear();

  /* ================= LANGUAGE ================= */
  const language = getCountryLanguage(country) || "en";

  const allowedLanguages = ["en", "fr", "de", "es", "pt"] as const;
  type SupportedLang = (typeof allowedLanguages)[number];

  const safeLanguage: SupportedLang = allowedLanguages.includes(language as SupportedLang)
    ? (language as SupportedLang)
    : "en";

  /* ================= TRANSLATIONS ================= */
  const t = (await loadAllTranslations(safeLanguage)) as Translations;

  /* ================= SEO ================= */
  const title = `Earn Money Online in ${countryName} - Get Paid Surveys, Apps & Tasks (${currentYear})`;

  const description = `Start earning real money online in ${countryName} with surveys, apps, and simple tasks. Fast payouts via PayPal, crypto, and more.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* ================= FAQ ================= */
  const faqs = [
    {
      q: `Is it really possible to earn money online in ${countryName}?`,
      a: `Yes, many users in ${countryName} earn real money daily by completing simple tasks.`,
    },
    {
      q: `How much can I earn?`,
      a: `Most users earn between $50 to $500 per month.`,
    },
  ];

  /* ================= RENDER ================= */
  return (
    <main>
      <SeoRenderer
        path={`/${country}`}
        title={title}
        description={description}
        country={country}
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* HERO */}
      <Section>
        <HeroSection data={t?.homepage?.hero} />
      </Section>

      {/* FAQ */}
      <Section>
        <div className="w-full max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {typeof t?.homepage?.faq === "object" && t?.homepage?.faq?.title
              ? t.homepage.faq.title
              : "Frequently Asked Questions"}
          </h2>

          <FAQ faqs={faqs} />
        </div>
      </Section>

      <div className="h-12" />
    </main>
  );
}
