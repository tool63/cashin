import { cookies } from "next/headers";

import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
} from "@/app/core/countries";

import {
  COOKIE_KEYS,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

import type { SupportedLanguage } from "@/app/core/types";

import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import LiveEarnings from "@/components/homepage/LiveEarnings";
import StatsSection from "@/components/homepage/StatsSection"; // ✅ NEW
import FinalCTASection from "@/components/homepage/FinalCTASection";

import FAQ from "@/components/animations/FAQ";
import CircleBorder from "@/components/animations/CircleBorder";

import { generateJsonLd } from "@/components/SEO/schema";

/* ================= HELPER ================= */

async function loadSectionTranslation(
  language: string,
  section: string
) {
  try {
    const file = await import(
      `@/app/locales/${language}/${section}.json`
    );
    return file.default;
  } catch {
    return {};
  }
}

/* ================= LANGUAGE ================= */

function getLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  const override = cookieStore.get(
    COOKIE_KEYS.USER_LANGUAGE_OVERRIDE
  )?.value;

  if (override) {
    const lang = override.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  const saved = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (saved) {
    const lang = saved.toLowerCase().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  return getCountry(country).defaultLanguage as SupportedLanguage;
}

/* ================= PAGE ================= */

export default async function HomePage({
  params,
}: {
  params: { country?: string };
}) {
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return null;
  }

  const country = countryParam as CountryCode;
  const countryName = getCountry(country).name;

  const language = getLanguage(country);

  /* ================= LOAD TRANSLATIONS ================= */

  const hero = await loadSectionTranslation(language, "herohome");
  const typing = await loadSectionTranslation(language, "typinghome");
  const features = await loadSectionTranslation(language, "featureshome");
  const highOffers = await loadSectionTranslation(language, "highoffershome");
  const liveEarnings = await loadSectionTranslation(language, "liveearningshome");
  const stats = await loadSectionTranslation(language, "statshome"); // ✅ NEW
  const faq = await loadSectionTranslation(language, "faqhome");
  const final = await loadSectionTranslation(language, "finalhome");

  /* ================= SEO ================= */

  const title = `Earn Money Online in ${countryName}`;
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* ================= HERO ================= */

  const heroData = {
    headline: hero?.headline?.replace(/\{country\}/g, countryName),
    subtext: hero?.subtext?.replace(/\{country\}/g, countryName),
    trust_badges: hero?.trust_badges?.map((b: string) =>
      b.replace(/\{country\}/g, countryName)
    ),
  };

  /* ================= FEATURES ================= */

  const featuresData = {
    title: features?.title?.replace(/\{country\}/g, countryName),
    cta: features?.cta?.replace(/\{country\}/g, countryName),

    instant_withdrawals: {
      title: features?.instant_withdrawals?.title?.replace(/\{country\}/g, countryName),
      description: features?.instant_withdrawals?.description?.replace(/\{country\}/g, countryName),
    },

    secure_trusted: {
      title: features?.secure_trusted?.title?.replace(/\{country\}/g, countryName),
      description: features?.secure_trusted?.description?.replace(/\{country\}/g, countryName),
    },

    multiple_payment_options: {
      title: features?.multiple_payment_options?.title?.replace(/\{country\}/g, countryName),
      description: features?.multiple_payment_options?.description?.replace(/\{country\}/g, countryName),
    },
  };

  /* ================= HIGH OFFERS ================= */

  const offersData = {
    title: highOffers?.title?.replace(/\{country\}/g, countryName),
    description: highOffers?.description?.replace(/\{country\}/g, countryName),
    categories: highOffers?.categories || [],
  };

  /* ================= LIVE EARNINGS ================= */

  const liveData = {
    title: liveEarnings?.title?.replace(/\{country\}/g, countryName),
    description: liveEarnings?.description?.replace(/\{country\}/g, countryName),
    live_label: liveEarnings?.live_label,
    stats: liveEarnings?.stats || {},
  };

  /* ================= STATS ================= */

  const statsData = {
    title: stats?.title?.replace(/\{country\}/g, countryName),
    description: stats?.description?.replace(/\{country\}/g, countryName),
    stats: stats?.stats || {},
    highlights:
      stats?.highlights?.map((h: string) =>
        h.replace(/\{country\}/g, countryName)
      ) || [],
    trust:
      stats?.trust?.map((t: string) =>
        t.replace(/\{country\}/g, countryName)
      ) || [],
  };

  /* ================= FAQ ================= */

  const faqTitle = faq?.title || "Frequently Asked Questions";

  const faqs =
    faq?.items?.map((item: any) => ({
      q: item.q.replace(/\{country\}/g, countryName),
      a: item.a.replace(/\{country\}/g, countryName),
    })) || [];

  /* ================= FINAL CTA ================= */

  const finalData = {
    title: final?.title?.replace(/\{country\}/g, countryName),
    description: final?.description?.replace(/\{country\}/g, countryName),
    trust_badges: final?.trust_badges?.map((b: string) =>
      b.replace(/\{country\}/g, countryName)
    ),
  };

  /* ================= RENDER ================= */

  return (
    <main>
      {/* JSON-LD */}
      {structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* HERO */}
      <div className="py-16 px-4">
        <CircleBorder>
          <HeroSection
            data={heroData}
            translations={typing}
          />
        </CircleBorder>
      </div>

      {/* FEATURES */}
      <div className="py-16 px-4">
        <CircleBorder>
          <FeaturesSection
            data={featuresData}
            translations={features}
            countryName={countryName}
          />
        </CircleBorder>
      </div>

      {/* HIGH OFFERS */}
      <div className="py-16 px-4">
        <CircleBorder>
          <HighPayingOffers data={offersData} />
        </CircleBorder>
      </div>

      {/* LIVE EARNINGS */}
      <div className="py-16 px-4">
        <CircleBorder>
          <LiveEarnings
            data={liveData}
            translations={liveEarnings}
            countryName={countryName}
          />
        </CircleBorder>
      </div>

      {/* STATS ✅ */}
      <div className="py-16 px-4">
        <CircleBorder>
          <StatsSection
            data={statsData}
            translations={stats}
            countryName={countryName}
          />
        </CircleBorder>
      </div>

      {/* FAQ */}
      <div className="py-16 px-4">
        <CircleBorder>
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-3xl font-bold mb-6">
              {faqTitle}
            </h2>

            <FAQ faqs={faqs} />
          </div>
        </CircleBorder>
      </div>

      {/* FINAL CTA */}
      <div className="py-16 px-4">
        <CircleBorder>
          <FinalCTASection
            data={finalData}
            translations={{ finalhome: final }}
            countryName={countryName}
          />
        </CircleBorder>
      </div>
    </main>
  );
}
