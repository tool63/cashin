"use client";

import React from "react";
import { ArrowRight, Gift, DollarSign, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= OFFERS DATA ================= */
const cashbackOffers = [
  {
    id: 1,
    title: "50% Cashback on Electronics",
    description: "Shop at top electronics stores and get up to 50% cashback instantly.",
    payout: "$50",
    icon: <DollarSign size={32} className="text-yellow-400" />,
  },
  {
    id: 2,
    title: "Earn $20 Cashback on Fashion",
    description: "Buy clothing and accessories from partner brands and earn $20 cashback.",
    payout: "$20",
    icon: <Star size={32} className="text-green-400" />,
  },
  {
    id: 3,
    title: "Get $15 on Groceries",
    description: "Earn cashback on your grocery shopping from top supermarkets.",
    payout: "$15",
    icon: <Gift size={32} className="text-yellow-400" />,
  },
  {
    id: 4,
    title: "Travel Deals Cashback",
    description: "Book flights and hotels through Cashog partners and get exclusive cashback.",
    payout: "$100",
    icon: <DollarSign size={32} className="text-green-400" />,
  },
];

/* ================= PAGE COMPONENT ================= */
export default function CashbackOffersPage() {
  return (
    <>
      <Meta
        title="Cashog - Cashback Offers"
        description="Discover premium cashback offers on shopping, travel, groceries, and more. Earn rewards instantly with Cashog!"
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center bg-white dark:bg-[#111827] rounded-b-3xl transition-colors duration-300">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Cashback Offers
            </h1>

            {/* ================= TYPING EFFECT ================= */}
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Unlock premium cashback offers on shopping, travel, groceries, and more. Earn instantly and save with Cashog.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black dark:text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Start Earning <ArrowRight size={20} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cashbackOffers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-50 dark:bg-[#1A1F2B] rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="mb-4">{offer.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{offer.description}</p>
              <div className="text-yellow-400 font-bold text-lg">{offer.payout}</div>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#111827] w-full transition-colors duration-300 rounded-t-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">
            Don’t Miss Out on Premium Cashback!
          </h2>
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black dark:text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Unlock Cashback <ArrowRight size={20} />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Start saving instantly with Cashog cashback offers on top brands and services worldwide.
          </p>
        </section>

      </main>
    </>
  );
}
