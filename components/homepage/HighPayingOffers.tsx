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

/* ===================== REALISTIC OFFERS DATA ===================== */
const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: [
    { id: 1001, title: "Consumer Electronics Feedback Survey", payout: 5, completions: 3200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 1002, title: "Grocery Shopping Habits Survey", payout: 4.5, completions: 2100, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 1003, title: "Travel Preferences Study", payout: 6, completions: 1800, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 1004, title: "Streaming Service Experience Survey", payout: 5.5, completions: 2000, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 1005, title: "Mobile App Usability Survey", payout: 4, completions: 2500, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 1006, title: "E-commerce Checkout Experience", payout: 4.5, completions: 2700, country: "FR", badgeHigh: true, badgeFast: false },
    { id: 1007, title: "Cryptocurrency Awareness Survey", payout: 6.5, completions: 1500, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 1008, title: "Fitness & Health Survey", payout: 5, completions: 3300, country: "US", badgeHigh: false, badgeFast: true },
    { id: 1009, title: "Smartphone Usage Survey", payout: 4, completions: 2900, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 1010, title: "Subscription Services Feedback", payout: 5, completions: 2100, country: "CA", badgeHigh: true, badgeFast: false },
    { id: 1011, title: "Social Media Trends Survey", payout: 4.5, completions: 2300, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 1012, title: "Banking & Financial Experience", payout: 6, completions: 1900, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 1013, title: "Online Education Experience", payout: 5, completions: 1800, country: "FR", badgeHigh: false, badgeFast: true },
    { id: 1014, title: "Mobile Game Preferences", payout: 4.5, completions: 1700, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 1015, title: "Food Delivery Service Survey", payout: 5, completions: 3000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 1016, title: "Remote Work Lifestyle Survey", payout: 6, completions: 2100, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 1017, title: "Advertising Experience Feedback", payout: 4.5, completions: 2500, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 1018, title: "Mobile Security & Privacy Survey", payout: 5, completions: 1900, country: "AU", badgeHigh: true, badgeFast: false },
    { id: 1019, title: "Travel Booking Platform Feedback", payout: 6.5, completions: 1800, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 1020, title: "Customer Loyalty Program Study", payout: 5, completions: 2000, country: "FR", badgeHigh: false, badgeFast: true },
  ],
  "App Installs": Array.from({ length: 20 }, (_, i) => ({
    id: 2000 + i + 1,
    title: `Install App ${i + 1} - Real App Example`,
    payout: Math.round(Math.random() * 5 + 5), // 5-10$
    completions: Math.floor(Math.random() * 2000 + 1000),
    country: ["US", "UK", "CA", "AU", "DE", "FR", "IN"][i % 7] as Offer["country"],
    badgeHigh: i % 2 === 0,
    badgeFast: i % 3 === 0,
  })),
  "Play Games": Array.from({ length: 20 }, (_, i) => ({
    id: 3000 + i + 1,
    title: `Play Game ${i + 1} - Level Challenge`,
    payout: Math.round(Math.random() * 5 + 5),
    completions: Math.floor(Math.random() * 1000 + 500),
    country: ["US", "UK", "CA", "AU", "DE", "FR", "IN"][i % 7] as Offer["country"],
    badgeHigh: i % 2 === 0,
    badgeFast: i % 3 === 0,
  })),
  "Watch Videos": Array.from({ length: 20 }, (_, i) => ({
    id: 4000 + i + 1,
    title: `Watch Video ${i + 1} - Sponsored Clip`,
    payout: Math.round(Math.random() * 3 + 2),
    completions: Math.floor(Math.random() * 8000 + 5000),
    country: ["US", "UK", "CA", "AU", "DE", "FR", "IN"][i % 7] as Offer["country"],
    badgeHigh: i % 2 === 0,
    badgeFast: i % 3 === 0,
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
        {(["Surveys", "App Installs", "Play Games", "Watch Videos"] as CategoryKey[]).map((c) => (
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
      <div className="overflow-y-auto max-h-[550px] border rounded-xl shadow-lg">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 font-semibold sticky top-0 z-10 bg-white dark:bg-[#070A14] border-b">
          <span>Offer</span>
          <span>Payout</span>
          <span>Completions</span>
          <span>Country</span>
        </div>

        {loading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
          : offers.map((offer) => (
              <div
                key={offer.id}
                className={`grid grid-cols-4 gap-4 px-4 py-2 border-b last:border-b-0 ${
                  resolvedTheme === "dark" ? "bg-[#0B0E1A]" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {offer.title}
                  {offer.badgeHigh && <Flame className="text-yellow-400" size={16} />}
                  {offer.badgeFast && <Zap className="text-green-400" size={16} />}
                </div>
                <span>${offer.payout.toFixed(2)}</span>
                <span>{offer.completions.toLocaleString()}</span>
                <span>{COUNTRY_FLAG[offer.country]}</span>
              </div>
            ))}
      </div>
    </section>
  );
}
