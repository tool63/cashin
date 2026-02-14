"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Leaf, Sparkles, Percent } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO ================= */
const pageTitle = "Cashog - Grocery Shopping Rewards";
const pageDescription =
  "Earn cashback and rewards on groceries. Shop smartly at supermarkets, organic stores, and daily essentials while earning premium cashback.";

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================= GROCERY OFFERS ================= */
const groceryOffers = [
  {
    id: 1,
    title: "Supermarket Cashback",
    reward: "Up to 12% Cashback",
    badge: "Top",
    icon: <ShoppingBag size={30} className="text-green-500" />,
  },
  {
    id: 2,
    title: "Organic & Health Stores",
    reward: "Up to 15% Cashback",
    badge: "Popular",
    icon: <Leaf size={30} className="text-emerald-400" />,
  },
  {
    id: 3,
    title: "Weekly Essentials Bonus",
    reward: "₹500 Extra",
    badge: "Bonus",
    icon: <Sparkles size={30} className="text-yellow-400" />,
  },
  {
    id: 4,
    title: "Bulk Purchase Deals",
    reward: "Flat 10% Back",
    badge: "Exclusive",
    icon: <Percent size={30} className="text-teal-400" />,
  },
];

export default function GroceryRewards() {
  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />

      <main className="bg-white dark:bg-[#070F12] text-gray-900 dark:text-white min-h-screen transition-colors duration-300">

        {/* ================= HERO ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="py-24 px-4 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
            >
              Grocery Shopping Rewards
            </motion.h1>

            {/* Typing Text */}
            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-400 to-green-600"
            >
              <TypingText
                words={[
                  "Earn Cashback on Every Grocery Visit",
                  "Weekly Bonus & Supermarket Deals",
                  "Organic Store Rewards",
                  "Bulk Purchase Cashback",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Shop smartly at supermarkets, organic stores, or stock up your weekly essentials and earn instant rewards and cashback.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <Link href="/signup" className="cta-observer inline-block">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
                >
                  Start Earning Now <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {groceryOffers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-gray-100 dark:bg-[#162125] rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 text-xs font-bold bg-green-400 text-black px-3 py-1 rounded-full">
                {offer.badge}
              </div>

              {/* Icon */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {offer.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>

              {/* Reward */}
              <p className="text-lg font-bold text-green-500 mb-6">{offer.reward}</p>

              {/* Card CTA using cta-observer */}
              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Claim Cashback
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-400 to-green-600">
            Turn Grocery Shopping Into Real Rewards
          </h2>

          <Link href="/signup" className="cta-observer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join & Start Earning <ArrowRight size={20} />
            </motion.span>
          </Link>
        </section>
      </main>
    </>
  );
}
