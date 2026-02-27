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
import { buildSeo } from "@/lib/seo";

export const metadata = buildSeo({
  title: "Cashog - Earn Real Money Online",
  description:
    "Earn real money online by completing surveys, playing games, installing apps, watching videos, and completing high-paying offers.",
});

export default function HomePage() {
  return (
    <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">
      <HeroSection />

      <LiveJoining />
      <LiveEarnings />
      <LiveOfferCompletion />
      <LiveWithdrawals />

      <TasksSection />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <HighPayingOffers />
      </div>

      <TrustSection />
      <PaymentSection />
      <FeaturesSection />
      <FinalCTASection />
    </main>
  );
}
