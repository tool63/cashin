"use client";

import React from "react";
import { ArrowRight, Lightning, User, Gift, CheckCircle, ShieldCheck, ClipboardList, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={36} className="text-yellow-400" />,
    title: "Sign Up Instantly",
    description: "Create your account in seconds and gain access to fast earning methods."
  },
  {
    icon: <ClipboardList size={36} className="text-green-400" />,
    title: "Complete Quick Tasks",
    description: "Choose from surveys, app installs, free trials, and micro-tasks to earn fast."
  },
  {
    icon: <Gift size={36} className="text-yellow-400" />,
    title: "Get Paid Instantly",
    description: "Redeem points immediately for cash, gift cards, or mobile top-ups."
  },
  {
    icon: <CheckCircle size={36} className="text-green-400" />,
    title: "Withdraw Without Delay",
    description: "Fast and secure payouts once you reach the minimum threshold."
  },
];

/* ================= FEATURES ================= */
const features = [
  { icon: <ShieldCheck size={28} className="text-yellow-500" />, title: "Safe & Trusted", description: "Millions of users earn online safely with our verified platform." },
  { icon: <Lightning size={28} className="text-yellow-500" />, title: "Fast Earnings", description: "Earn money quickly with high-paying instant tasks." },
  { icon: <CreditCard size={28} className="text-yellow-500" />, title: "Instant Payouts", description: "Withdraw your earnings via PayPal, gift cards, or mobile top-ups instantly." },
  { icon: <ClipboardList size={28} className="text-yellow-500" />, title: "Variety of Tasks", description: "Surveys, games, trials, and offers – all optimized for quick earning." },
  { icon: <User size={28} className="text-yellow-500" />, title: "Mobile-Friendly", description: "Earn on the go with full mobile optimization." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How fast can I earn?", a: "Most users earn within minutes by completing quick tasks and offers." },
  { q: "Is it safe?", a: "Yes, our platform is verified, secure, and trusted by millions worldwide." },
  { q: "Do I need to invest?", a: "No, all tasks are free to complete and earn instantly." },
  { q: "How do I withdraw?", a: "Withdraw earnings instantly via PayPal, gift cards, or mobile top-ups." },
  { q: "Can I earn from mobile?", a: "Absolutely! Our platform is fully mobile-friendly." },
];

/* ================= PAGE COMPONENT ================= */
export default function EarnMoneyOnlineFast() {
  return (
    <>
      <Meta
        title="Cashog - Earn Money Online Fast"
        description="Earn money online quickly with Cashog. Complete surveys, tasks, app installs, and offers for instant rewards."
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
              Access instant earning methods and start making money online within minutes.
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
            Why Choose Cashog for Fast Online Earnings
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
              Join & Earn Fast <ArrowRight size={24} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Complete quick tasks, offers, and surveys to earn real money instantly. Start now!
          </p>
        </section>

      </main>
    </>
  );
}
