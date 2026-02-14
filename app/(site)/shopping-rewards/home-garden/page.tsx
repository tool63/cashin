"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sofa, Flower2, Lamp, Home } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO ================= */
const pageTitle = "Cashog - Home & Garden Shopping Rewards";
const pageDescription =
  "Earn premium cashback on home decor, furniture, gardening, and lifestyle essentials. Shop smarter and earn rewards with Cashog.";

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

/* ================= HOME & GARDEN OFFERS ================= */
const homeGardenOffers = [
  {
    id: 1,
    title: "Furniture & Decor",
    reward: "Up to 12% Cashback",
    badge: "Popular",
    icon: <Sofa size={30} className="text-green-500" />,
  },
  {
    id: 2,
    title: "Garden Essentials",
    reward: "Up to 10% Cashback",
    badge: "Seasonal",
    icon: <Flower2 size={30} className="text-emerald-400" />,
  },
  {
    id: 3,
    title: "Lighting & Home Setup",
    reward: "Up to 8% Cashback",
    badge: "Premium",
    icon: <Lamp size={30} className="text-amber-400" />,
  },
  {
    id: 4,
    title: "Smart Home Products",
    reward: "Up to 7% Cashback",
    badge: "Exclusive",
    icon: <Home size={30} className="text-teal-400" />,
  },
];

export default function HomeGardenRewards() {
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
              Home & Garden Rewards
            </motion.h1>

            {/* Calm Lifestyle Gradient */}
            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-amber-400"
            >
              <TypingText
                words={[
                  "Elevate Your Living Space",
                  "Garden & Decor Cashback",
                  "Smart Home Savings",
                  "Premium Lifestyle Rewards",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Transform your home into a premium living experience while earning 
              attractive cashback on furniture, decor, and garden essentials.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <Link href="/signup" className="cta-observer inline-block">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-400 to-amber-400 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
                >
                  Shop & Upgrade Your Home <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>

          </div>
        </motion.section>

        {/* ================= OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {homeGardenOffers.map((offer, i) => (
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
              <h3 className="text-xl font-semibold mb-3">
                {offer.title}
              </h3>

              {/* Reward */}
              <p className="text-lg font-bold text-green-500 mb-6">
                {offer.reward}
              </p>

              {/* CTA */}
              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 via-emerald-400 to-amber-400 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Claim Cashback
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28">
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-amber-400">
            Create Your Dream Home. Earn While You Shop.
          </h2>

          <Link href="/signup" className="cta-observer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-400 to-amber-400 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join & Start Saving <ArrowRight size={20} />
            </motion.span>
          </Link>
        </section>

      </main>
    </>
  );
}
