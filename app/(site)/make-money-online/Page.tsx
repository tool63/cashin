"use client";

import React from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={36} className="text-yellow-400" />,
    title: "Sign Up Instantly",
    description: "Join our premium community and start earning in minutes.",
  },
  {
    icon: <CreditCard size={36} className="text-green-400" />,
    title: "Complete High-Paying Offers",
    description: "Play games, watch videos, answer surveys, and install apps for points.",
  },
  {
    icon: <Gift size={36} className="text-yellow-400" />,
    title: "Redeem Rewards",
    description: "Convert points into cash, gift cards, or mobile top-ups instantly.",
  },
  {
    icon: <CheckCircle size={36} className="text-green-400" />,
    title: "Withdraw Securely",
    description: "Fast and reliable payouts once minimum threshold is reached.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { icon: <ShieldCheck size={28} className="text-yellow-500" />, title: "Trusted Platform", description: "Millions of users trust us globally every day." },
  { icon: <Trophy size={28} className="text-yellow-500" />, title: "High-Paying Offers", description: "Earn more from the best verified offers online." },
  { icon: <CreditCard size={28} className="text-yellow-500" />, title: "Instant Payouts", description: "Get your earnings fast through PayPal or gift cards." },
  { icon: <User size={28} className="text-yellow-500" />, title: "User-Friendly", description: "Simple, intuitive interface designed for everyone." },
  { icon: <Gift size={28} className="text-yellow-500" />, title: "Mobile Ready", description: "Access our platform anytime on desktop or mobile." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I withdraw?", a: "Withdraw via PayPal, gift cards, or mobile top-ups instantly." },
  { q: "Is this platform secure?", a: "Yes, we use enterprise-grade security for all transactions." },
  { q: "Can I join globally?", a: "Yes, our platform is available worldwide." },
  { q: "Is there a minimum age?", a: "You must be at least 13 years old to join." },
  { q: "Do I need to pay?", a: "No, joining and earning is completely free." },
];

/* ================= PAGE COMPONENT ================= */
export default function MakeMoneyOnline() {
  return (
    <>
      <Meta
        title="Cashog - Make Money Online"
        description="Earn real money online instantly by completing tasks, high-paying offers, surveys, and more with Cashog."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Make Money Online Effortlessly
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users worldwide and start earning instantly with our premium platform.
            </p>
            <Link href="/signup" className="inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-6 rounded-3xl font-bold shadow-2xl text-xl"
              >
                Start Earning Now <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>
          {/* Background Shapes */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-yellow-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-green-400 opacity-10 rounded-full blur-2xl animate-pulse"></div>
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
            Why Users Choose Cashog
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
        <section className="text-center py-32 bg-white dark:bg-[#0B0E1A] w-full transition-colors duration-300 relative overflow-hidden">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Ready to Start Earning Instantly?
          </h2>
          <Link href="/signup" className="inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Start Earning in 60 Seconds <ArrowRight size={24} />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join thousands of users worldwide and enjoy premium earning opportunities from anywhere.
          </p>
          {/* Background abstract shapes */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-yellow-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-green-400 opacity-10 rounded-full blur-2xl animate-pulse"></div>
        </section>

      </main>
    </>
  );
}
