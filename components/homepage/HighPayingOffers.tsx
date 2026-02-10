"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";

/* ===================== TYPES ===================== */
type Offer = {
  id: number;
  title: string;
  payout: number;
  completions: number;
  country: "US" | "CA" | "UK" | "AU";
  badgeHigh: boolean;
  badgeFast: boolean;
};

type CategoryKey = "Surveys" | "App Installs" | "Play Games" | "Watch Videos";

/* ===================== USER COUNTRY ===================== */
function useUserCountry() {
  const [country, setCountry] = useState<"US" | "CA" | "UK" | "AU">("US");
  useEffect(() => {
    // placeholder for GeoIP API
    setCountry("US");
  }, []);
  return country;
}

/* ===================== COUNTRY FLAGS ===================== */
const COUNTRY_FLAG: Record<string, string> = {
  US: "🇺🇸",
  CA: "🇨🇦",
  UK: "🇬🇧",
  AU: "🇦🇺",
};

/* ===================== OFFERS DATA ===================== */
const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: Array.from({ length: 20 }).map((_, i) => ({
    id: 1000 + i,
    title: `Market Research Survey #${i + 1}`,
    payout: 4 + (i % 4),
    completions: 2500 + i * 180,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: i % 3 === 0,
    badgeFast: true,
  })),
  "App Installs": Array.from({ length: 20 }).map((_, i) => ({
    id: 2000 + i,
    title: `Install & Open Finance App #${i + 1}`,
    payout: 6 + (i % 5),
    completions: 1200 + i * 140,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: i % 2 === 0,
  })),
  "Play Games": Array.from({ length: 20 }).map((_, i) => ({
    id: 3000 + i,
    title: `Reach Level ${5 + (i % 6)} – Mobile Game`,
    payout: 8 + (i % 6),
    completions: 600 + i * 95,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: true,
  })),
  "Watch Videos": Array.from({ length: 20 }).map((_, i) => ({
    id: 4000 + i,
    title: `Watch Sponsored Videos #${i + 1}`,
    payout: 2 + (i % 3),
    completions: 7000 + i * 260,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: i % 4 === 0,
    badgeFast: true,
  })),
};

/* ===================== SKELETON ROW ===================== */
function SkeletonRow() {
  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-4 animate-pulse">
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
    </div>
  );
}

/* ===================== MAIN COMPONENT ===================== */
export default function HighPayingOffers() {
  const userCountry = useUserCountry();
  const categories = Object.keys(OFFERS) as CategoryKey[];

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);

  // simulate API loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredOffers = useMemo(
    () => OFFERS[activeCategory].filter((o) => o.country === userCountry),
    [activeCategory, userCountry]
  );

  return (
    <section className="py-20 bg-[#070A14] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
          High Paying Offers
        </h2>

        {/* CATEGORY TOGGLE SWITCH */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-white/10 bg-[#0f111b] overflow-hidden">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 px-4 py-3 text-sm font-semibold text-gray-400 border-b border-white/10 sticky top-0 bg-[#0f111b] z-10">
            <span>Offer</span>
            <span className="text-center">Country</span>
            <span className="text-center">Completed</span>
            <span className="text-right">Payout</span>
          </div>

          {/* TABLE BODY */}
          <div className="max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              : filteredOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="grid grid-cols-4 items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition"
                  >
                    {/* OFFER NAME + BADGES */}
                    <div className="flex items-center gap-3 font-medium">
                      <span>{offer.title}</span>
                      {offer.badgeHigh && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                          <Flame size={12} /> High
                        </span>
                      )}
                      {offer.badgeFast && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">
                          <Zap size={12} /> Fast
                        </span>
                      )}
                    </div>

                    {/* COUNTRY FLAG */}
                    <div className="text-center text-xl">{COUNTRY_FLAG[offer.country]}</div>

                    {/* COMPLETIONS */}
                    <div className="text-center text-gray-300">
                      {offer.completions.toLocaleString()}
                    </div>

                    {/* PAYOUT */}
                    <div className="text-right font-semibold text-green-400">
                      ${offer.payout.toFixed(2)}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
