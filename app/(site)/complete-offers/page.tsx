import React from "react";
import { motion } from "framer-motion";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import TypingText from "@/components/typing/TypingText";
import {
  ClipboardList,
  Star,
  Gift,
  User,
} from "lucide-react";

/* ================= OFFER TYPE ================= */
type Offer = {
  id: number;
  title: string;
  category: string;
  reward: string;
  popularity: number;
};

/* ================= PREMIUM OFFERS ================= */
const offers: Offer[] = [
  { id: 1, title: "Install Premium App", category: "App Install", reward: "$3", popularity: 90 },
  { id: 2, title: "Complete Quick Survey", category: "Survey", reward: "$2", popularity: 85 },
  { id: 3, title: "Watch Exclusive Video", category: "Video", reward: "$1", popularity: 70 },
  { id: 4, title: "Sign Up for Free Trial", category: "Trial", reward: "$4", popularity: 88 },
  { id: 5, title: "Download Game Pro", category: "App Install", reward: "$5", popularity: 95 },
  { id: 6, title: "Refer & Earn Bonus", category: "Referral", reward: "$6", popularity: 92 },
  { id: 7, title: "Daily Task Completion", category: "Task", reward: "$1.5", popularity: 75 },
  { id: 8, title: "Premium Newsletter Signup", category: "Signup", reward: "$2.5", popularity: 80 },
  { id: 9, title: "Finance App Install", category: "Finance", reward: "$4.5", popularity: 93 },
];

/* ================= PLATFORM STATS ================= */
const stats = [
  { label: "Total Rewards Issued", value: "35K+" },
  { label: "Active Members", value: "20K+" },
  { label: "Avg. Reward", value: "$3.80" },
];

/* ================= HOW IT WORKS STEPS ================= */
const steps = [
  {
    icon: <User className="w-8 h-8 text-yellow-400 mx-auto" />,
    title: "Create Account",
    desc: "Join in seconds and start exploring opportunities.",
  },
  {
    icon: <Star className="w-8 h-8 text-green-400 mx-auto" />,
    title: "Complete Tasks",
    desc: "Choose high-value offers and finish them easily.",
  },
  {
    icon: <Gift className="w-8 h-8 text-yellow-500 mx-auto" />,
    title: "Redeem Rewards",
    desc: "Withdraw earnings securely to your wallet.",
  },
];

/* ================= SEO METADATA ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/complete-offers",
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
      title: "Complete Offers - Cashog",
      description: "Earn real rewards by completing online offers, surveys, and tasks. Join thousands of users earning daily.",
    };
  }
}

/* ================= PAGE ================= */
export default function CompleteOffersPage() {
  return (
    <>
      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">

          {/* HERO SECTION */}
          <Reveal>
            <div className="text-center mb-24">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                Complete Offers Online
              </h1>

              <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                Access curated digital opportunities and unlock real rewards with enterprise-grade security.
              </p>

              <PrimaryCTA href="/signup">
                Start Earning Now
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* OFFERS SECTION */}
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Premium Opportunities
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore high-value digital tasks and verified earning opportunities.
              </p>
            </div>
          </Reveal>

          {/* OFFER CARDS */}
          <div className="grid md:grid-cols-3 gap-8 mb-28">
            {offers.map((offer) => (
              <Reveal key={offer.id}>
                <div className="bg-white/90 dark:bg-[#0c111b]/90 backdrop-blur-xl border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex justify-between items-center mb-4">
                    <ClipboardList className="text-yellow-500 w-5 h-5" />
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600">
                      {offer.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Reward: <span className="text-green-500 font-semibold">{offer.reward}</span>
                  </p>

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"
                      style={{ width: `${offer.popularity}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {offer.popularity}% Popular
                  </p>

                  <div className="mt-6">
                    <a
                      href="/signup"
                      className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-yellow-400 to-green-400 text-black hover:opacity-90 transition-opacity"
                    >
                      Claim Opportunity
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* PLATFORM STATS */}
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Platform Growth Metrics
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Real-time performance insights from our global reward ecosystem.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 mb-28">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-[#0c111b]/90 backdrop-blur-xl border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl md:text-4xl font-extrabold text-green-500">
                  {stat.value}
                </h3>
                <p className="mt-2 text-xs md:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start earning in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-28 text-center">
            {steps.map((step) => (
              <Reveal key={step.title}>
                <div className="bg-white dark:bg-[#0c111b] border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {step.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Unlock Your Earning Potential
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of users earning rewards through verified opportunities.
              </p>

              <PrimaryCTA href="/signup">
                Join Cashog Today
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
