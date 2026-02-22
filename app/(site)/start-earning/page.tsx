"use client";

import React from "react";
import { motion } from "framer-motion";
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
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import { ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
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

  const faqs = [
    {
      question: "How does Cashog work?",
      answer:
        "You earn rewards by completing tasks, playing games, and taking surveys. Points can be withdrawn as real money.",
    },
    {
      question: "Is it free to join?",
      answer:
        "Yes, joining Cashog and earning rewards is completely free.",
    },
    {
      question: "How fast are withdrawals?",
      answer:
        "Most withdrawals are processed instantly or within a few hours.",
    },
    {
      question: "Can I earn from mobile?",
      answer:
        "Absolutely! Cashog is fully mobile-friendly and works on smartphones.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "Cashog supports PayPal, gift cards, and regional payout options.",
    },
    {
      question: "Is Cashog safe and legit?",
      answer:
        "Yes, Cashog is a trusted platform with verified partners and secure payments.",
    },
  ];

  return (
    <>
      <Meta
        title="How It Works | Cashog"
        description="Learn how Cashog works and start earning real money online by completing tasks and offers."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">

            <Reveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Earn Real Money Online
              </h1>
            </Reveal>

            <Reveal>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>
            </Reveal>

            <Reveal>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
                Follow simple steps and start earning instantly from anywhere in the world.
              </p>
            </Reveal>

            <PrimaryCTA href="/signup">
              Start Earning Now
            </PrimaryCTA>

          </div>
        </section>

        {/* ================= HOW IT WORKS STEPS ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        </section>

        {/* ================= WHY CHOOSE CASHOG (WITH ICONS ABOVE EACH CATEGORY) ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Cashog
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4 text-yellow-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i}>
                <details className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer">
                  <summary className="font-semibold text-lg">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 gradient-text">
              Ready to Start Earning Today?
            </h2>
          </Reveal>

          <PrimaryCTA href="/signup">
            Create Free Account
          </PrimaryCTA>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog and start earning real money by completing tasks and offers.
          </p>
        </section>

      </main>
    </>
  );
}
