"use client";

import React from "react";
import {
  ArrowRight,
  Wallet,
  ClipboardList,
  Gift,
  CheckCircle,
  ShieldCheck,
  Zap,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= PAYPAL METHODS ================= */
const methods = [
  {
    icon: <ClipboardList size={36} className="text-emerald-400" />,
    title: "Complete Surveys",
    description:
      "Answer short surveys from global brands and earn PayPal cash rewards.",
  },
  {
    icon: <Gift size={36} className="text-yellow-400" />,
    title: "Cashback Offers",
    description:
      "Shop through verified stores and receive cashback directly to PayPal.",
  },
  {
    icon: <Zap size={36} className="text-emerald-400" />,
    title: "Micro Tasks",
    description:
      "Complete small online tasks and get paid quickly to your PayPal account.",
  },
  {
    icon: <CreditCard size={36} className="text-yellow-400" />,
    title: "Referral Bonuses",
    description:
      "Invite friends and earn bonus PayPal rewards when they join.",
  },
];

/* ================= BENEFITS ================= */
const features = [
  {
    icon: <ShieldCheck size={28} className="text-yellow-500" />,
    title: "Secure Transactions",
    description:
      "All PayPal payments are encrypted and securely processed.",
  },
  {
    icon: <Wallet size={28} className="text-yellow-500" />,
    title: "Fast Withdrawals",
    description:
      "Receive your PayPal earnings quickly after reaching the payout threshold.",
  },
  {
    icon: <CheckCircle size={28} className="text-yellow-500" />,
    title: "No Investment Needed",
    description:
      "Start earning PayPal money online without paying any fees.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I get paid via PayPal?",
    a: "Once you reach the minimum payout amount, you can withdraw your earnings directly to your PayPal account.",
  },
  {
    q: "Is earning PayPal money legit?",
    a: "Yes. All earning opportunities are verified and secure.",
  },
  {
    q: "How long does PayPal withdrawal take?",
    a: "Most withdrawals are processed quickly after confirmation.",
  },
  {
    q: "Do I need special skills?",
    a: "No. Most earning options are beginner-friendly.",
  },
];

export default function EarnPaypalMoney() {
  return (
    <>
      <Meta
        title="Cashog - Earn PayPal Money Online"
        description="Earn PayPal money online with surveys, cashback offers, and simple tasks. Secure payouts and beginner-friendly earning methods."
      />

      <main className="min-h-screen bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Earn PayPal Money Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Complete simple online tasks, surveys, and offers to earn real
              PayPal cash safely and securely.
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
                Start Earning PayPal Cash
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

        {/* ================= BENEFITS ================= */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Why Earn With Us
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
            Start Earning PayPal Money Today
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
              Join & Get Paid
              <ArrowRight size={24} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
            Sign up for free and start earning real PayPal cash safely and
            consistently.
          </p>
        </section>

      </main>
    </>
  );
}
