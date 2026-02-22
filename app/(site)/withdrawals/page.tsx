"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Gift,
  Smartphone,
  Globe,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";

export default function WithdrawalsPage() {
  const [faqSearch, setFaqSearch] = useState("");

  const faqs = [
    {
      question: "How do I withdraw my earnings?",
      answer:
        "You can withdraw your earnings via PayPal, crypto, or gift cards once you reach the minimum payout threshold.",
    },
    {
      question: "How long do withdrawals take?",
      answer: "Most withdrawals are processed instantly or within a few hours.",
    },
    {
      question: "Is there a minimum withdrawal?",
      answer:
        "Yes, the minimum withdrawal depends on your selected payment method.",
    },
    {
      question: "Are withdrawals available worldwide?",
      answer:
        "Yes! Cashog supports users from most countries worldwide.",
    },
  ];

  const securityFeatures = [
    {
      icon: LockIcon,
      title: "Encrypted Transactions",
      desc: "All withdrawals are protected with advanced encryption.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Partners",
      desc: "We work only with verified payment providers.",
    },
    {
      icon: Globe,
      title: "Global Access",
      desc: "Withdraw from almost anywhere in the world.",
    },
    {
      icon: Clock,
      title: "Fast Processing",
      desc: "Most withdrawals are processed instantly or within a few hours.",
    },
  ];

  const paymentMethods = [
    {
      title: "PayPal",
      subtitle: "Instant payout",
      icon: "🪙",
    },
    {
      title: "Tether (USDT)",
      subtitle: "Instant payout",
      icon: "₿",
    },
    {
      title: "Bitcoin",
      subtitle: "Instant payout",
      icon: "₿",
    },
    {
      title: "Gift Cards",
      subtitle: "Instant payout",
      icon: "🎁",
    },
    {
      title: "Litecoin",
      subtitle: "Instant payout",
      icon: "Ł",
    },
    {
      title: "Ethereum",
      subtitle: "Instant payout",
      icon: "Ξ",
    },
    {
      title: "Dogecoin",
      subtitle: "Instant payout",
      icon: "Ð",
    },
    {
      title: "Binance Coin (BNB)",
      subtitle: "Instant payout",
      icon: "🟡",
    },
  ];

  return (
    <>
      <Meta
        title="Withdrawals | Cashog"
        description="Withdraw your Cashog earnings instantly via PayPal, crypto, or gift cards. Secure and fast worldwide payouts."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Fast & Secure Withdrawals
              </h1>
            </Reveal>

            <Reveal>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                Cash out your earnings instantly via trusted payment methods. Safe, fast, and globally available.
              </p>
            </Reveal>

            <PrimaryCTA href="/signup">
              Start Earning Now
            </PrimaryCTA>
          </div>
        </section>

        {/* ================= PAYMENT METHODS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 gradient-text">
              Supported Payment Methods
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {paymentMethods.map((method, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow"
                >
                  <div className="text-5xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold mb-1">{method.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {method.subtitle}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= SECURITY FEATURES ================= */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Cashog Withdrawals Are Secure
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {securityFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex justify-center mb-4 text-green-400">
                      <Icon size={36} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#111827] text-gray-900 dark:text-white w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
          </div>

          <div className="space-y-4">
            {faqs
              .filter((faq) =>
                faq.question.toLowerCase().includes(faqSearch.toLowerCase())
              )
              .map((faq, i) => (
                <details
                  key={i}
                  className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-4 cursor-pointer shadow hover:shadow-lg transition-all duration-300"
                >
                  <summary className="font-semibold text-lg">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 gradient-text">
              Ready to Withdraw Your Earnings?
            </h2>
          </Reveal>

          <PrimaryCTA href="/signup">
            Create Free Account
          </PrimaryCTA>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start withdrawing real money safely.
          </p>
        </section>
      </main>
    </>
  );
}
