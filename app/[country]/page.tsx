import dynamic from "next/dynamic";

import { getCountry, isValidCountryCode, type CountryCode } from "@/app/core/countries";

/* Layout / Animations */
import CircleBorder from "@/components/animations/CircleBorder";
import OpeningStyle from "@/components/animations/openingstyle";
import { Card, CardGrid } from "@/components/animations/container";

/* Sections */
import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import TasksSection from "@/components/homepage/TasksSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";
import StatsSection from "@/components/homepage/StatsSection";
import TestimonialSection from "@/components/homepage/TestimonialSection";

/* Live Sections */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), { ssr: false });
const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), { ssr: false });
const LiveOfferCompletion = dynamic(() => import("@/components/homepage/LiveOfferCompletion"), { ssr: false });
const LiveWithdrawals = dynamic(() => import("@/components/homepage/LiveWithdrawals"), { ssr: false });

/* SEO */
import { generateJsonLd } from "@/components/SEO/schema";
const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"), { ssr: false });

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
  const countryData = getCountry(country);

  if (!countryData) return null;

  const countryName = formatCountryName(country);
  const currentYear = new Date().getFullYear();

  /* SEO */
  const title = `Earn Money Online in ${countryName} (${currentYear})`;
  const description = `Earn real money online in ${countryName} by completing surveys, playing games, testing apps, and finishing simple tasks. Start earning today with fast payouts.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* 🔥 HIGH-VALUE SEO FAQ */
  const faqs = [
    {
      q: `Is it really possible to earn money online in ${countryName}?`,
      a: `Yes, thousands of users in ${countryName} are earning real money daily through online platforms like Cashog. By completing surveys, installing apps, and finishing simple tasks, you can generate a steady side income from home without any investment.`,
    },
    {
      q: `How much money can I earn from Cashog in ${countryName}?`,
      a: `Your earnings depend on your activity level. Most active users in ${countryName} earn between $50 to $500 per month by consistently completing high-paying offers, surveys, and tasks available on the platform.`,
    },
    {
      q: `Is Cashog safe and legit to use?`,
      a: `Yes, Cashog is a secure and trusted platform used by thousands of users worldwide. All transactions are protected with encryption, and payouts are processed through reliable payment methods ensuring your earnings are safe.`,
    },
    {
      q: `How do I start earning money online quickly?`,
      a: `Getting started is simple. Sign up for free, complete your profile, and begin taking surveys, downloading apps, or completing offers. The more active you are, the faster you can earn money online.`,
    },
    {
      q: `What payment methods are available in ${countryName}?`,
      a: `Users in ${countryName} can withdraw earnings through popular payment methods such as PayPal, Payoneer, cryptocurrency, and gift cards. Payout options may vary depending on availability in your region.`,
    },
    {
      q: `How fast can I withdraw my earnings?`,
      a: `Most withdrawals are processed within 24 to 48 hours. Some instant payout methods are also available, allowing you to receive your earnings quickly after completing tasks.`,
    },
    {
      q: `Do I need to pay anything to join?`,
      a: `No, Cashog is completely free to join. There are no hidden fees or subscription costs. You can start earning money online immediately without any upfront investment.`,
    },
  ];

  /* =============================== */
  const Section = ({ children }: { children: React.ReactNode }) => (
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

  /* =============================== */
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
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* HERO */}
      <Section><HeroSection /></Section>

      {/* LIVE */}
      <Section><LiveJoining /></Section>
      <Section><LiveEarnings /></Section>
      <Section><LiveOfferCompletion /></Section>
      <Section><LiveWithdrawals /></Section>

      {/* CORE */}
      <Section><StatsSection /></Section>
      <Section><FeaturesSection /></Section>
      <Section><TasksSection /></Section>
      <Section><HighPayingOffers /></Section>

      {/* TRUST */}
      <Section><TrustSection /></Section>
      <Section><TestimonialSection /></Section>
      <Section><PaymentSection /></Section>

      {/* 🔥 PREMIUM FAQ */}
      <Section>
        <div className="text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <CardGrid cols={{ default: 1, md: 2 }}>
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>
              </Card>
            ))}
          </CardGrid>
        </div>
      </Section>

      {/* CTA */}
      <Section><FinalCTASection /></Section>

      <div className="h-12" />
    </main>
  );
}
