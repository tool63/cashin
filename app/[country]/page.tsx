import dynamic from "next/dynamic";
import { buildSEO } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import FAQ from "@/components/faq/FAQ";

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
    return null; // layout already handles redirect
  }

  const country = countryParam as CountryCode;
  const countryData = getCountry(country);

  // -------------------------------
  // 🌐 SEO (COUNTRY BASED)
  // -------------------------------
  const seo = await buildSEO({
    route: `/${country}`,
    locale: countryData.defaultLanguage || SEO_CONFIG.defaultLocale,
    title: `Earn Money Online in ${countryData.name}`,
    description: `Start earning real money online in ${countryData.name} with Cashog. Complete surveys, play games, and get paid instantly.`,
    keywords: [
      "earn money online",
      "make money online",
      "paid surveys",
      "earn money playing games",
      "cash rewards",
      "online income",
      "Cashog",
      countryData.name,
    ],
  });

  const handleOpenAuth = (type: "login" | "signup" | "reset") => {
    console.log("Open auth modal:", type);
  };

  // -------------------------------
  // 🎯 PAGE UI
  // -------------------------------
  return (
    <main className="relative min-h-screen bg-transparent text-gray-900 dark:text-white">

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

      {/* FAQ */}
      <OpeningStyle>
        <RevealWithBorder>
          <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>

            <FAQ
              faqs={[
                { q: "How can I start earning money online?", a: "Simply sign up and start completing tasks." },
                { q: "Is this website legit?", a: "Yes, we have paid millions to our users." },
                { q: "How much can I earn?", a: "Active users earn $100-$500 monthly." },
                { q: "Payment methods?", a: "PayPal, Payoneer, Bitcoin, and gift cards." },
                { q: "Do I need to pay?", a: "No, joining is 100% free." },
                { q: "Which countries are supported?", a: `We support users in ${countryData.name} and many other countries.` },
                { q: "How fast are withdrawals?", a: "Usually within 24-48 hours." },
              ]}
            />
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
