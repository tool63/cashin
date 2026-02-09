"use client";

import Meta from "@/components/seo/SeoEngine";

/* ================= HOMEPAGE DATA ================= */
import { earningOptions } from "@/components/homepage/earningOptions";

/* ================= HOMEPAGE SECTIONS ================= */
import HeroSection from "@/components/homepage/HeroSection";
import TasksSection from "@/components/homepage/TasksSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import LiveJoining from "@/components/homepage/LiveJoining";
import LiveOfferCompletion from "@/components/homepage/LiveOfferCompletion";
import LiveEarnings from "@/components/homepage/LiveEarnings";
import LiveWithdrawals from "@/components/homepage/LiveWithdrawals";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

/* ================= PAGE ================= */
export default function HomePage() {
  const title = "Cashog - Earn Rewards Online";
  const description =
    "Earn real money online by completing surveys, playing games, installing apps, and more. Fast payouts and trusted worldwide.";

  return (
    <>
      <Meta title={title} description={description} />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">
        {/* HERO */}
        <HeroSection />

        {/* LIVE ACTIVITY */}
        <LiveJoining />
        <LiveOfferCompletion />
        <LiveEarnings />
        <LiveWithdrawals />

        {/* TASKS & OFFERS */}
        <TasksSection />
        <HighPayingOffers />

        {/* TRUST & PAYMENTS */}
        <TrustSection />
        <PaymentSection />

        {/* FEATURES */}
        <FeaturesSection />

        {/* FINAL CTA */}
        <FinalCTASection />
      </main>
    </>
  );
}
