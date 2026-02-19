"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Globe,
  CreditCard,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STORE DATA ================= */
const stores = [
  { name: "Amazon", cashback: "8%", category: "Electronics & Fashion" },
  { name: "AliExpress", cashback: "6%", category: "Global Marketplace" },
  { name: "eBay", cashback: "5%", category: "Auctions & Retail" },
  { name: "Walmart", cashback: "4%", category: "Superstore" },
];

/* ================= FAQ DATA FOR SEO ================= */
const faqs = [
  {
    q: "How does cashback shopping work?",
    a: "Activate rewards before shopping and earn cashback automatically when you complete purchases through supported partner stores.",
  },
  {
    q: "How do I withdraw my rewards?",
    a: "Withdraw your rewards securely through supported payout methods once you reach the minimum withdrawal threshold.",
  },
  {
    q: "Is shopping rewards free to use?",
    a: "Yes, our shopping rewards and finance tracking system is completely free to join and use.",
  },
];

/* ================= PAGE ================= */
export default function ShoppingFinancePage() {
  return (
    <>
      {/* ================= SEO ================= */}
      <Meta
        title="Shopping Rewards & Cashback Finance | Earn Money Online - Cashog"
        description="Earn cashback and financial rewards while shopping online. Activate offers, track earnings in real time, and withdraw securely worldwide."
        keywords="shopping rewards, cashback platform, earn money online, financial rewards, cashback finance, passive income shopping"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <div className="relative w-screen min-h-screen bg-[#0B0F1A] text-white overflow-hidden">

        {/* ========= Animated Background ========= */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500 opacity-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl top-20 left-10 animate-float"></div>
        <div className="absolute w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl bottom-10 right-10 animate-float"></div>

        <div className="relative z-10 px-6 md:px-12 pt-28 pb-20 max-w-7xl mx-auto">

          {/* ================= HERO ================= */}
          <section className="text-center mb-28">

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold mb-6"
            >
              Earn Cashback &
            </motion.h1>

            {/* 🔥 Typing Gradient Text */}
            <div className="text-4xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500">
              <TypingText
                words={[
                  "Financial Rewards",
                  "Passive Income Shopping",
                  "Smart Spending Earnings",
                ]}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Activate cashback offers, track financial growth in real-time,
              and transform everyday shopping into performance-driven income.
            </motion.p>

            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500 text-black px-10 py-4 rounded-2xl font-bold text-lg shadow-xl"
              >
                Start Earning Cashback <ArrowRight size={20} />
              </motion.button>
            </Link>
          </section>

          {/* ================= STATS STRIP ================= */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28">
            {[
              { title: "Up to 10%", subtitle: "Cashback Rewards" },
              { title: "500+", subtitle: "Partner Stores" },
              { title: "Real-Time", subtitle: "Tracking System" },
              { title: "Secure", subtitle: "Encrypted Payments" },
            ].map((stat, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition"
              >
                <h3 className="text-2xl font-bold text-emerald-400">
                  {stat.title}
                </h3>
                <p className="text-gray-400 mt-2">{stat.subtitle}</p>
              </div>
            ))}
          </section>

          {/* ================= SHOPPING GRID ================= */}
          <section className="mb-28">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Featured Shopping Rewards
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stores.map((store, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">{store.name}</h3>
                    <span className="text-emerald-400 font-bold text-lg">
                      {store.cashback}
                    </span>
                  </div>

                  <p className="text-gray-400">{store.category}</p>

                  <button className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-emerald-400 text-black py-2 rounded-xl font-semibold">
                    Activate Reward
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ================= FINAL CTA ================= */}
          <section className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500">
              Turn Spending Into Earning.
            </h2>

            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-500 text-black px-14 py-5 rounded-3xl font-bold text-xl shadow-2xl"
              >
                Activate Shopping Rewards <ArrowRight size={22} />
              </motion.button>
            </Link>

            <p className="text-gray-400 mt-6">
              Secure. Transparent. Performance-driven financial rewards.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
