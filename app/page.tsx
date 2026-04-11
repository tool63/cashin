// app/page.tsx
import { cookies } from "next/headers";
import { Metadata } from "next";

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

function getGlobalLanguage(): SupportedLanguage {
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

  return "en";
}

/* ================= METADATA ================= */

export const metadata: Metadata = {
  title: "Earn Money Online Worldwide | Cashog",
  description: "Start earning real money online from anywhere in the world with Cashog. Complete tasks, play games, get cashback, and withdraw your earnings instantly.",
  keywords: "earn money online worldwide, make money fast global, online rewards international, cashback global, earn from anywhere",
  alternates: {
    canonical: "https://cashog.com",
  },
  openGraph: {
    title: "Earn Money Online Worldwide | Cashog",
    description: "Start earning real money online from anywhere in the world with Cashog. Complete tasks, play games, get cashback, and withdraw your earnings instantly.",
    url: "https://cashog.com",
    siteName: "Cashog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn Money Online Worldwide | Cashog",
    description: "Start earning real money online from anywhere in the world with Cashog. Complete tasks, play games, get cashback, and withdraw your earnings instantly.",
  },
};

/* ================= PAGE ================= */

export default async function GlobalHomePage() {
  const language = getGlobalLanguage();
  const countryName = "Worldwide";

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

  const title = "Earn Money Online Worldwide";
  const description = "Earn real money online from anywhere in the world.";

  const structuredData = generateJsonLd({
    path: "/",
    title,
    description,
    type: "low",
  });

  /* ================= DATA ================= */

  const heroData = {
    headline: hero?.headline?.replace(/\{country\}/g, countryName) || "Earn Money Online Worldwide",
    subtext: hero?.subtext?.replace(/\{country\}/g, countryName) || "Start earning real cash from anywhere in the world",
  };

  const tasksData = {
    title: tasks?.title?.replace(/\{country\}/g, countryName) || "Simple Tasks, Real Rewards",
    cta: tasks?.cta?.replace(/\{country\}/g, countryName) || "Start Earning Now",
    items: tasks?.items || [],
  };

  const paymentData = {
    title: payments?.title?.replace(/\{country\}/g, countryName) || "Fast & Secure Payments",
    description: payments?.description?.replace(/\{country\}/g, countryName) || "Get paid instantly via your preferred payment method",
    methods: payments?.methods || {},
  };

  const offersData = {
    title: highOffers?.title?.replace(/\{country\}/g, countryName) || "High Paying Offers",
    description: highOffers?.description?.replace(/\{country\}/g, countryName) || "Complete offers and earn big rewards",
    categories: highOffers?.categories || [],
  };

  const liveData = {
    title: liveEarnings?.title?.replace(/\{country\}/g, countryName) || "Live Earnings",
    description: liveEarnings?.description?.replace(/\{country\}/g, countryName) || "See what others are earning right now",
  };

  const withdrawalsData = {
    title: withdrawals?.title?.replace(/\{country\}/g, countryName) || "Recent Withdrawals",
    description: withdrawals?.description?.replace(/\{country\}/g, countryName) || "Real payouts to real users",
    stats: withdrawals?.stats || {},
  };

  const joiningData = {
    title: joining?.title?.replace(/\{country\}/g, countryName) || "New Members Joining",
    description: joining?.description?.replace(/\{country\}/g, countryName) || "Join thousands of satisfied earners",
  };

  const offerCompletionData = {
    title: offerCompletion?.title?.replace(/\{country\}/g, countryName) || "Completed Offers",
    description: offerCompletion?.description?.replace(/\{country\}/g, countryName) || "Tasks completed successfully",
  };

  const faqData = {
    title: faq?.title?.replace(/\{country\}/g, countryName) || "Frequently Asked Questions",
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

      {/* ✅ FAQ with TITLE */}
      {faqData.items.length > 0 && (
        <CircleBorder>
          <FAQ title={faqData.title} faqs={faqData.items} />
        </CircleBorder>
      )}

      <CircleBorder>
        <FinalCTASection data={final} countryName={countryName} />
      </CircleBorder>

    </main>
  );
}
