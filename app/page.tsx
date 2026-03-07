"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

import Background from "@/components/Background";
import FAQ from "@/components/faq/FAQ";

/* Homepage Sections */
import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import TasksSection from "@/components/homepage/TasksSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

/* Live Components */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), { ssr: false });
const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), { ssr: false });
const LiveOfferCompletion = dynamic(() => import("@/components/homepage/LiveOfferCompletion"), { ssr: false });
const LiveWithdrawals = dynamic(() => import("@/components/homepage/LiveWithdrawals"), { ssr: false });

/* SEO hydration */
export default function HomePage() {
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  // During SSR, return a simpler version to prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        <Background />
        <main className="relative min-h-screen bg-transparent text-gray-900 dark:text-white">
          <div className="animate-pulse p-8">
            <div className="h-96 bg-gray-200/20 dark:bg-gray-700/20 rounded-lg mb-4"></div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {seo && <SeoRenderer seo={seo} />}

      <Background />

      <main className="relative min-h-screen bg-transparent text-gray-900 dark:text-white">

        {/* =====================================================
            SECTION 1: HERO (NO BORDER)
        ===================================================== */}
        <section className="bg-transparent">
          <HeroSection />
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent dark:via-yellow-500/30 my-4"></div>

        {/* =====================================================
            SECTION 2: LIVE ACTIVITY (4 components) - WITH BORDER
        ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 py-10 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
              <LiveJoining />
            </div>
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
              <LiveEarnings />
            </div>
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
              <LiveOfferCompletion />
            </div>
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
              <LiveWithdrawals />
            </div>
          </div>
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent dark:via-green-500/30 my-4"></div>

        {/* =====================================================
            SECTION 3: FEATURES - WITH BORDER
        ===================================================== */}
        <section className="bg-transparent py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
              <FeaturesSection />
            </div>
          </div>
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent dark:via-yellow-500/30 my-4"></div>

        {/* =====================================================
            SECTION 4: TASKS - WITH BORDER
        ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
            <TasksSection />
          </div>
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent dark:via-green-500/30 my-4"></div>

        {/* =====================================================
            SECTION 5: HIGH PAYING OFFERS - WITH BORDER
        ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 py-8 bg-transparent">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
            <HighPayingOffers />
          </div>
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent dark:via-yellow-500/30 my-4"></div>

        {/* =====================================================
            SECTION 6: TRUST - WITH BORDER
        ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
            <TrustSection />
          </div>
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent dark:via-green-500/30 my-4"></div>

        {/* =====================================================
            SECTION 7: PAYMENTS - WITH BORDER
        ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
            <PaymentSection />
          </div>
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent dark:via-yellow-500/30 my-4"></div>

        {/* =====================================================
            SECTION 8: FAQ - WITH BORDER
        ===================================================== */}
        <section className="max-w-3xl mx-auto px-4 py-12 bg-transparent">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-white/10 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <FAQ
              faqs={[
                { q: "How do I earn?", a: "Complete tasks and offers to earn rewards." },
                { q: "When do I get paid?", a: "Withdraw anytime after reaching minimum balance." },
                { q: "Is it free?", a: "Yes, joining and earning are completely free." },
              ]}
            />
          </div>
        </section>

        {/* Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent dark:via-green-500/30 my-4"></div>

        {/* =====================================================
            SECTION 9: FINAL CTA - WITH BORDER
        ===================================================== */}
        <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-white/10 shadow-lg">
            <FinalCTASection />
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className="h-12"></div>

      </main>
    </>
  );
}
