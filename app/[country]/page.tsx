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

/* FAQ */
import FAQ from "@/components/faq/FAQ";

/* SEO */
import { generateJsonLd } from "@/components/SEO/schema";
const SeoRenderer = dynamic(() => import("@/components/SEO/SeoRenderer"), { ssr: false });

/* ===============================
   🌍 COUNTRY FORMAT
=============================== */
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

/* ===============================
   🚀 PAGE
=============================== */
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

  /* FAQ */
  const faqs = [
    { q: `Is it legit in ${countryName}?`, a: "Yes, users are earning daily." },
    { q: "How to start?", a: "Sign up and complete offers." },
  ];

  /* ===============================
     FIXED SECTION WRAPPER (IMPORTANT)
  =============================== */
  const Section = ({ children }: { children: React.ReactNode }) => (
    <OpeningStyle>
      <div className="w-full px-4 py-10 flex justify-center">
        
        {/* 🔥 IMPORTANT FIX FOR BORDER */}
        <div className="w-full max-w-7xl">
          <CircleBorder>
            <div className="w-full">
              {children}
            </div>
          </CircleBorder>
        </div>

      </div>
    </OpeningStyle>
  );

  /* ===============================
     UI
  =============================== */
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

      {/* ================= HERO ================= */}
      <Section>
        <HeroSection />
      </Section>

      {/* ================= LIVE ================= */}
      <Section>
        <LiveJoining />
      </Section>

      <Section>
        <LiveEarnings />
      </Section>

      <Section>
        <LiveOfferCompletion />
      </Section>

      <Section>
        <LiveWithdrawals />
      </Section>

      {/* ================= STATS ================= */}
      <Section>
        <StatsSection />
      </Section>

      {/* ================= FEATURES ================= */}
      <Section>
        <FeaturesSection />
      </Section>

      {/* ================= TASKS ================= */}
      <Section>
        <TasksSection />
      </Section>

      {/* ================= OFFERS ================= */}
      <Section>
        <HighPayingOffers />
      </Section>

      {/* ================= TRUST ================= */}
      <Section>
        <TrustSection />
      </Section>

      {/* ================= TESTIMONIAL ================= */}
      <Section>
        <TestimonialSection />
      </Section>

      {/* ================= PAYMENT ================= */}
      <Section>
        <PaymentSection />
      </Section>

      {/* ================= FAQ ================= */}
      <Section>
        <div className="text-center w-full">
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <CardGrid cols={{ default: 1, md: 2 }}>
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.a}
                </p>
              </Card>
            ))}
          </CardGrid>
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <Section>
        <FinalCTASection />
      </Section>

      <div className="h-12" />
    </main>
  );
}
