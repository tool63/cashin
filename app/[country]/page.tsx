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
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* 🔥 UPDATED SEO FAQ */
  const faqs = [
    {
      q: `Is it really possible to earn money online in ${countryName}?`,
      a: `Yes, thousands of users in ${countryName} are earning real money daily by completing simple tasks like surveys, app downloads, and offers. With consistent activity, you can build a reliable side income from home.`,
    },
    {
      q: `How much can I earn from this platform?`,
      a: `Earnings depend on your activity. Many users earn between $50 to $500 per month by regularly completing high-paying offers and surveys available on the platform.`,
    },
    {
      q: `Is this platform safe and legit?`,
      a: `Yes, the platform is secure and trusted. All transactions are encrypted, and users receive payments through reliable and verified payout methods.`,
    },
    {
      q: `How do I start earning quickly?`,
      a: `Simply sign up for free, complete your profile, and start completing available tasks. The more offers you complete, the faster you can earn money.`,
    },
    {
      q: `What payment methods are available?`,
      a: `You can withdraw your earnings using PayPal, Payoneer, cryptocurrency, and gift cards, depending on availability in your region.`,
    },
    {
      q: `How fast are withdrawals processed?`,
      a: `Most withdrawals are processed within 24 to 48 hours, with some instant payout options available.`,
    },
    {
      q: `Do I need to pay to join?`,
      a: `No, the platform is completely free to join. There are no hidden fees or subscription costs.`,
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

      {/* 🔥 IMPROVED FAQ DESIGN */}
      <Section>
        <div className="text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <CardGrid cols={{ default: 1, md: 2 }}>
            {faqs.map((faq, i) => (
              <Card
                key={faq.q}
                className="text-left p-6 md:p-8 hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-800 rounded-xl"
              >
                {/* Question */}
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {faq.q}
                </h3>

                {/* Answer */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>

                {/* subtle divider */}
                <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full" />
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
