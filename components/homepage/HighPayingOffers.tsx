"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ================= TYPES ================= */
type Offer = {
  id: number;
  name: string;
  category: string;
  country: string;
  completions: number;
  payout: number;
  href: string;
};

/* ================= DATA (API READY) ================= */
const offers: Offer[] = [
  { id: 1, name: "Opinion Rewards Survey", category: "Surveys", country: "US", completions: 5882, payout: 5, href: "#" },
  { id: 2, name: "Crypto Knowledge Survey", category: "Surveys", country: "GB", completions: 8120, payout: 4.5, href: "#" },

  { id: 3, name: "Raid Shadow Legends", category: "Play Games", country: "CA", completions: 2300, payout: 8, href: "#" },
  { id: 4, name: "Coin Master Level Up", category: "Play Games", country: "US", completions: 1800, payout: 7, href: "#" },

  { id: 5, name: "Finance App Install", category: "App Installs", country: "AU", completions: 4200, payout: 6, href: "#" },
  { id: 6, name: "Shopping Cashback App", category: "App Installs", country: "US", completions: 3500, payout: 5.5, href: "#" },

  { id: 7, name: "Streaming Free Trial", category: "Watch Videos", country: "US", completions: 900, payout: 10, href: "#" },
  { id: 8, name: "Ad Engagement Task", category: "Watch Videos", country: "IN", completions: 12000, payout: 2, href: "#" },
];

/* ================= CATEGORIES ================= */
const categories = [
  "All",
  "Surveys",
  "App Installs",
  "Play Games",
  "Watch Videos",
];

/* ================= COMPONENT ================= */
export default function HighPayingOffers() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [country, setCountry] = useState("ALL");
  const [loading, setLoading] = useState(true);

  /* ===== AUTO COUNTRY ===== */
  useEffect(() => {
    const locale = navigator.language.split("-")[1];
    if (locale) setCountry(locale.toUpperCase());
    setTimeout(() => setLoading(false), 800);
  }, []);

  /* ===== FILTER ENGINE ===== */
  const filteredOffers = useMemo(() => {
    let data = country === "ALL"
      ? offers
      : offers.filter(o => o.country === country);

    if (activeCategory !== "All") {
      data = data.filter(o => o.category === activeCategory);
    }

    return data;
  }, [activeCategory, country]);

  return (
    <section className="bg-[#0b0f1a] py-16">
      <div className="max-w-7xl mx-auto px-5">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            High Paying Offers
          </h2>
          <p className="text-gray-400 text-sm text-center mt-1">
            Choose a category and start earning instantly
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition
                ${activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0f1424]">
          <table className="w-full min-w-[720px]">
            <thead className="bg-[#12182b]">
              <tr className="text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-4 text-left">Offer</th>
                <th className="px-6 py-4 text-left">Country</th>
                <th className="px-6 py-4 text-left">Completions</th>
                <th className="px-6 py-4 text-right">Payout</th>
              </tr>
            </thead>

            <tbody>
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-t border-white/5 animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 w-48 bg-white/10 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-8 bg-white/10 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-20 bg-white/10 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-14 bg-white/10 rounded ml-auto" /></td>
                  </tr>
                ))}

              {!loading &&
                filteredOffers.map((offer) => {
                  const high = offer.payout >= 7;
                  const fast = offer.completions <= 2000;

                  return (
                    <motion.tr
                      key={offer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-white/5 hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <Link href={offer.href} className="font-medium text-white hover:underline">
                          {offer.name}
                        </Link>
                        <div className="flex gap-2 mt-1">
                          {high && <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">🔥 High</span>}
                          {fast && <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">⚡ Fast</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{offer.country}</td>
                      <td className="px-6 py-4 text-gray-300">
                        {offer.completions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-green-400">
                        ${offer.payout.toFixed(2)}
                      </td>
                    </motion.tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
