"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flame, Star, Gift } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO ================= */
const pageTitle = "Cashog - Cashback Offers";
const pageDescription =
  "Discover high-paying cashback offers and maximize your earnings daily. Explore exclusive rewards with Cashog.";

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================= CASHBACK OFFERS ================= */
const cashbackOffers = [
  { id: 1, title: "High Cashback Shopping", payout: "5% Cashback", badge: "Top", icon: <Star size={28} className="text-yellow-400" /> },
  { id: 2, title: "New Daily Offers", payout: "Up to 3% Cashback", badge: "New", icon: <Gift size={28} className="text-green-400" /> },
  { id: 3, title: "Limited-Time Cashback", payout: "Up to 10% Cashback", badge: "Hot", icon: <Flame size={28} className="text-red-400" /> },
  { id: 4, title: "Exclusive Cashback Deals", payout: "Up to 7% Cashback", badge: "Exclusive", icon: <Gift size={28} className="text-purple-400" /> },
];

export default function DailyDeals() {
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
              Today’s Cashback Offers
            </motion.h1>

            {/* Typing Text */}
            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              <TypingText
                words={[
                  "High Cashback Rewards",
                  "Limited-Time Offers",
                  "Exclusive Cashback Deals",
                  "New Daily Cashback",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Explore the best cashback offers updated daily. Shop, play, or complete tasks and earn instantly.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              {/* Hero CTA */}
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

        {/* ================= CASHBACK OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cashbackOffers.map((offer, i) => (
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

              <p className="text-lg font-bold text-yellow-500 mb-4">{offer.payout}</p>

              {/* Card CTA using cta-observer */}
              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Claim Cashback
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Don’t Miss Today’s Cashback Offers
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
