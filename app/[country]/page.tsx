import dynamic from "next/dynamic";

/* Homepage Sections */
import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import TasksSection from "@/components/homepage/TasksSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";
import StatsSection from "@/components/homepage/StatsSection";
import TestimonialSection from "@/components/homepage/TestimonialSection";

/* Animation Components */
import OpeningStyle from "@/components/animations/openingstyle";
import RevealWithBorder from "@/components/animations/CircleBorder";

/* SEO */
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/jsonLd";

/* FAQ */
import FAQ from "@/components/faq/FAQ";

/* Country helpers */
import {
  getCountry,
  isValidCountryCode,
  type CountryCode,
} from "@/app/core/countries";

/* Live Components - client-only */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), { ssr: false });
const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), { ssr: false });
const LiveOfferCompletion = dynamic(() => import("@/components/homepage/LiveOfferCompletion"), { ssr: false });
const LiveWithdrawals = dynamic(() => import("@/components/homepage/LiveWithdrawals"), { ssr: false });

/* ===============================
   🌍 FORMAT COUNTRY NAME
=============================== */
function formatCountryName(code: string) {
  try {
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
  // -------------------------------
  // 🌍 VALIDATE COUNTRY
  // -------------------------------
  const countryParam = params?.country?.toLowerCase();

  if (!countryParam || !isValidCountryCode(countryParam)) {
    return null;
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);
  const countryName = formatCountryName(country);
  const currentYear = new Date().getFullYear();

  // -------------------------------
  // 🔥 SEO (FROM YOUR OLD LOGIC)
  // -------------------------------
  const title = `Earn Money Online in ${countryName} (${currentYear})`;
  const description = `Earn real money online in ${countryName}. Complete surveys, play games, and get paid instantly.`;

  const structuredData = generateJsonLd({
    path: `/${country}`,
    title,
    description,
    type: "low",
  });

  // -------------------------------
  // 📌 FAQ DATA
  // -------------------------------
  const faqs = [
    {
      q: `Is it legit in ${countryName}?`,
      a: `Yes, users are earning daily.`,
    },
    {
      q: `How to start?`,
      a: `Sign up and complete offers.`,
    },
  ];

  const handleOpenAuth = (type: "login" | "signup" | "reset") => {
    console.log("Open auth modal:", type);
  };

  // -------------------------------
  // 🎯 UI
  // -------------------------------
  return (
    <main className="relative min-h-screen bg-transparent text-gray-900 dark:text-white">

      {/* ✅ SEO */}
      <SeoRenderer
        path={`/${country}`}
        title={title}
        description={description}
        country={country}
      />

      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* ================= HERO ================= */}
      <OpeningStyle>
        <RevealWithBorder>
          <HeroSection onOpenAuth={handleOpenAuth} />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <StatsSection />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <LiveJoining />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <LiveEarnings />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <LiveOfferCompletion />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <LiveWithdrawals />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <FeaturesSection />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <TasksSection />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <HighPayingOffers />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <TestimonialSection />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <TrustSection />
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <PaymentSection />
        </RevealWithBorder>
      </OpeningStyle>

      {/* ================= FAQ ================= */}
      <OpeningStyle>
        <RevealWithBorder>
          <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>

            <FAQ faqs={faqs} />
          </section>
        </RevealWithBorder>
      </OpeningStyle>

      <OpeningStyle>
        <RevealWithBorder>
          <FinalCTASection />
        </RevealWithBorder>
      </OpeningStyle>

      <div className="h-12"></div>
    </main>
  );
}
