"use client";

import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  ClipboardList,
  Laptop,
  Gift,
  CheckCircle,
  Zap,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= LEGIT METHODS ================= */
const methods = [
  {
    icon: <ClipboardList size={36} className="text-emerald-400" />,
    title: "Paid Surveys",
    description:
      "Complete verified surveys from trusted brands and earn real cash rewards.",
  },
  {
    icon: <Gift size={36} className="text-yellow-400" />,
    title: "Cashback Offers",
    description:
      "Shop online through partner stores and earn cashback on every purchase.",
  },
  {
    icon: <Laptop size={36} className="text-emerald-400" />,
    title: "Micro Tasks",
    description:
      "Perform simple online tasks like testing apps, watching content, and reviewing products.",
  },
  {
    icon: <CreditCard size={36} className="text-yellow-400" />,
    title: "Freelance Gigs",
    description:
      "Offer your skills online and get paid for remote freelance work.",
  },
];

/* ================= WHY TRUST US ================= */
const features = [
  {
    icon: <ShieldCheck size={28} className="text-yellow-500" />,
    title: "100% Legit & Verified",
    description:
      "All earning opportunities are verified and secure with no hidden risks.",
  },
  {
    icon: <Zap size={28} className="text-yellow-500" />,
    title: "Fast Payments",
    description:
      "Withdraw your earnings quickly via PayPal, gift cards, or bank transfer.",
  },
  {
    icon: <CheckCircle size={28} className="text-yellow-500" />,
    title: "No Investment Needed",
    description:
      "Start earning online without paying any registration or hidden fees.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "Are these methods really legit?",
    a: "Yes. All listed earning methods are verified and trusted by thousands of users worldwide.",
  },
  {
    q: "Do I need special skills?",
    a: "No. Many options are beginner-friendly and require no prior experience.",
  },
  {
    q: "How do I withdraw my earnings?",
    a: "You can withdraw via PayPal, gift cards, or supported payout methods once you reach the minimum threshold.",
  },
  {
    q: "Is there any investment required?",
    a: "No investment is required to start earning with our legitimate methods.",
  },
];

export default function LegitWaysToMakeMoneyOnline() {
  return (
    <>
      <Meta
        title="Cashog - Legit Ways To Make Money Online"
        description="Discover legit and trusted ways to make money online. Start earning with verified surveys, cashback offers, and beginner-friendly online jobs."
      />

      <main className="min-h-screen bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Legit Ways To Make Money Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover safe, verified, and beginner-friendly ways to earn money
              online without scams or hidden fees.
            </p>

            {/* CTA */}
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 
                bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500 
                text-black px-14 py-6 rounded-3xl font-bold 
                shadow-2xl text-xl"
              >
                Start Earning Safely
                <ArrowRight size={24} />
              </motion.span>
            </Link>

          </div>
        </section>

        {/* ================= METHODS ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {methods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-[#2C3140]"
            >
              <div className="flex justify-center mb-4">{method.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                {method.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Why Choose Our Platform
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
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
        <section className="text-center py-32">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500">
            Start Making Money Online Today
          </h2>

          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 
              bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500 
              text-black px-16 py-6 rounded-3xl font-bold 
              shadow-2xl text-xl"
            >
              Join & Start Earning
              <ArrowRight size={24} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
            Sign up for free and explore legitimate ways to earn money online
            safely and consistently.
          </p>
        </section>

      </main>
    </>
  );
}
