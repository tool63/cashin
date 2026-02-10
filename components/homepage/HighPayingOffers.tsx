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

/* ================= REALISTIC OFFER DATA ================= */
const offers: Offer[] = [
  // ===== SURVEYS =====
  { id: 1, name: "Consumer Opinion Study", category: "Surveys", country: "US", completions: 8421, payout: 4.5, href: "#" },
  { id: 2, name: "Daily Lifestyle Survey", category: "Surveys", country: "US", completions: 5310, payout: 3.8, href: "#" },
  { id: 3, name: "Shopping Behavior Survey", category: "Surveys", country: "GB", completions: 6922, payout: 5, href: "#" },
  { id: 4, name: "Tech Usage Feedback", category: "Surveys", country: "CA", completions: 4102, payout: 4.2, href: "#" },
  { id: 5, name: "Finance Awareness Survey", category: "Surveys", country: "AU", completions: 2871, payout: 6, href: "#" },

  // ===== APP INSTALLS =====
  { id: 20, name: "Cashback Rewards App", category: "App Installs", country: "US", completions: 3650, payout: 5.5, href: "#" },
  { id: 21, name: "Finance Tracker App", category: "App Installs", country: "US", completions: 2880, payout: 6.2, href: "#" },
  { id: 22, name: "Crypto Wallet Installation", category: "App Installs", country: "GB", completions: 1900, payout: 7.5, href: "#" },
  { id: 23, name: "Shopping Deals App", category: "App Installs", country: "CA", completions: 4320, payout: 4.8, href: "#" },
  { id: 24, name: "Mobile Banking App", category: "App Installs", country: "AU", completions: 1540, payout: 8, href: "#" },

  // ===== PLAY GAMES =====
  { id: 40, name: "Raid Shadow Legends – Reach Level 10", category: "Play Games", country: "US", completions: 2150, payout: 8.5, href: "#" },
  { id: 41, name: "Coin Master – Village 5", category: "Play Games", country: "US", completions: 1840, payout: 7.2, href: "#" },
  { id: 42, name: "State of Survival – HQ Level 8", category: "Play Games", country: "GB", completions: 1320, payout: 9, href: "#" },
  { id: 43, name: "Merge Dragons – Complete Challenge", category: "Play Games", country: "CA", completions: 2600, payout: 6.5, href: "#" },
  { id: 44, name: "AFK Arena – Unlock Hero", category: "Play Games", country: "AU", completions: 1980, payout: 7.8, href: "#" },

  // ===== WATCH VIDEOS =====
  { id: 60, name: "Ad Engagement Session", category: "Watch Videos", country: "US", completions: 12200, payout: 2.2, href: "#" },
  { id: 61, name: "Brand Video Feedback", category: "Watch Videos", country: "IN", completions: 14500, payout: 1.8, href: "#" },
  { id: 62, name: "Short Clip Review", category: "Watch Videos", country: "GB", completions: 9800, payout: 2.5, href: "#" },
  { id: 63, name: "Product Ad Watch Task", category: "Watch Videos", country: "CA", completions: 8700, payout: 2.9, href: "#" },
  { id: 64, name: "Sponsored Video Engagement", category: "Watch Videos", country: "AU", completions: 6400, payout: 3.1, href: "#" },
];

/* ================= CATEGORIES (NO ALL) ================= */
const categories = ["Surveys", "App Installs", "Play Games", "Watch Videos"];

/* ================= COMPONENT ================= */
export default function HighPayingOffers() {
  const [activeCategory, setActiveCategory] = useState("Surveys");
  const [country, setCountry] = useState("ALL");
  const [loading, setLoading] = useState(true);

  /* ===== AUTO COUNTRY DETECT ===== */
  useEffect(() => {
    const locale = navigator.language.split("-")[1];
    if (locale) setCountry(locale.toUpperCase());
    setTimeout(() => setLoading(false), 800);
  }, []);

  /* ===== FILTER ===== */
  const filteredOffers = useMemo(() => {
    let data = country === "ALL"
      ? offers
      : offers.filter(o => o.country === country);

    return data.filter(o => o.category === activeCategory);
  }, [activeCategory, country]);

  return (
    <section className="bg-[#0b0f1a] py-16">
      <div className="max-w-7xl mx-auto px-5">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            High Paying Offers
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Hand-picked, high-converting offers by category
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
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
                filteredOffers.map(offer => {
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
