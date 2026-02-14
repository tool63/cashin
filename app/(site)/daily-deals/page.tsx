"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO ================= */
const pageTitle = "Cashog - Daily Deals";
const pageDescription =
  "Explore high-paying daily deals and limited-time offers. Earn more points daily with exclusive Cashog rewards.";

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================= DEAL DATA ================= */
const deals = [
  { id: 1, title: "Install & Play Game", payout: "2,500 Points", badge: "Hot" },
  { id: 2, title: "Complete Premium Survey", payout: "1,800 Points", badge: "Trending" },
  { id: 3, title: "Try Free Trial Offer", payout: "3,200 Points", badge: "High Pay" },
  { id: 4, title: "Watch Video Series", payout: "900 Points", badge: "New" },
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
              Today’s Daily Deals
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              <TypingText
                words={[
                  "Limited-Time Rewards",
                  "Exclusive High Payouts",
                  "New Deals Every Day",
                  "Boost Your Earnings",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Discover exclusive offers updated every day. Complete them fast and maximize your earnings instantly.
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

        {/* ================= DEAL GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-4 right-4 text-xs font-bold bg-yellow-400 text-black px-3 py-1 rounded-full">
                {deal.badge}
              </div>

              <div className="mb-4 text-green-500">
                <Flame size={28} />
              </div>

              <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>

              <p className="text-lg font-bold text-yellow-500 mb-4">{deal.payout}</p>

              {/* Deal CTA using cta-observer */}
              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Claim Deal
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Don’t Miss Today’s Best Offers
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
