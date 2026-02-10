"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap } from "lucide-react";
import { useTheme } from "next-themes";

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

type CategoryKey =
  | "Surveys"
  | "App Installs"
  | "Play Games"
  | "Watch Videos";

/* ===================== USER COUNTRY ===================== */
function useUserCountry() {
  const [country, setCountry] = useState<"US" | "CA" | "UK" | "AU">("US");

  useEffect(() => {
    // Placeholder for real geoIP detection
    setCountry("US");
  }, []);

  return country;
}

/* ===================== FLAGS ===================== */
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
    title: `Survey Task #${i + 1}`,
    payout: 4 + (i % 4),
    completions: 2800 + i * 210,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: i % 3 === 0,
    badgeFast: true,
  })),

  "App Installs": Array.from({ length: 20 }).map((_, i) => ({
    id: 2000 + i,
    title: `Install App #${i + 1}`,
    payout: 6 + (i % 5),
    completions: 1400 + i * 160,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: i % 2 === 0,
  })),

  "Play Games": Array.from({ length: 20 }).map((_, i) => ({
    id: 3000 + i,
    title: `Play Game #${i + 1}`,
    payout: 8 + (i % 6),
    completions: 650 + i * 110,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: true,
  })),

  "Watch Videos": Array.from({ length: 20 }).map((_, i) => ({
    id: 4000 + i,
    title: `Watch Video #${i + 1}`,
    payout: 2 + (i % 3),
    completions: 7200 + i * 350,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: i % 4 === 0,
    badgeFast: true,
  })),
};

/* ===================== SKELETON ===================== */
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

/* ===================== COMPONENT ===================== */
export default function HighPayingOffers() {
  const { resolvedTheme } = useTheme();
  const darkMode = resolvedTheme === "dark";

  const userCountry = useUserCountry();
  const categories = Object.keys(OFFERS) as CategoryKey[];
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeCategory]);

  const offers = useMemo(
    () => OFFERS[activeCategory].filter((o) => o.country === userCountry),
    [activeCategory, userCountry]
  );

  return (
    <section className={`py-20 ${darkMode ? "bg-[#070A14] text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
          High Paying Offers
        </h2>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition
                ${activeCategory === cat
                  ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* OFFERS TABLE */}
        <div className={`rounded-2xl overflow-hidden border ${darkMode ? "border-white/10 bg-[#0f111b]" : "border-gray-200 bg-gray-50"}`}>

          {/* TABLE HEADER */}
          <div className={`grid grid-cols-4 px-4 py-3 text-sm font-semibold border-b sticky top-0 z-10
            ${darkMode ? "text-gray-400 border-white/10 bg-[#0f111b]" : "text-gray-700 border-gray-200 bg-gray-100"}`}>
            <span>Offer</span>
            <span className="text-center">Country</span>
            <span className="text-center">Completed</span>
            <span className="text-right">Payout</span>
          </div>

          {/* TABLE BODY */}
          <div className="max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            ) : (
              offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`grid grid-cols-4 items-center px-4 py-4 border-b transition hover:${darkMode ? "bg-white/5" : "bg-gray-100"}`}
                >
                  {/* OFFER */}
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

                  {/* COUNTRY */}
                  <div className="text-center text-xl">{COUNTRY_FLAG[offer.country]}</div>

                  {/* COMPLETIONS */}
                  <div className="text-center text-gray-300">{offer.completions.toLocaleString()}</div>

                  {/* PAYOUT */}
                  <div className="text-right font-semibold text-green-400">${offer.payout.toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
