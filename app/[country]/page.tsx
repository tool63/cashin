import dynamic from "next/dynamic";

import { getCountry, isValidCountryCode, type CountryCode } from "@/app/core/countries";
import { loadAllTranslations } from "@/app/core/i18n/loader";

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

/* FAQ */
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

  /* 🌐 LANGUAGE DETECTION */
  const language = countryData.language || "en";

  /* 🌐 LOAD TRANSLATIONS */
  const t = await loadAllTranslations(language);

  /* SEO */
  const title = `Earn Money Online in ${countryName} (${currentYear})`;
  const description = `Earn real money online in ${countryName}.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  /* FAQ */
  const faqs = [
    {
      q: `Is it really possible to earn money online in ${countryName}?`,
      a: `Yes, many users in ${countryName} earn real money every day by completing simple online tasks such as surveys, downloading apps, and testing services.`,
    },
    {
      q: `How much can I realistically earn?`,
      a: `Most users earn between $50 to $500 per month depending on activity and consistency.`,
    },
    {
      q: `Is this platform safe and legit?`,
      a: `Yes, the platform is secure and trusted with encrypted transactions.`,
    },
    {
      q: `How do I start earning money quickly?`,
      a: `Create an account, complete tasks, and focus on high-paying offers.`,
    },
    {
      q: `What payment methods are available in ${countryName}?`,
      a: `PayPal, crypto, Payoneer, and gift cards.`,
    },
    {
      q: `How fast are withdrawals processed?`,
      a: `Usually within 24–48 hours.`,
    },
    {
      q: `Do I need to pay anything to join?`,
      a: `No, it's completely free.`,
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
      <Section>
        <HeroSection data={t.homepage.hero} />
      </Section>

      {/* LIVE */}
      <Section><LiveJoining /></Section>
      <Section><LiveEarnings /></Section>
      <Section><LiveOfferCompletion /></Section>
      <Section><LiveWithdrawals /></Section>

      {/* CORE */}
      <Section>
        <StatsSection data={t.homepage.stats} />
      </Section>

      <Section>
        <FeaturesSection data={t.homepage.features} />
      </Section>

      <Section>
        <TasksSection data={t.homepage.tasks} />
      </Section>

      <Section>
        <HighPayingOffers data={t.homepage.high_paying_offers} />
      </Section>

      {/* TRUST */}
      <Section>
        <TrustSection data={t.homepage.trust} />
      </Section>

      <Section>
        <TestimonialSection data={t.homepage.testimonials} />
      </Section>

      <Section>
        <PaymentSection data={t.homepage.payment} />
      </Section>

      {/* FAQ */}
      <Section>
        <div className="w-full max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t.homepage.faq?.title || "Frequently Asked Questions"}
          </h2>

          <FAQ faqs={faqs} />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <FinalCTASection data={t.homepage.final_cta} />
      </Section>

      <div className="h-12" />
    </main>
  );
}
