"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Offer = {
  id: number;
  name: string;
  category: string;
  country: string;
  completion: string;
  payout: string;
  href: string;
};

const offers: Offer[] = [
  { id: 1, name: "Opinion Rewards Survey", category: "Surveys", country: "🇺🇸", completion: "$50", payout: "$5.00", href: "#" },
  { id: 2, name: "Crypto Knowledge Survey", category: "Surveys", country: "🇬🇧", completion: "$45", payout: "$4.50", href: "#" },
  { id: 3, name: "Raid Shadow Legends", category: "Play Games", country: "🇨🇦", completion: "$80", payout: "$8.00", href: "#" },
  { id: 4, name: "Coin Master Level Up", category: "Play Games", country: "🇺🇸", completion: "$70", payout: "$7.00", href: "#" },
  { id: 5, name: "Finance App Install", category: "Install Apps", country: "🇦🇺", completion: "$60", payout: "$6.00", href: "#" },
  { id: 6, name: "Streaming Free Trial", category: "Trial Offers", country: "🇺🇸", completion: "$100", payout: "$10.00", href: "#" },
  { id: 7, name: "Video Engagement Task", category: "Watch Videos", country: "🇮🇳", completion: "$20", payout: "$2.00", href: "#" },
];

const categories = [
  "Surveys",
  "Play Games",
  "Install Apps",
  "Trial Offers",
  "Watch Videos",
];

export default function HighPayingOffers() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? offers.filter(o => o.category === activeCategory)
    : offers;

  return (
    <section className="bg-[#0b0f1a] py-16">
      <div className="max-w-7xl mx-auto px-5">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            High Paying Offers
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Hand-picked offers with the highest payouts
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  activeCategory === cat
                    ? "bg-white text-black shadow-md"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TABLE WRAPPER */}
        <div className="relative overflow-x-auto rounded-xl border border-white/10 bg-[#0f1424]">
          <table className="w-full min-w-[720px]">
            <thead className="bg-[#12182b]">
              <tr className="text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-4 text-left">Offer</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Country</th>
                <th className="px-6 py-4 text-left">Completion</th>
                <th className="px-6 py-4 text-right">Payout</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((offer) => (
                <motion.tr
                  key={offer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={offer.href}
                      className="font-medium text-white hover:underline"
                    >
                      {offer.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {offer.category}
                  </td>
                  <td className="px-6 py-4 text-lg">
                    {offer.country}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {offer.completion}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-green-400">
                      {offer.payout}
                    </span>
                  </td>
                </motion.tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    No offers found for this category
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* MOBILE SCROLL HINT */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#0f1424] to-transparent md:hidden" />
        </div>

      </div>
    </section>
  );
}
