"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
import StatsSection from "@/components/homepage/StatsSection";
import TestimonialSection from "@/components/homepage/TestimonialSection";

/* Animation Components */
import OpeningStyle from "@/components/animations/openingstyle";
import RevealWithBorder from "@/components/animations/CircleBorder";

/* Live Components */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), { ssr: false });
const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), { ssr: false });
const LiveOfferCompletion = dynamic(() => import("@/components/homepage/LiveOfferCompletion"), { ssr: false });
const LiveWithdrawals = dynamic(() => import("@/components/homepage/LiveWithdrawals"), { ssr: false });

interface HomePageProps {
  onOpenAuth?: (type: "login" | "signup" | "reset") => void;
}

export default function HomePage({ onOpenAuth }: HomePageProps) {
  const [seo, setSeo] = useState<SEOOutput | null>(null);
  const [mounted, setMounted] = useState(false);

  const params = useParams();
  const lang = (params?.lang as string) || SEO_CONFIG.defaultLocale;

  useEffect(() => {
    setMounted(true);
    let mountedState = true;

    buildSEO({
      route: "/",
      locale: lang,
      title: `Earn Money Online - ${lang.toUpperCase()}`,
      description:
        "Cashog is a premium rewards platform where users earn money online by completing surveys, playing games, testing apps, and finishing offers. Join millions of users earning real cash and gift cards daily.",
      keywords: [
        "earn money online",
        "make money completing tasks",
        "paid surveys online",
        "earn money playing games",
        "get paid for offers",
        "cash rewards platform",
        "make money online free",
        "best GPT sites",
        "earn paypal cash online",
        "earn gift cards online",
        "cashog rewards",
      ],
    })
      .then((result) => {
        if (mountedState) setSeo(result);
      })
      .catch((err) => console.error("SEO hydration failed:", err));

    return () => {
      mountedState = false;
    };
  }, [lang]);

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
        <SectionWrapper>
          <HeroSection onOpenAuth={onOpenAuth || (() => {})} />
        </SectionWrapper>

        <SectionDivider />
        <SectionWrapper><StatsSection /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><LiveJoining /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><LiveEarnings /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><LiveOfferCompletion /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><LiveWithdrawals /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><FeaturesSection /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><TasksSection /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><HighPayingOffers /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><TestimonialSection /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><TrustSection /></SectionWrapper>
        <SectionDivider />
        <SectionWrapper><PaymentSection /></SectionWrapper>
        <SectionDivider />

        {/* FAQ Section */}
        <SectionWrapper>
          <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <FAQ
              faqs={[
                { q: "How can I start earning money online?", a: "Simply sign up and start completing tasks." },
                { q: "Is this website legit?", a: "Yes, we have paid millions to our users." },
                { q: "How much can I earn?", a: "Active users earn $100-$500 monthly." },
                { q: "Payment methods?", a: "PayPal, Payoneer, Bitcoin, and gift cards." },
                { q: "Do I need to pay?", a: "No, joining is 100% free." },
                { q: "Which countries are supported?", a: "Over 50 countries including US, UK, Canada." },
                { q: "How fast are withdrawals?", a: "Usually within 24-48 hours." },
              ]}
            />
          </section>
        </SectionWrapper>

        <SectionDivider />
        <SectionWrapper><FinalCTASection /></SectionWrapper>
        <div className="h-12"></div>
      </main>
    </>
  );
}

/* Helper components */
function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent dark:via-yellow-500/30 my-4"></div>
  );
}

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <OpeningStyle>
      <RevealWithBorder>{children}</RevealWithBorder>
    </OpeningStyle>
  );
}
