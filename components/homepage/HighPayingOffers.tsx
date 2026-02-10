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

type CategoryKey = "Surveys" | "App Installs" | "Play Games" | "Watch Videos";

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
const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: [
    { id: 101, title: "Daily Opinion Survey", payout: 4, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 102, title: "Market Research Survey", payout: 3.5, completions: 2200, country: "UK", badgeHigh: true, badgeFast: false },
    // ... keep all your existing Survey offers
  ],
  "App Installs": [
    { id: 201, title: "Candy Crush Saga Install", payout: 5, completions: 2800, country: "US", badgeHigh: true, badgeFast: true },
    // ... keep all your existing App Installs offers
  ],
  "Play Games": [
    { id: 401, title: "Coin Master Daily Spin", payout: 5, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    // ... keep all your existing Play Games offers
  ],
  "Watch Videos": [
    { id: 301, title: "YouTube Sponsored Ad Watch", payout: 2.5, completions: 7000, country: "US", badgeHigh: false, badgeFast: true },
    // ... keep all your existing Watch Videos offers
  ],
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
  const [category, setCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  const offers = useMemo(() => OFFERS[category], [category]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [category]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">High Paying Offers</h2>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        {(["Surveys","App Installs","Play Games","Watch Videos"] as CategoryKey[]).map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              category === c
                ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black"
                : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* OFFERS TABLE */}
      <div className="relative border rounded-xl shadow-lg h-[550px] overflow-hidden">
        <div className="overflow-y-auto h-full">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 gap-4 px-4 py-2 font-semibold sticky top-0 z-10 bg-white dark:bg-[#070A14] border-b">
            <span className="text-left">Offer</span>
            <span className="text-center">Country</span>
            <span className="text-center">Completions</span>
            <span className="text-right">Payout</span>
          </div>

          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
            : offers.map(offer => (
                <div
                  key={offer.id}
                  className={`grid grid-cols-4 gap-4 px-4 py-2 border-b last:border-b-0 ${
                    resolvedTheme === "dark" ? "bg-[#0B0E1A]" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 text-left">
                    {offer.title}
                    {offer.badgeHigh && <Flame className="text-yellow-400" size={16} />}
                    {offer.badgeFast && <Zap className="text-green-400" size={16} />}
                  </div>
                  <div className="text-center">{COUNTRY_FLAG[offer.country]}</div>
                  <div className="text-center">{offer.completions.toLocaleString()}</div>
                  <div className="text-right">${offer.payout.toFixed(2)}</div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
