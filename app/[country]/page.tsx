import { notFound } from "next/navigation";
import { getCountry, isValidCountryCode, type CountryCode, getCountryLanguage } from "@/app/core/countries";
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
  const t = await loadAllTranslations(safeLanguage);

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
      a: `Yes, many users in ${countryName} earn real money daily by completing simple tasks like surveys, app installs, and testing offers.`,
    },
    {
      q: `How much can I realistically earn?`,
      a: `Earnings depend on your activity. Many users earn between $50 to $500 per month.`,
    },
    {
      q: `Is this platform safe and legit?`,
      a: `Yes, it is secure with encrypted transactions and trusted payment systems.`,
    },
    {
      q: `How do I start earning money quickly?`,
      a: `Sign up, complete your profile, and start completing available tasks.`,
    },
    {
      q: `What payment methods are available in ${countryName}?`,
      a: `PayPal, cryptocurrency, Payoneer, and gift cards.`,
    },
    {
      q: `How fast are withdrawals processed?`,
      a: `Withdrawals are usually processed within 24–48 hours.`,
    },
    {
      q: `Do I need to pay anything to join?`,
      a: `No, joining is completely free.`,
    },
  ];

  /* ================= RENDER ================= */
  return (
    <main>
      {/* SEO */}
      <SeoRenderer
        path={`/${country}`}
        title={title}
        description={description}
        country={country}
      />

      {/* Structured Data */}
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
            {t?.homepage?.faq?.title ?? "Frequently Asked Questions"}
          </h2>

          <FAQ faqs={faqs} />
        </div>
      </Section>

      <div className="h-12" />
    </main>
  );
}
