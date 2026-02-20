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
  { title: "Fast Payouts", description: "Get your earnings instantly." },
  { title: "Trusted & Secure", description: "Millions rely on Cashog daily." },
  { title: "High-Paying Offers", description: "Maximize your rewards." },
  { title: "Mobile-Friendly", description: "Earn on-the-go easily." },
  { title: "Global Access", description: "Available worldwide." },
  { title: "24/7 Support", description: "We’re always ready to help." },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How can I withdraw my earnings?",
    a: "Withdraw via PayPal, gift cards, or mobile top-ups instantly.",
  },
  { q: "Is Cashog safe?", a: "Yes, all offers are verified and secure." },
  { q: "Do I need to pay anything?", a: "No, Cashog is completely free." },
  { q: "Is there a minimum age?", a: "Users must be at least 13 years old." },
];

export default function FinancePage() {
  return (
    <>
      <Meta
        title="Cashog Finance & Rewards | Earn Money Online"
        description="Earn cashback and financial rewards online with Cashog."
        keywords="cashback, earn money online, rewards platform"
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">

        {/* ================= SINGLE SMOOTH SECTION ================= */}
        <section className="relative overflow-hidden py-20 px-4 text-center
          bg-gradient-to-r 
          from-yellow-400/15 
          via-green-400/15 
          to-green-500/15
          dark:from-yellow-500/8
          dark:via-green-700/10
          dark:to-green-800/10">

          {/* Subtle floating blur (balanced, not bright) */}
          <div className="absolute w-80 h-80 bg-green-400/10 dark:bg-green-700/10 rounded-full blur-3xl top-32 left-20"></div>
          <div className="absolute w-80 h-80 bg-yellow-400/10 dark:bg-yellow-500/10 rounded-full blur-3xl bottom-32 right-20"></div>

          <div className="relative z-10 max-w-7xl mx-auto">

            {/* HERO */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Financial Rewards Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg mb-8 max-w-xl mx-auto text-gray-700 dark:text-gray-300">
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
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-24">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-white/70 dark:bg-[#1A1F2B]/80 backdrop-blur-md rounded-xl p-6 shadow"
                >
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* FEATURES */}
            <h2 className="text-3xl font-bold mb-10">
              Why Choose Cashog Finance
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-white/70 dark:bg-[#111827]/80 backdrop-blur-md rounded-xl p-6 shadow"
                >
                  <div className="flex justify-center mb-3 text-yellow-500">
                    <ShieldCheck size={26} />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* FINAL CTA */}
            <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Start Earning Today
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

          </div>
        </section>
      </main>
    </>
  );
}
