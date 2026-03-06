"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import FAQ from "@/components/faq/FAQ";

import Reveal from "@/components/animations/Reveal";
import RevealWithBorder from "@/components/animations/RevealWithBorder";

/* Homepage Sections */
import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import TasksSection from "@/components/homepage/TasksSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

/* Live Components (Lazy) */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), { ssr: false });
const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), { ssr: false });
const LiveOfferCompletion = dynamic(() => import("@/components/homepage/LiveOfferCompletion"), { ssr: false });
const LiveWithdrawals = dynamic(() => import("@/components/homepage/LiveWithdrawals"), { ssr: false });

/* Loading */
const SectionSkeleton = () => (
  <div className="h-32 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
);

function LazySection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "200px",
  });

  return <div ref={ref}>{inView ? children : <SectionSkeleton />}</div>;
}

/* SEO hydration */
export default function HomePage() {
  const [seo, setSeo] = useState<SEOOutput | null>(null);

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
      {seo && <SeoRenderer seo={seo} />}

      <Background />

      <main className="relative min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#070A14] dark:text-white">

        {/* HERO SECTION (Premium Gradient Style) */}
        <section className="relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 opacity-90" />

              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-16">
                <HeroSection />

                <div className="text-center mt-4">
                  <TypingText
                    text={[
                      "Earn money online",
                      "Complete tasks and withdraw",
                      "Join thousands of users",
                    ]}
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <Reveal>
                    <a
                      href="/signup"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 text-black font-semibold shadow-lg"
                    >
                      Get Started
                    </a>
                  </Reveal>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* LIVE ACTIVITY */}
        <section aria-label="Live platform activity" className="max-w-7xl mx-auto px-4 py-10">
          <RevealWithBorder
            gradientFrom="from-emerald-400"
            gradientVia="via-teal-400"
            gradientTo="to-cyan-400"
          >
            <LazySection><LiveJoining /></LazySection>
            <LazySection><LiveEarnings /></LazySection>
            <LazySection><LiveOfferCompletion /></LazySection>
            <LazySection><LiveWithdrawals /></LazySection>
          </RevealWithBorder>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <Reveal>
            <FeaturesSection />
          </Reveal>
        </section>

        {/* TASKS */}
        <LazySection>
          <section className="max-w-7xl mx-auto px-4 py-12">
            <TasksSection />
          </section>
        </LazySection>

        {/* HIGH PAYING OFFERS */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <RevealWithBorder
            gradientFrom="from-blue-400"
            gradientVia="via-cyan-400"
            gradientTo="to-sky-400"
          >
            <HighPayingOffers />
          </RevealWithBorder>
        </section>

        {/* TRUST SECTION */}
        <LazySection>
          <section className="max-w-7xl mx-auto px-4 py-12">
            <TrustSection />
          </section>
        </LazySection>

        {/* PAYMENTS */}
        <LazySection>
          <section className="max-w-7xl mx-auto px-4 py-12">
            <PaymentSection />
          </section>
        </LazySection>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <RevealWithBorder
            gradientFrom="from-orange-400"
            gradientVia="via-amber-400"
            gradientTo="to-yellow-400"
          >
            <FAQ />
          </RevealWithBorder>
        </section>

        {/* FINAL CTA */}
        <LazySection>
          <section className="max-w-7xl mx-auto px-4 py-12">
            <FinalCTASection />
          </section>
        </LazySection>

      </main>
    </>
  );
}
