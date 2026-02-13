"use client";

import React from "react";
import {
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Wallet,
  CheckCircle,
  ShieldCheck,
  Gift,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= HOW IT WORKS ================= */
const steps = [
  {
    icon: <ShoppingBag size={36} className="text-emerald-400" />,
    title: "Shop Your Favorites",
    description:
      "Browse top brands and online stores through our platform and activate cashback before shopping.",
  },
  {
    icon: <CreditCard size={36} className="text-yellow-400" />,
    title: "Pay Normally",
    description:
      "Complete your purchase as usual using your preferred payment method.",
  },
  {
    icon: <Wallet size={36} className="text-emerald-400" />,
    title: "Earn Cashback",
    description:
      "Receive a percentage of your spending back directly into your account.",
  },
  {
    icon: <CheckCircle size={36} className="text-yellow-400" />,
    title: "Withdraw Anytime",
    description:
      "Transfer your cashback earnings via PayPal, gift cards, or bank transfer.",
  },
];

/* ================= FEATURES ================= */
const features = [
  {
    icon: <Gift size={28} className="text-yellow-500" />,
    title: "High Cashback Rates",
    description:
      "Enjoy competitive cashback percentages from leading global brands.",
  },
  {
    icon: <ShieldCheck size={28} className="text-yellow-500" />,
    title: "Secure Transactions",
    description:
      "Your purchases and rewards are fully encrypted and protected.",
  },
  {
    icon: <Zap size={28} className="text-yellow-500" />,
    title: "Instant Tracking",
    description:
      "Track your cashback earnings in real-time inside your dashboard.",
  },
  {
    icon: <Wallet size={28} className="text-yellow-500" />,
    title: "Flexible Withdrawals",
    description:
      "Withdraw your cashback anytime with multiple payout options.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How does cashback work?",
    a: "You shop through our platform, and we receive a commission from the store. We share a portion of that commission with you as cashback.",
  },
  {
    q: "Is cashback free?",
    a: "Yes. There are no hidden fees. You earn cashback simply by shopping normally.",
  },
  {
    q: "When will I receive my cashback?",
    a: "Cashback is tracked instantly and confirmed once the store validates your purchase.",
  },
  {
    q: "Can I combine cashback with coupons?",
    a: "Yes, in many cases you can combine cashback with discount codes for maximum savings.",
  },
];

/* ================= PAGE ================= */
export default function CashbackRewards() {
  return (
    <>
      <Meta
        title="Cashog - Cashback Rewards"
        description="Earn cashback rewards when you shop online. Get paid for your everyday purchases with secure tracking and instant withdrawals."
      />

      <main className="min-h-screen bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              Cashback Rewards
            </h1>

            <div className="text-4xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Shop your favorite brands and earn cashback on every purchase.
              Turn your everyday spending into real rewards.
            </p>

            <Link href="/signup" className="inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500 text-black px-14 py-6 rounded-3xl font-bold shadow-2xl text-xl"
              >
                Start Saving Today <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-[#2C3140]"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Why Choose Our Cashback Platform
          </h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-200 dark:border-[#2C3140]"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-5 border border-gray-200 dark:border-[#2C3140] hover:bg-gray-200 dark:hover:bg-[#2A2F43] transition-all duration-300"
              >
                <summary className="font-semibold text-lg cursor-pointer">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500">
            Turn Shopping Into Earnings
          </h2>

          <Link href="/signup" className="inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Join & Start Earning <ArrowRight size={24} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
            Sign up for free and start earning cashback rewards on your online
            purchases today.
          </p>
        </section>

      </main>
    </>
  );
}
