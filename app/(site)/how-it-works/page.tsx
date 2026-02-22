"use client";

import React from "react";
import {
  User,
  CreditCard,
  Gift,
  CheckCircle,
  DollarSign,
  Shield,
  TrendingUp,
  Smartphone,
  Globe,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";

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
    icon: <DollarSign size={36} className="text-green-400" />,
    title: "Fast Payouts",
    description: "Get your money instantly via PayPal or gift cards.",
  },
  {
    icon: <Shield size={36} className="text-blue-400" />,
    title: "Trusted & Secure",
    description: "Millions of users trust our platform daily.",
  },
  {
    icon: <TrendingUp size={36} className="text-yellow-400" />,
    title: "High-Paying Offers",
    description: "Access top offers that maximize your earnings.",
  },
  {
    icon: <Smartphone size={36} className="text-green-400" />,
    title: "Mobile-Friendly",
    description: "Earn on the go with our fully responsive platform.",
  },
  {
    icon: <CreditCard size={36} className="text-purple-400" />,
    title: "Trusted Payments",
    description: "Secure and reliable payouts every time.",
  },
  {
    icon: <Globe size={36} className="text-blue-400" />,
    title: "Global Access",
    description: "Join from anywhere in the world and start earning.",
  },
  {
    icon: <Headphones size={36} className="text-green-400" />,
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
          {/* LANGUAGE (EN ONLY) */}
          <div className="flex justify-end mb-6">
            <LanguageSwitcher />
          </div>

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
                Start Earning Now
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* STEPS */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4 mb-24">
            {steps.map((step, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
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
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-5 mb-24">
            {features.map((feature, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                >
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Frequently Asked Questions
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about earning
            </p>
          </Reveal>

          <div className="mb-24">
            <FAQ faqs={faqs} />
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Start Earning?
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join Cashog today and unlock unlimited earning opportunities.
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
