"use client";

import OpeningStyle from "@/components/animations/openingstyle";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import TypingText from "@/components/typing/home";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { buildSEO } from "@/components/SEO/seoEngine";

export default async function HowItWorksPage() {
  // ✅ TypeScript-safe SEO: use only properties supported by SEOInput
  const seo = await buildSEO({
    route: "/how-it-works",
    description:
      "Learn how Cashog works to help you earn rewards easily — step by step guide for tasks, games, surveys & payouts.",
  });

  const steps = [
    {
      title: "Sign Up Instantly",
      desc: "Create your Cashog account in seconds and start earning right away.",
      icon: "📲",
    },
    {
      title: "Explore Offers",
      desc: "Browse high-value tasks, surveys, and games curated for your interests.",
      icon: "🎯",
    },
    {
      title: "Complete & Earn",
      desc: "Finish tasks and offers to accumulate your balance fast.",
      icon: "💰",
    },
    {
      title: "Withdraw Easily",
      desc: "Choose your payout method and get paid securely.",
      icon: "💳",
    },
  ];

  return (
    <>
      {seo && <SeoRenderer seo={seo} />}

      {/* HERO SECTION */}
      <OpeningStyle delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
            How Cashog Works
          </h1>

          <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </span>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Complete tasks, surveys, watch videos, and earn rewards securely from anywhere.
          </p>

          <PrimaryCTA href="/signup" observer={true}>
            Start Earning Now
          </PrimaryCTA>
        </section>
      </OpeningStyle>

      {/* STEP CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {steps.map((step, i) => (
          <OpeningStyle key={i} delay={0.2 + i * 0.1}>
            <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 transform hover:scale-105 transition ease duration-300">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-700">{step.desc}</p>
            </div>
          </OpeningStyle>
        ))}
      </section>

      {/* CTA BOTTOM */}
      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-700 mb-8">
          Sign up now and start earning rewards instantly — no fees, no delays.
        </p>
        <PrimaryCTA href="/signup" observer={true}>
          Create Free Account
        </PrimaryCTA>
      </section>
    </>
  );
}
