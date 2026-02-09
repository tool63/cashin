"use client";

import Meta from "@/components/seo/SeoEngine";

/* ================== HOMEPAGE SECTIONS ================== */
import HeroSection from "@/components/homepage/HeroSection";
import TasksSection from "@/components/homepage/TasksSection";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

/* ================== LIVE SECTIONS (OPTIONAL) ================== */
import LiveJoining from "@/components/homepage/LiveJoining";
import LiveEarnings from "@/components/homepage/LiveEarnings";
import LiveOfferCompletion from "@/components/homepage/LiveOfferCompletion";
import LiveWithdrawals from "@/components/homepage/LiveWithdrawals";

/* ================== HIGH PAYING OFFERS ================== */
import HighPayingOffers from "@/components/homepage/HighPayingOffers";

export default function HomePage() {
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
        <HighPayingOffers />

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
