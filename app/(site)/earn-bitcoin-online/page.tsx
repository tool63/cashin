"use client";

import React from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-500 dark:text-yellow-400" />,
    title: "Sign Up for Free",
    description: "Create your Cashog account and start earning Bitcoin instantly with our platform.",
  },
  {
    icon: <CreditCard size={32} className="text-green-500 dark:text-green-400" />,
    title: "Complete Tasks & Offers",
    description: "Play games, watch videos, install apps, or complete surveys to earn points that convert to Bitcoin.",
  },
  {
    icon: <Gift size={32} className="text-yellow-500 dark:text-yellow-400" />,
    title: "Convert Points to Bitcoin",
    description: "Redeem your points for Bitcoin safely and instantly through secure wallets.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-500 dark:text-green-400" />,
    title: "Withdraw Instantly",
    description: "Bitcoin is delivered directly to your wallet once the redemption threshold is reached.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "Instant Bitcoin Payouts", description: "Receive Bitcoin instantly after redeeming points." },
  { title: "High-Paying Offers", description: "Maximize your earnings with top-performing offers." },
  { title: "Global Access", description: "Available for users worldwide on any device." },
  { title: "Mobile-Friendly", description: "Earn Bitcoin on mobile, tablet, or desktop anywhere." },
  { title: "Trusted & Secure", description: "Millions of users trust Cashog for safe, verified Bitcoin payouts." },
  { title: "24/7 Support", description: "Our team is always ready to help with any questions." },
];

const faqs = [
  { q: "How do I withdraw Bitcoin?", a: "After collecting points from tasks, redeem them for Bitcoin directly to your wallet instantly." },
  { q: "Can I earn from mobile?", a: "Yes! The platform is fully responsive and works on any mobile device." },
  { q: "Is signing up free?", a: "Absolutely! Creating an account and earning is 100% free." },
  { q: "Is Bitcoin safe?", a: "Yes, all withdrawals are processed securely and instantly to verified wallets." },
  { q: "How long does delivery take?", a: "Bitcoin payouts are delivered instantly after redemption." },
];

export default function EarnBitcoinOnline() {
  return (
    <>
      <Meta
        title="Cashog - Earn Bitcoin Online"
        description="Learn how to earn Bitcoin online by completing tasks, surveys, and offers with Cashog."
      />

      <main className="min-h-screen bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300 rounded-b-3xl">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Earn Bitcoin Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Complete simple tasks, offers, and surveys to earn Bitcoin instantly from anywhere in the world.
            </p>

            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Start Earning Now <ArrowRight size={20} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Cashog for Bitcoin
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 shadow hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-5 cursor-pointer transition-colors duration-300"
              >
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300 rounded-t-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Earning Bitcoin Today!
          </h2>

          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Redeem Bitcoin <ArrowRight size={20} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog and start earning Bitcoin instantly from any device, anywhere.
          </p>
        </section>

      </main>
    </>
  );
}
