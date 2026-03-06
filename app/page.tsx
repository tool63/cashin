"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

import Background from "@/components/Background";
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

/* Live Components */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), { ssr: false });
const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), { ssr: false });
const LiveOfferCompletion = dynamic(() => import("@/components/homepage/LiveOfferCompletion"), { ssr: false });
const LiveWithdrawals = dynamic(() => import("@/components/homepage/LiveWithdrawals"), { ssr: false });

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

      <main className="relative min-h-screen bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">

        {/* HERO */}
        <section>
          <HeroSection />
        </section>

        {/* LIVE ACTIVITY */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <LiveJoining />
          <LiveEarnings />
          <LiveOfferCompletion />
          <LiveWithdrawals />
        </section>

        {/* FEATURES */}
        <Reveal>
          <FeaturesSection />
        </Reveal>

        {/* TASKS */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <TasksSection />
        </section>

        {/* OFFERS */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <RevealWithBorder>
            <HighPayingOffers />
          </RevealWithBorder>
        </section>

        {/* TRUST */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <TrustSection />
        </section>

        {/* PAYMENTS */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <PaymentSection />
        </section>

        {/* FAQ (with props) */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <FAQ
            faqs={[
              { q: "How do I earn?", a: "Complete tasks and offers to earn rewards." },
              { q: "When do I get paid?", a: "Withdraw anytime after reaching minimum balance." },
              { q: "Is it free?", a: "Yes, joining and earning are completely free." },
            ]}
          />
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <FinalCTASection />
        </section>

      </main>
    </>
  );
}
