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
import TasksSection from "@/components/homepage/TasksSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import LiveEarnings from "@/components/homepage/LiveEarnings";
import LiveWithdrawals from "@/components/homepage/LiveWithdrawals";
import LiveJoining from "@/components/homepage/LiveJoining";
import LiveOfferCompletion from "@/components/homepage/LiveOfferCompletion";
import StatsSection from "@/components/homepage/StatsSection";
import TrustSection from "@/components/homepage/TrustSection";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

import FAQ from "@/components/animations/FAQ";
import CircleBorder from "@/components/animations/CircleBorder";

import { generateJsonLd } from "@/components/SEO/schema";

/* ================= HELPER ================= */

async function loadSectionTranslation(language: string, section: string) {
  try {
    const file = await import(`@/app/locales/${language}/${section}.json`);
    return file.default;
  } catch (error) {
    console.warn(`Missing translation: ${section} (${language})`);
    return {};
  }
}

/* ================= LANGUAGE ================= */

function getLanguage(country: CountryCode): SupportedLanguage {
  const cookieStore = cookies();

  const override = cookieStore.get(COOKIE_KEYS.USER_LANGUAGE_OVERRIDE)?.value;
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
  const tasks = await loadSectionTranslation(language, "taskshome");
  const payments = await loadSectionTranslation(language, "paymentshome");
  const highOffers = await loadSectionTranslation(language, "highoffershome");
  const liveEarnings = await loadSectionTranslation(language, "liveearningshome");
  const withdrawals = await loadSectionTranslation(language, "withdrawalshome");
  const joining = await loadSectionTranslation(language, "livejoininghome");
  const offerCompletion = await loadSectionTranslation(language, "liveoffercompletionhome");
  const stats = await loadSectionTranslation(language, "statshome");
  const trust = await loadSectionTranslation(language, "trusthome");
  const testimonials = await loadSectionTranslation(language, "testimonialshome");
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

  /* ================= DATA ================= */

  const heroData = {
    headline: hero?.headline?.replace(/\{country\}/g, countryName),
    subtext: hero?.subtext?.replace(/\{country\}/g, countryName),
  };

  const tasksData = {
    title: tasks?.title?.replace(/\{country\}/g, countryName),
    cta: tasks?.cta?.replace(/\{country\}/g, countryName),
    items: tasks?.items || [],
  };

  const paymentData = {
    title: payments?.title?.replace(/\{country\}/g, countryName),
    description: payments?.description?.replace(/\{country\}/g, countryName),
    methods: payments?.methods || {},
  };

  const offersData = {
    title: highOffers?.title?.replace(/\{country\}/g, countryName),
    description: highOffers?.description?.replace(/\{country\}/g, countryName),
    categories: highOffers?.categories || [],
  };

  const liveData = {
    title: liveEarnings?.title?.replace(/\{country\}/g, countryName),
    description: liveEarnings?.description?.replace(/\{country\}/g, countryName),
  };

  const withdrawalsData = {
    title: withdrawals?.title?.replace(/\{country\}/g, countryName),
    description: withdrawals?.description?.replace(/\{country\}/g, countryName),
    stats: withdrawals?.stats || {},
  };

  const joiningData = {
    title: joining?.title?.replace(/\{country\}/g, countryName),
    description: joining?.description?.replace(/\{country\}/g, countryName),
  };

  const offerCompletionData = {
    title: offerCompletion?.title?.replace(/\{country\}/g, countryName),
    description: offerCompletion?.description?.replace(/\{country\}/g, countryName),
  };

  const faqData = {
    title: faq?.title?.replace(/\{country\}/g, countryName),
    items: Array.isArray(faq?.items)
      ? faq.items
          .map((item: any) => ({
            q: item?.q?.replace(/\{country\}/g, countryName),
            a: item?.a?.replace(/\{country\}/g, countryName),
          }))
          .filter((item: any) => item.q && item.a)
      : [],
  };

  /* ================= RENDER ================= */

  return (
    <main className="flex flex-col items-center w-full">

      {structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      <CircleBorder>
        <HeroSection data={heroData} translations={typing} />
      </CircleBorder>

      <CircleBorder>
        <FeaturesSection data={features} translations={features} />
      </CircleBorder>

      <CircleBorder>
        <TasksSection data={tasksData} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <PaymentSection data={paymentData} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <HighPayingOffers data={offersData} />
      </CircleBorder>

      <CircleBorder>
        <LiveEarnings data={liveData} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <LiveJoining data={joiningData} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <LiveOfferCompletion data={offerCompletionData} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <LiveWithdrawals data={withdrawalsData} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <StatsSection data={stats} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <TrustSection data={trust} countryName={countryName} />
      </CircleBorder>

      <CircleBorder>
        <TestimonialSection data={testimonials} countryName={countryName} />
      </CircleBorder>

      {/* ✅ FIXED FAQ */}
      {faqData.items.length > 0 && (
        <CircleBorder>
          <FAQ
            title={faqData.title}
            items={faqData.items}
            countryName={countryName}
          />
        </CircleBorder>
      )}

      <CircleBorder>
        <FinalCTASection data={final} countryName={countryName} />
      </CircleBorder>

    </main>
  );
}
