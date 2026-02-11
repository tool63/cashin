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
  country: "US" | "CA" | "UK" | "AU" | "DE" | "FR" | "IN";
  badgeHigh: boolean;
  badgeFast: boolean;
};

type CategoryKey =
  | "Surveys"
  | "App Installs"
  | "Play Games"
  | "Watch Videos";

/* ===================== FLAGS ===================== */
const COUNTRY_FLAG: Record<string, string> = {
  US: "🇺🇸",
  CA: "🇨🇦",
  UK: "🇬🇧",
  AU: "🇦🇺",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IN: "🇮🇳",
};

/* ===================== OFFERS DATA ===================== */
/* KEEPING YOUR FULL DATA EXACTLY AS PROVIDED */

const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: [/* --- KEEP YOUR FULL SURVEYS ARRAY HERE --- */],
  "App Installs": [/* --- KEEP YOUR FULL APP INSTALLS ARRAY HERE --- */],
  "Watch Videos": [/* --- KEEP YOUR FULL WATCH VIDEOS ARRAY HERE --- */],
  "Play Games": [/* --- KEEP YOUR FULL PLAY GAMES ARRAY HERE --- */],
};

/* ===================== SKELETON ===================== */
function SkeletonRow() {
  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-4 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}

/* ===================== COMPONENT ===================== */
export default function HighPayingOffers() {
  const [category, setCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  // Fix hydration mismatch (prevents blank render)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoized offers
  const offers = useMemo(() => {
    return OFFERS[category] ?? [];
  }, [category]);

  // Fake loading animation when switching category
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [category]);

  if (!mounted) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        High Paying Offers
      </h2>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {(
          ["Surveys", "App Installs", "Play Games", "Watch Videos"] as CategoryKey[]
        ).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              category === c
                ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black shadow-md"
                : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* OFFERS TABLE */}
      <div className="relative border rounded-xl shadow-lg h-[550px] overflow-hidden bg-white dark:bg-[#070A14]">
        <div className="overflow-y-auto h-full">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 gap-4 px-4 py-3 font-semibold sticky top-0 z-10 bg-white dark:bg-[#070A14] border-b">
            <span className="text-left">Offer</span>
            <span className="text-center">Country</span>
            <span className="text-center">Completions</span>
            <span className="text-right">Payout</span>
          </div>

          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            : offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`grid grid-cols-4 gap-4 px-4 py-3 border-b last:border-b-0 transition-colors ${
                    theme === "dark" ? "bg-[#0B0E1A]" : "bg-white"
                  }`}
                >
                  {/* Offer Name + Badges */}
                  <div className="flex items-center gap-2 text-left font-medium">
                    {offer.title}
                    {offer.badgeHigh && (
                      <Flame className="text-yellow-400" size={16} />
                    )}
                    {offer.badgeFast && (
                      <Zap className="text-green-400" size={16} />
                    )}
                  </div>

                  {/* Country */}
                  <div className="text-center text-lg">
                    {COUNTRY_FLAG[offer.country]}
                  </div>

                  {/* Completions */}
                  <div className="text-center">
                    {offer.completions.toLocaleString()}
                  </div>

                  {/* Payout */}
                  <div className="text-right font-semibold text-green-600 dark:text-green-400">
                    ${offer.payout.toFixed(2)}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
