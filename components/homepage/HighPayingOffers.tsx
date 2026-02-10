"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap } from "lucide-react";

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
  useEffect(() => setCountry("US"), []);
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
    completions: 2800 + i * 210,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: i % 3 === 0,
    badgeFast: true,
  })),
  "App Installs": Array.from({ length: 20 }).map((_, i) => ({
    id: 2000 + i,
    title: `Install & Open Finance App #${i + 1}`,
    payout: 6 + (i % 5),
    completions: 1400 + i * 160,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: i % 2 === 0,
  })),
  "Play Games": Array.from({ length: 20 }).map((_, i) => ({
    id: 3000 + i,
    title: `Reach Level ${5 + (i % 6)} – Mobile Game #${i + 1}`,
    payout: 8 + (i % 6),
    completions: 650 + i * 110,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: true,
  })),
  "Watch Videos": Array.from({ length: 20 }).map((_, i) => ({
    id: 4000 + i,
    title: `Watch Sponsored Videos #${i + 1}`,
    payout: 2 + (i % 3),
    completions: 7200 + i * 350,
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
interface HighPayingOffersProps {
  darkMode: boolean; // controlled from header toggle
}

export default function HighPayingOffers({ darkMode }: HighPayingOffersProps) {
  const userCountry = useUserCountry();
  const categories = Object.keys(OFFERS) as CategoryKey[];

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeCategory]);

  const filteredOffers = useMemo(
    () => OFFERS[activeCategory].filter((o) => o.country === userCountry),
    [activeCategory, userCountry]
  );

  return (
    <section
      className={`${darkMode ? "bg-[#070A14] text-white" : "bg-white text-gray-900"} py-20 transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* CATEGORY TOGGLE SWITCH */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SECTION HEADING */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
          High Paying Offers
        </h2>

        {/* TABLE */}
        <div
          className={`rounded-2xl overflow-hidden border transition-colors duration-500 ${
            darkMode ? "bg-[#0f111b] border-white/10" : "bg-gray-100 border-gray-300"
          }`}
        >
          {/* TABLE HEADER */}
          <div
            className={`grid grid-cols-4 px-4 py-3 text-sm font-semibold border-b sticky top-0 z-10 transition-colors duration-500 ${
              darkMode ? "text-gray-400 border-white/10 bg-[#0f111b]" : "text-gray-700 border-gray-300 bg-gray-100"
            }`}
          >
            <span>Offer</span>
            <span className="text-center">Country</span>
            <span className="text-center">Completed</span>
            <span className="text-right">Payout</span>
          </div>

          {/* TABLE BODY - Scrollable */}
          <div className="max-h-[520px] overflow-y-auto">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            ) : (
              filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`grid grid-cols-4 items-center px-4 py-4 border-b hover:bg-white/5 transition-colors duration-300 ${
                    darkMode ? "border-white/5 hover:bg-white/5" : "border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {/* OFFER NAME + BADGES */}
                  <div className="flex items-center gap-3 font-medium">
                    <span>{offer.title}</span>
                    {offer.badgeHigh && (
                      <span
                        className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                          darkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700"
                        }`}
                      >
                        <Flame size={12} /> High
                      </span>
                    )}
                    {offer.badgeFast && (
                      <span
                        className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                          darkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <Zap size={12} /> Fast
                      </span>
                    )}
                  </div>

                  {/* COUNTRY FLAG */}
                  <div className="text-center text-xl">{COUNTRY_FLAG[offer.country]}</div>

                  {/* COMPLETIONS */}
                  <div className="text-center">{offer.completions.toLocaleString()}</div>

                  {/* PAYOUT */}
                  <div className="text-right font-semibold text-green-400">
                    ${offer.payout.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
