"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Smartphone, Laptop, Headphones, Tv } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO ================= */
const pageTitle = "Cashog - Electronics Shopping Rewards";
const pageDescription =
  "Earn premium cashback on electronics shopping. Get rewards on mobiles, laptops, headphones, and smart TVs with Cashog.";

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

/* ================= ELECTRONICS OFFERS ================= */
const electronicsOffers = [
  {
    id: 1,
    title: "Smartphone Cashback",
    reward: "Up to 8% Cashback",
    badge: "Trending",
    icon: <Smartphone size={30} className="text-yellow-400" />,
  },
  {
    id: 2,
    title: "Laptop & Accessories",
    reward: "Up to 6% Cashback",
    badge: "Hot",
    icon: <Laptop size={30} className="text-green-400" />,
  },
  {
    id: 3,
    title: "Headphones & Audio",
    reward: "Up to 10% Cashback",
    badge: "Limited",
    icon: <Headphones size={30} className="text-blue-400" />,
  },
  {
    id: 4,
    title: "Smart TVs & Appliances",
    reward: "Up to 7% Cashback",
    badge: "Exclusive",
    icon: <Tv size={30} className="text-purple-400" />,
  },
];

export default function ElectronicsRewards() {
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
          <div className="max-w-4xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
            >
              Electronics Shopping Rewards
            </motion.h1>

            {/* Typing Gradient Text */}
            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              <TypingText
                words={[
                  "Mobile Cashback Deals",
                  "Laptop Shopping Rewards",
                  "Audio & TV Cashback",
                  "Premium Electronics Offers",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Shop top electronics brands and earn premium cashback rewards.
              Upgrade your tech and maximize your savings with Cashog.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/signup" className="cta-observer inline-block">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-2xl font-bold shadow-xl text-lg"
                >
                  Shop & Earn Now <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {electronicsOffers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 text-xs font-bold bg-yellow-400 text-black px-3 py-1 rounded-full">
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
              <p className="text-lg font-bold text-yellow-500 mb-6">
                {offer.reward}
              </p>

              {/* CTA */}
              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Get Cashback
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Upgrade Your Tech. Earn While You Shop.
          </h2>

          <Link href="/signup" className="cta-observer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join & Start Shopping <ArrowRight size={20} />
            </motion.span>
          </Link>
        </section>

      </main>
    </>
  );
}
