"use client";

import React from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
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

export default function HowItWorks() {
  return (
    <>
      <Meta
        title="Cashog - How It Works"
        description="Learn how to earn real money online by completing tasks, surveys, and high-paying offers on Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Earn Real Money Online
              </h1>

              {/* TYPING EFFECT */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How It Works
            </h2>

            <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500" />

            <p className="text-center text-gray-600 dark:text-gray-300 mt-4 mb-12 max-w-2xl mx-auto">
              Earn rewards in simple steps and withdraw your earnings securely.
            </p>
          </Reveal>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {steps.map((step, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md transition-all duration-300"
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

          {/* WHY CHOOSE CASHOG (Below Category) */}
          <Reveal>
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Why Choose Cashog
              </h2>

              <div className="w-14 h-1 mx-auto rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500" />
            </div>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Earn rewards safely with fast payouts and premium opportunities.
            </p>
          </Reveal>

          {/* FEATURES */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-5 mb-24">
            {features.map((feature, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>

                  {/* Why Choose Cashog under each card */}
                  <div className="mt-4 text-xs text-green-500 font-medium">
                    Why Choose Cashog
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

        </section>

        {/* FINAL CTA (no emoji) */}
        <section className="relative z-10 text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 gradient-text">
            Ready to Start Earning?
          </h2>

          <PrimaryCTA href="/signup">
            Join Now <ArrowRight size={20} />
          </PrimaryCTA>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Turn your free time into daily earnings with Cashog.
          </p>
        </section>

      </main>
    </>
  );
}
