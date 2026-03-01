import dynamic from "next/dynamic";
import { buildSeo } from "@/lib/seo";

/* =========================
   Core Above-the-Fold
========================= */
import HeroSection from "@/components/homepage/HeroSection";

/* =========================
   Lazy Loaded Sections
   (Improves LCP + TTFB)
========================= */
const LiveJoining = dynamic(
  () => import("@/components/homepage/LiveJoining"),
  { ssr: false }
);

const LiveEarnings = dynamic(
  () => import("@/components/homepage/LiveEarnings"),
  { ssr: false }
);

const LiveOfferCompletion = dynamic(
  () => import("@/components/homepage/LiveOfferCompletion"),
  { ssr: false }
);

const LiveWithdrawals = dynamic(
  () => import("@/components/homepage/LiveWithdrawals"),
  { ssr: false }
);

const TasksSection = dynamic(
  () => import("@/components/homepage/TasksSection")
);

const HighPayingOffers = dynamic(
  () => import("@/components/homepage/HighPayingOffers")
);

const TrustSection = dynamic(
  () => import("@/components/homepage/TrustSection")
);

const PaymentSection = dynamic(
  () => import("@/components/homepage/PaymentSection")
);

const FeaturesSection = dynamic(
  () => import("@/components/homepage/FeaturesSection")
);

const FinalCTASection = dynamic(
  () => import("@/components/homepage/FinalCTASection")
);

/* =========================
   SEO Metadata
========================= */

export const metadata = buildSeo({
  title: "Cashog - Earn Real Money Online",
  description:
    "Earn real money online by completing surveys, playing games, installing apps, watching videos, and completing high-paying offers.",
  path: "/",
  type: "website",
});

/* =========================
   Homepage Component
========================= */

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900 transition-colors duration-300 dark:bg-[#070A14] dark:text-white">

      {/* Hero (Critical for LCP) */}
      <HeroSection />

      {/* Social Proof (Live Data) */}
      <section aria-label="Live platform activity">
        <LiveJoining />
        <LiveEarnings />
        <LiveOfferCompletion />
        <LiveWithdrawals />
      </section>

      {/* Core Earning Methods */}
      <TasksSection />

      {/* High Paying Offers */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <HighPayingOffers />
      </section>

      {/* Trust & Credibility */}
      <TrustSection />

      {/* Payment Methods */}
      <PaymentSection />

      {/* Platform Features */}
      <FeaturesSection />

      {/* Conversion Section */}
      <FinalCTASection />

    </main>
  );
}
