"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CreditCard, Landmark, Wallet, BadgePercent } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO ================= */
const pageTitle = "Cashog - Banking & Finance Offers";
const pageDescription =
  "Unlock premium banking, credit card, UPI, and loan cashback offers. Earn high-value financial rewards with Cashog.";

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* ================= BANKING OFFERS ================= */
const bankingOffers = [
  {
    id: 1,
    title: "Credit Card Welcome Bonus",
    payout: "Up to ₹2,500 Cashback",
    badge: "Top",
    icon: <CreditCard size={28} className="text-yellow-400" />,
  },
  {
    id: 2,
    title: "Zero Balance Savings Account",
    payout: "Flat ₹750 Cashback",
    badge: "New",
    icon: <Landmark size={28} className="text-green-400" />,
  },
  {
    id: 3,
    title: "UPI & Wallet Rewards",
    payout: "5% Cashback",
    badge: "Hot",
    icon: <Wallet size={28} className="text-blue-400" />,
  },
  {
    id: 4,
    title: "Personal Loan Cashback",
    payout: "₹3,000 Instant Reward",
    badge: "Exclusive",
    icon: <BadgePercent size={28} className="text-purple-400" />,
  },
];

export default function BankingFinanceOffers() {
  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen transition-colors duration-300">

        {/* ================= HERO ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="py-20 px-4 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
            >
              Banking & Finance Cashback Offers
            </motion.h1>

            {/* Typing Gradient Text */}
            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              <TypingText
                words={[
                  "Smart Banking Rewards",
                  "Credit Card Bonuses",
                  "UPI Cashback Offers",
                  "Premium Loan Cashback",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Explore verified banking and financial offers. Open accounts, apply for cards, and earn real cashback rewards instantly.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/signup" className="cta-observer inline-block">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-2xl font-bold shadow-xl text-lg"
                >
                  Start Earning Now <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= BANKING OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bankingOffers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-4 right-4 text-xs font-bold bg-yellow-400 text-black px-3 py-1 rounded-full">
                {offer.badge}
              </div>

              <div className="mb-4">{offer.icon}</div>

              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>

              <p className="text-lg font-bold text-yellow-500 mb-4">
                {offer.payout}
              </p>

              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Claim Offer
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Unlock Premium Financial Rewards Today
          </h2>

          <Link href="/signup" className="cta-observer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join & Start Earning <ArrowRight size={20} />
            </motion.span>
          </Link>
        </section>

      </main>
    </>
  );
}
