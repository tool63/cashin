"use client";

import React from "react";
import {
  ArrowRight,
  User,
  CreditCard,
  Gift,
  CheckCircle,
} from "lucide-react";
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
    q: "Are surveys safe?",
    a: "Yes, all tasks and surveys are secure and verified for safety.",
  },
  {
    q: "Can I join from any country?",
    a: "Yes! Our platform supports users globally.",
  },
  {
    q: "Is there a minimum age to join?",
    a: "You must be at least 13 years old to create an account.",
  },
  {
    q: "How long does it take to get paid?",
    a: "Most withdrawals are processed instantly or within a few hours.",
  },
  {
    q: "Do I need to pay anything to join?",
    a: "No, signing up is completely free.",
  },
  {
    q: "Can I complete offers on mobile?",
    a: "Yes! Our platform is fully mobile-friendly, so you can earn anywhere.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Meta
        title="Cashog - How It Works"
        description="Learn how to earn real money online by completing tasks, surveys, and high-paying offers on Cashog."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen">
        <Background />

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Real Money Online
            </h1>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Follow these simple steps and start earning instantly from anywhere.
            </p>

            <PrimaryCTA href="/signup">
              Start Earning Now <ArrowRight size={20} />
            </PrimaryCTA>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <Reveal key={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-gray-100 dark:bg-[#141A27] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Cashog
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto">
              Earn rewards safely with fast payouts and premium opportunities.
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 justify-center">
            {features.map((feature, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto"
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i}>
                <details className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer group">
                  <summary className="font-semibold text-lg">{faq.q}</summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Ready to Start Earning Today?
            </h2>
          </Reveal>

          <PrimaryCTA href="/signup">
            Start Earning in 60 Seconds <ArrowRight size={20} />
          </PrimaryCTA>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Become part of our community and start earning daily rewards instantly.
          </p>
        </section>
      </main>
    </>
  );
}
