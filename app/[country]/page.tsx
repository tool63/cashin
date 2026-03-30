import dynamic from "next/dynamic";

import { getCountry, isValidCountryCode, type CountryCode } from "@/app/core/countries";

/* Layout / Animations */
import CircleBorder from "@/components/animations/CircleBorder";
import OpeningStyle from "@/components/animations/openingstyle";

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

/* FAQ (ACCORDION DESIGN) */
import FAQ from "@/components/faq/FAQ";

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

  /* 🔥 HIGH-QUALITY FAQ (FOR ACCORDION) */
  const faqs = [
    {
      q: `Is it really possible to earn money online in ${countryName}?`,
      a: `Yes, many users in ${countryName} earn real money every day by completing simple online tasks such as surveys, downloading apps, and testing services. With consistent effort, you can build a steady side income from home.`,
    },
    {
      q: `How much can I realistically earn?`,
      a: `Your earnings depend on how active you are. Most users earn between $50 to $500 per month by regularly completing offers and surveys. High-paying tasks and consistency can significantly increase your income.`,
    },
    {
      q: `Is this platform safe and legit?`,
      a: `Yes, the platform is secure and trusted by thousands of users worldwide. All transactions are encrypted, and payments are processed through reliable payout systems to ensure safety and transparency.`,
    },
    {
      q: `How do I start earning money quickly?`,
      a: `Simply create a free account, complete your profile, and start completing available tasks. Focus on high-paying offers and daily activities to maximize your earnings quickly.`,
    },
    {
      q: `What payment methods are available in ${countryName}?`,
      a: `Users can withdraw earnings through PayPal, Payoneer, cryptocurrency, and gift cards. The available options may vary depending on your country.`,
    },
    {
      q: `How fast are withdrawals processed?`,
      a: `Most withdrawals are processed within 24 to 48 hours. Some methods offer instant payouts, allowing you to access your earnings quickly.`,
    },
    {
      q: `Do I need to pay anything to join?`,
      a: `No, the platform is completely free to join. There are no hidden charges, and you can start earning immediately without any investment.`,
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

      {/* 🔥 FAQ (ACCORDION DESIGN) */}
      <Section>
        <div className="w-full max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Frequently Asked Questions
          </h2>

          <FAQ faqs={faqs} />
        </div>
      </Section>

      {/* CTA */}
      <Section><FinalCTASection /></Section>

      <div className="h-12" />
    </main>
  );
}
