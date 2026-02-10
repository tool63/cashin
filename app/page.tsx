import Meta from "@/components/seo/SeoEngine";
import HeroSection from "@/components/homepage/HeroSection";
import TasksSection from "@/components/homepage/TasksSection";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

import LiveJoining from "@/components/homepage/LiveJoining";
import LiveEarnings from "@/components/homepage/LiveEarnings";
import LiveOfferCompletion from "@/components/homepage/LiveOfferCompletion";
import LiveWithdrawals from "@/components/homepage/LiveWithdrawals";

import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import { SkeletonRow } from "@/components/loading/loading";

// Make the page async so Next.js global loader can work
export default async function HomePage() {
  // Example: fetch data from API
  // Replace with your real API endpoints
  const highPayingOffers = await fetch("/api/high-paying-offers")
    .then((res) => res.json())
    .catch(() => []); // fallback to empty array if fetch fails

  return (
    <>
      {/* SEO */}
      <Meta
        title="Cashog - Earn Real Money Online"
        description="Earn real money online by completing surveys, playing games, installing apps, watching videos, and completing high-paying offers. Fast payouts, trusted worldwide."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">
        {/* HERO */}
        <HeroSection />

        {/* LIVE ACTIVITY */}
        <LiveJoining />
        <LiveEarnings />
        <LiveOfferCompletion />
        <LiveWithdrawals />

        {/* TASKS */}
        <TasksSection />

        {/* HIGH PAYING OFFERS */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {highPayingOffers.length === 0
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : <HighPayingOffers offers={highPayingOffers} />}
        </div>

        {/* TRUST */}
        <TrustSection />

        {/* PAYMENTS */}
        <PaymentSection />

        {/* FEATURES */}
        <FeaturesSection />

        {/* FINAL CTA */}
        <FinalCTASection />
      </main>
    </>
  );
}
