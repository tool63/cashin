"use client";

import React from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-400" />,
    title: "Sign Up for Free",
    description:
      "Create your account in minutes and join our growing community of earners.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Complete Tasks & Offers",
    description:
      "Play games, watch videos, install apps, or complete surveys to earn points.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Earn Rewards",
    description:
      "Points can be redeemed for real cash via PayPal, gift cards, or mobile top-ups.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-400" />,
    title: "Withdraw Easily",
    description:
      "Instant payouts once you reach the minimum withdrawal threshold.",
  },
];

/* ================= FEATURES ================= */
const features = [
  {
    title: "Fast Payouts",
    description: "Get your money instantly via PayPal or gift cards.",
  },
  {
    title: "Trusted & Secure",
    description: "Millions of users trust our platform daily.",
  },
  {
    title: "High-Paying Offers",
    description: "Access top offers that maximize your earnings.",
  },
  {
    title: "Mobile-Friendly",
    description: "Earn on the go with our fully responsive platform.",
  },
  {
    title: "Trusted Payments",
    description: "Secure and reliable payouts every time.",
  },
  {
    title: "Global Access",
    description: "Join from anywhere in the world and start earning.",
  },
  {
    title: "24/7 Support",
    description: "Our support team is here to help whenever you need.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I cash out?",
    a: "You can withdraw via PayPal, gift cards, or mobile top-ups once you reach the minimum threshold.",
  },
  {
    q: "Are tasks safe?",
    a: "Yes, all tasks and offers are verified for security and reliability.",
  },
  {
    q: "Can I join from any country?",
    a: "Yes! Our platform supports users globally.",
  },
  {
    q: "Is there a minimum age?",
    a: "You must be at least 13 years old to create an account.",
  },
  {
    q: "How fast are withdrawals?",
    a: "Most payouts are processed instantly or within a few hours.",
  },
  {
    q: "Is it free to join?",
    a: "Yes, signing up and earning is completely free.",
  },
  {
    q: "Can I earn on mobile?",
    a: "Absolutely! Our platform is fully optimized for mobile users.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Meta
        title="Cashog - How It Works"
        description="Learn how to earn real money online by completing tasks, surveys, and high-paying offers on Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Earn Real Money Online
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Follow these simple steps and start earning instantly from anywhere.
              </p>

              <PrimaryCTA href="/signup">
                Start Earning Now <ArrowRight size={20} />
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* STEPS */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It <span className="gradient-text">Works</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
            {steps.map((step, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow"
                >
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FEATURES */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Why Choose Cashog
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Earn rewards safely with fast payouts and premium opportunities.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-24">
            {features.map((feature, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FAQ */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about earning
            </p>
          </Reveal>

          <div className="space-y-4 mb-24">
            {faqs.map((faq, i) => (
              <Reveal key={i}>
                <details className="bg-white dark:bg-[#0a0d16] rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  <summary className="font-semibold text-lg cursor-pointer">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 gradient-text">
                Ready to Start Earning?
              </h2>

              <PrimaryCTA href="/signup">
                Join Now <ArrowRight size={20} />
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
