"use client";

import React from "react";
import { ArrowRight, Ticket, Copy, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= PROMO DATA ================= */
const promoCodes = [
  {
    id: 1,
    code: "SAVE50",
    title: "50% Bonus Cashback",
    description:
      "Activate this code and receive a 50% bonus on your first cashback reward.",
    tag: "Exclusive",
  },
  {
    id: 2,
    code: "WELCOME20",
    title: "$20 Signup Bonus",
    description:
      "New users get an instant $20 bonus after completing their first task.",
    tag: "New Users",
  },
  {
    id: 3,
    code: "SUPER100",
    title: "Earn $100 Extra Rewards",
    description:
      "Limited time campaign. Complete premium offers and unlock extra rewards.",
    tag: "Limited",
  },
  {
    id: 4,
    code: "FREESHIP",
    title: "Free Shipping Cashback",
    description:
      "Get shipping costs refunded as cashback on selected partner stores.",
    tag: "Hot Deal",
  },
];

/* ================= PAGE COMPONENT ================= */
export default function PromoCodesPage() {
  return (
    <>
      <Meta
        title="Cashog - Promo Codes"
        description="Discover exclusive promo codes, bonus cashback rewards, and limited-time offers. Activate promo codes instantly and earn more with Cashog."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center bg-white dark:bg-[#111827] rounded-b-3xl transition-colors duration-300">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Promo Codes
            </h1>

            <div
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Unlock exclusive rewards, bonus cashback, and premium offers
              using our latest promo codes.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 
                  bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 
                  text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Activate Rewards <ArrowRight size={20} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= PROMO GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {promoCodes.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-gray-50 dark:bg-[#1A1F2B] rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-yellow-400/30 flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <Ticket className="text-yellow-400" size={28} />
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full 
                    bg-yellow-100 text-yellow-700 
                    dark:bg-yellow-400/20 dark:text-yellow-300"
                >
                  {promo.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{promo.title}</h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                {promo.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-mono text-lg font-bold tracking-widest text-green-500">
                  {promo.code}
                </span>

                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-semibold text-yellow-500 hover:text-yellow-600 transition"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#111827] w-full transition-colors duration-300 rounded-t-3xl">
          <h2
            className="text-4xl sm:text-5xl font-extrabold mb-8 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
          >
            Don’t Miss Exclusive Rewards
          </h2>

          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 
                bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 
                text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Start Saving Now <Sparkles size={20} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg max-w-md mx-auto">
            Apply promo codes, unlock bonuses, and maximize your earnings instantly.
          </p>
        </section>

      </main>
    </>
  );
}
