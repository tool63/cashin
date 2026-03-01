import dynamic from "next/dynamic";
import { buildSEO } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

/* =========================
   Core Above-the-Fold
========================= */
import HeroSection from "@/components/homepage/HeroSection";

/* =========================
   Lazy Loaded Sections
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
   Dynamic Metadata
========================= */
export async function generateMetadata() {
  const seo = buildSEO({
    route: "/",
    locale: SEO_CONFIG.defaultLocale,
  });

  return {
    ...seo.metadata,
    alternates: {
      canonical: seo.canonical,
      languages: seo.hreflang,
    },
    robots: seo.metadata?.robots,
  };
}

/* =========================
   Homepage Component
========================= */
export default function HomePage() {
  const seo = buildSEO({
    route: "/",
    locale: SEO_CONFIG.defaultLocale,
  });

  return (
    <>
      {/* Structured Data */}
      {seo.structuredData?.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      <main className="bg-white text-gray-900 transition-colors duration-300 dark:bg-[#070A14] dark:text-white">

        {/* Hero (Critical LCP) */}
        <HeroSection />

        {/* Live Activity */}
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

        {/* Trust */}
        <TrustSection />

        {/* Payments */}
        <PaymentSection />

        {/* Features */}
        <FeaturesSection />

        {/* Final CTA */}
        <FinalCTASection />

      </main>
    </>
  );
}
