import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

/* =========================
   Loading Skeleton
========================= */
const SectionSkeleton = () => (
  <div className="h-32 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
);

/* =========================
   Lazy Loaded Sections
========================= */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), {
  ssr: false,
  loading: SectionSkeleton,
});

const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), {
  ssr: false,
  loading: SectionSkeleton,
});

const LiveOfferCompletion = dynamic(
  () => import("@/components/homepage/LiveOfferCompletion"),
  { ssr: false, loading: SectionSkeleton }
);

const LiveWithdrawals = dynamic(
  () => import("@/components/homepage/LiveWithdrawals"),
  { ssr: false, loading: SectionSkeleton }
);

const TasksSection = dynamic(() => import("@/components/homepage/TasksSection"), {
  loading: SectionSkeleton,
});

const HighPayingOffers = dynamic(
  () => import("@/components/homepage/HighPayingOffers"),
  { loading: SectionSkeleton }
);

const TrustSection = dynamic(() => import("@/components/homepage/TrustSection"), {
  loading: SectionSkeleton,
});

const PaymentSection = dynamic(
  () => import("@/components/homepage/PaymentSection"),
  { loading: SectionSkeleton }
);

const FeaturesSection = dynamic(
  () => import("@/components/homepage/FeaturesSection"),
  { loading: SectionSkeleton }
);

const FinalCTASection = dynamic(
  () => import("@/components/homepage/FinalCTASection"),
  { loading: SectionSkeleton }
);

/* =========================
   Lazy Loading Wrapper (Intersection Observer)
========================= */
function LazySection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "200px",
  });

  return <div ref={ref}>{inView ? children : <SectionSkeleton />}</div>;
}

/* =========================
   Dynamic Metadata (Server-Side)
========================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
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
  } catch (error) {
    console.error("Metadata generation failed:", error);

    return {
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
    };
  }
}

/* =========================
   Homepage Component
========================= */
export default function HomePage() {
  const [seo, setSeo] = useState<SEOOutput | null>(null);

  /* =========================
     Hydrate SEO Client-Side (Non-Blocking)
  ========================== */
  useEffect(() => {
    let mounted = true;

    buildSEO({ route: "/", locale: SEO_CONFIG.defaultLocale })
      .then((result) => {
        if (mounted) setSeo(result);
      })
      .catch((err) => console.error("SEO hydration failed:", err));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* Structured Data & Meta Tags */}
      {seo && <SeoRenderer seo={seo} />}

      <main className="bg-white text-gray-900 transition-colors duration-300 dark:bg-[#070A14] dark:text-white">

        {/* Hero (Critical LCP) */}
        <HeroSection />

        {/* Live Activity (Lazy) */}
        <section aria-label="Live platform activity">
          <LazySection><LiveJoining /></LazySection>
          <LazySection><LiveEarnings /></LazySection>
          <LazySection><LiveOfferCompletion /></LazySection>
          <LazySection><LiveWithdrawals /></LazySection>
        </section>

        {/* Core Earning Methods */}
        <LazySection><TasksSection /></LazySection>

        {/* High Paying Offers */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <LazySection><HighPayingOffers /></LazySection>
        </section>

        {/* Trust */}
        <LazySection><TrustSection /></LazySection>

        {/* Payments */}
        <LazySection><PaymentSection /></LazySection>

        {/* Features */}
        <LazySection><FeaturesSection /></LazySection>

        {/* Final CTA */}
        <LazySection><FinalCTASection /></LazySection>

      </main>
    </>
  );
}
