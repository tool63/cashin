"use client";

import React from "react";
import { ArrowRight, Zap, User, Gift, CheckCircle, ShieldCheck, ClipboardList, CreditCard } from "lucide-react"; // ✅ Zap replaces Lightning
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={36} className="text-yellow-400" />,
    title: "Sign Up Free",
    description: "Create your account in minutes and start earning online instantly.",
  },
  {
    icon: <ClipboardList size={36} className="text-green-400" />,
    title: "Complete Offers",
    description: "Play games, watch videos, install apps, or complete surveys to earn points.",
  },
  {
    icon: <Zap size={36} className="text-yellow-400" />,
    title: "Earn Fast",
    description: "Points are instantly credited and can be redeemed for cash or gift cards.",
  },
  {
    icon: <CheckCircle size={36} className="text-green-400" />,
    title: "Withdraw Easily",
    description: "Instant payouts via PayPal, gift cards, or mobile top-ups when eligible.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { icon: <ShieldCheck size={28} className="text-yellow-500" />, title: "Trusted & Secure", description: "Millions of users trust our platform daily for safe earning." },
  { icon: <CreditCard size={28} className="text-yellow-500" />, title: "Instant Payouts", description: "Get your earnings quickly with secure payment options." },
  { icon: <Gift size={28} className="text-yellow-500" />, title: "High-Paying Offers", description: "Access top offers that maximize your earning potential." },
  { icon: <Zap size={28} className="text-yellow-500" />, title: "Fast Earnings", description: "Earn rewards rapidly by completing tasks and offers." },
  { icon: <User size={28} className="text-yellow-500" />, title: "Global Access", description: "Join from anywhere in the world and start earning today." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I cash out?", a: "Withdraw via PayPal, gift cards, or mobile top-ups once you reach the minimum threshold." },
  { q: "Are surveys safe?", a: "Yes, all tasks and surveys are secure and verified for safety." },
  { q: "Can I join from any country?", a: "Absolutely! Our platform supports users globally." },
  { q: "Is there a minimum age?", a: "You must be at least 13 years old to create an account." },
  { q: "How fast are payouts?", a: "Most withdrawals are processed instantly or within a few hours." },
  { q: "Do I need to pay to join?", a: "No, signing up is completely free." },
  { q: "Can I complete offers on mobile?", a: "Yes! Our platform is fully mobile-friendly." },
];

/* ================= PAGE COMPONENT ================= */
export default function EarnMoneyOnlineFast() {
  return (
    <>
      <Meta
        title="Cashog - Earn Money Online Fast"
        description="Complete surveys, play games, watch videos, and start earning money online instantly on Cashog."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Earn Money Online Fast
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Complete surveys, play games, watch videos, and complete offers to earn cash and rewards instantly.
            </p>

            {/* ================= HERO CTA BUTTON ================= */}
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-6 rounded-3xl font-bold shadow-2xl text-xl"
              >
                Start Earning Now <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-[#2C3140]"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Why Choose Cashog
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-shadow duration-500 w-full max-w-xs mx-auto border border-gray-200 dark:border-[#2C3140]"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-5 cursor-pointer group border border-gray-200 dark:border-[#2C3140] hover:bg-gray-200 dark:hover:bg-[#2A2F43] transition-all duration-300">
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-3 text-gray-700 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-32 bg-white dark:bg-[#0B0E1A] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Earning Online Fast Today
          </h2>

          {/* ================= FINAL CTA BUTTON ================= */}
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Join & Start Earning <ArrowRight size={24} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Complete tasks, surveys, and offers to earn real money instantly from anywhere.
          </p>
        </section>

      </main>
    </>
  );
}
