"use client";

import React from "react";
import {
  ArrowRight,
  User,
  CreditCard,
  Gift,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-400" />,
    title: "Sign Up for Free",
    description:
      "Create your Cashog account in minutes and start earning instantly.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Complete Offers & Tasks",
    description:
      "Play games, watch videos, complete surveys, or install apps to earn points.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Earn Rewards",
    description:
      "Redeem points for PayPal cash, gift cards, or mobile top-ups securely.",
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
    description: "Get your earnings instantly via PayPal or gift cards.",
  },
  {
    title: "Trusted & Secure",
    description: "Millions of users rely on Cashog daily.",
  },
  {
    title: "High-Paying Offers",
    description: "Top offers to maximize your rewards.",
  },
  {
    title: "Mobile-Friendly",
    description: "Earn on-the-go with our fully responsive platform.",
  },
  {
    title: "Global Access",
    description: "Join and earn from anywhere in the world.",
  },
  {
    title: "24/7 Support",
    description: "Our team is always ready to assist you.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How can I withdraw my earnings?",
    a: "Withdraw via PayPal, gift cards, or mobile top-ups instantly after reaching the minimum threshold.",
  },
  {
    q: "Is Cashog safe?",
    a: "Yes, all offers and tasks are verified and secure for all users.",
  },
  {
    q: "Do I need to pay anything?",
    a: "No, joining and using Cashog is completely free.",
  },
  {
    q: "Can I use Cashog on mobile?",
    a: "Yes, the platform is fully mobile-friendly for earning anywhere.",
  },
  {
    q: "Is there a minimum age?",
    a: "Users must be at least 13 years old to create an account.",
  },
  {
    q: "How fast are payouts?",
    a: "Most withdrawals are processed instantly or within a few hours.",
  },
  {
    q: "Can I join from any country?",
    a: "Yes, Cashog is available globally.",
  },
];

export default function FinancePage() {
  return (
    <>
      <Meta
        title="Cashog Finance & Rewards | Earn Money Online"
        description="Earn cashback and financial rewards while shopping online with Cashog. Activate offers, track earnings, and withdraw securely worldwide."
        keywords="cashback, shopping rewards, earn money online, financial rewards, passive income, online earning"
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <section className="relative overflow-hidden py-20 px-4 text-center bg-gradient-to-r from-yellow-400/15 via-green-400/15 to-green-500/15 dark:from-yellow-500/10 dark:via-green-700/10 dark:to-green-800/10">

          {/* ============================
              Animated Gradient Overlays
          ============================ */}
          <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20"></div>

          <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>

          <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

          {/* ================= CONTENT ================= */}
          <div className="relative z-10 max-w-7xl mx-auto">

            {/* HERO */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Financial Rewards Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Complete offers, surveys, and tasks to earn real money from anywhere.
            </p>

            {/* CTA (Original Logic Preserved) */}
            <Link href="/signup" className="cta-observer inline-block mb-20">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Start Earning Now <ArrowRight size={20} />
              </motion.span>
            </Link>

            {/* STEPS */}
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-24">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-white/70 dark:bg-[#1A1F2B]/80 backdrop-blur-md rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* FEATURES */}
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Why Choose Cashog Finance
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-white/70 dark:bg-[#111827]/80 backdrop-blur-md rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4 text-yellow-500">
                    <ShieldCheck size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* FAQ */}
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 mb-24 max-w-4xl mx-auto text-left">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white/70 dark:bg-[#1A1F2B]/80 backdrop-blur-md rounded-xl p-4"
                >
                  <summary className="font-semibold text-lg cursor-pointer">
                    {faq.q}
                  </summary>
                  <p className="mt-2 text-gray-700 dark:text-gray-400">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            {/* FINAL CTA */}
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Start Earning Financial Rewards Today
            </h2>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Join Cashog Now <ArrowRight size={20} />
              </motion.span>
            </Link>

            <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
              Activate offers, complete tasks, and withdraw earnings instantly anywhere in the world.
            </p>

          </div>
        </section>
      </main>
    </>
  );
}
