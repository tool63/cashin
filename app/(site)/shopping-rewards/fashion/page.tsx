"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shirt, ShoppingBag, Watch, Gem } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO ================= */
const pageTitle = "Cashog - Fashion Shopping Rewards";
const pageDescription =
  "Earn premium cashback on fashion shopping. Get rewards on clothing, footwear, accessories, and luxury brands with Cashog.";

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

/* ================= FASHION OFFERS ================= */
const fashionOffers = [
  {
    id: 1,
    title: "Clothing & Apparel",
    reward: "Up to 12% Cashback",
    badge: "Trending",
    icon: <Shirt size={30} className="text-pink-400" />,
  },
  {
    id: 2,
    title: "Footwear Deals",
    reward: "Up to 10% Cashback",
    badge: "Hot",
    icon: <ShoppingBag size={30} className="text-yellow-400" />,
  },
  {
    id: 3,
    title: "Watches & Accessories",
    reward: "Up to 8% Cashback",
    badge: "Premium",
    icon: <Watch size={30} className="text-blue-400" />,
  },
  {
    id: 4,
    title: "Luxury Fashion Brands",
    reward: "Up to 15% Cashback",
    badge: "Exclusive",
    icon: <Gem size={30} className="text-purple-400" />,
  },
];

export default function FashionRewards() {
  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen transition-colors duration-300">

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
              Fashion Shopping Rewards
            </motion.h1>

            {/* Elegant Gradient Typing */}
            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400"
            >
              <TypingText
                words={[
                  "Style & Earn Cashback",
                  "Luxury Fashion Rewards",
                  "Premium Apparel Deals",
                  "Exclusive Brand Cashback",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Upgrade your wardrobe and earn premium cashback on top fashion brands. 
              Shop smarter and get rewarded instantly.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <Link href="/signup" className="cta-observer inline-block">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
                >
                  Shop Fashion & Earn <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>

          </div>
        </motion.section>

        {/* ================= FASHION OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {fashionOffers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-gray-100 dark:bg-[#1A1F2B] rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 text-xs font-bold bg-pink-400 text-black px-3 py-1 rounded-full">
                {offer.badge}
              </div>

              {/* Icon */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {offer.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">
                {offer.title}
              </h3>

              {/* Reward */}
              <p className="text-lg font-bold text-pink-500 mb-6">
                {offer.reward}
              </p>

              {/* CTA */}
              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Claim Cashback
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28">
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400">
            Elevate Your Style. Earn Premium Rewards.
          </h2>

          <Link href="/signup" className="cta-observer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join & Start Shopping <ArrowRight size={20} />
            </motion.span>
          </Link>
        </section>

      </main>
    </>
  );
}
