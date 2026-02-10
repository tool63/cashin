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

type CategoryKey =
  | "Surveys"
  | "App Installs"
  | "Play Games"
  | "Watch Videos";

/* ===================== USER COUNTRY ===================== */
function useUserCountry() {
  const [country, setCountry] = useState<"US" | "CA" | "UK" | "AU">("US");

  useEffect(() => {
    // API-ready (Geo IP)
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

/* ===================== OFFER DATA ===================== */
const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: Array.from({ length: 20 }).map((_, i) => ({
    id: 1000 + i,
    title: [
      "Financial Habits Survey",
      "Online Shopping Experience",
      "Crypto Awareness Survey",
      "Mobile Usage Study",
      "Brand Feedback Research",
      "Streaming Preferences",
      "Remote Work Study",
      "AI Tools Opinion",
      "Lifestyle Survey",
      "Digital Payments Study",
    ][i % 10],
    payout: 4 + (i % 4),
    completions: 3200 + i * 170,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: i % 3 === 0,
    badgeFast: true,
  })),

  "App Installs": Array.from({ length: 20 }).map((_, i) => ({
    id: 2000 + i,
    title: [
      "Finance Tracker App",
      "VPN Secure Browser",
      "Cashback Shopping App",
      "Crypto Wallet Setup",
      "Fitness Tracker App",
      "Password Manager",
      "Stock Simulator App",
      "Budget Planner",
      "Cloud Storage Trial",
      "AI Photo Editor",
    ][i % 10],
    payout: 6 + (i % 5),
    completions: 1500 + i * 130,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: i % 2 === 0,
  })),

  "Play Games": Array.from({ length: 20 }).map((_, i) => ({
    id: 3000 + i,
    title: [
      "Reach Level 10 – Strategy Game",
      "Complete Tutorial – RPG Game",
      "Win 3 PvP Matches",
      "Idle Tycoon Level 5",
      "Puzzle Game Stage 20",
      "Racing License A",
      "City Builder Level 8",
      "Merge Game Chapter 3",
      "Battle Pass Trial",
      "Adventure Quest Start",
    ][i % 10],
    payout: 8 + (i % 6),
    completions: 700 + i * 95,
    country: ["US", "CA", "UK", "AU"][i % 4] as any,
    badgeHigh: true,
    badgeFast: true,
  })),

  "Watch Videos": Array.from({ length: 20 }).map((_, i) => ({
    id: 4000 + i,
    title: [
      "Watch Sponsored Clips",
      "Short Ads Playlist",
      "Brand Video Review",
      "Trailer Watch Reward",
      "Promo Video Series",
      "Tech Ad Campaign",
      "Mobile Ads Watch",
      "Streaming Preview",
      "Daily Video Bonus",
      "Ad Viewing Session",
    ][i % 10],
    payout: 2 + (i % 3),
    completions: 7800 + i * 300,
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
  const userCountry = useUserCountry();
  const categories = Object.keys(OFFERS) as CategoryKey[];

  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeCategory]);

  const offers = useMemo(
    () =>
      OFFERS[activeCategory].filter(
        (o) => o.country === userCountry
      ),
    [activeCategory, userCountry]
  );

  return (
    <section className="py-20 bg-[#070A14] text-white">
      <div className="max-w-7xl mx-auto px-6">

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

        {/* TABLE */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f111b]">

          {/* HEADER */}
          <div className="grid grid-cols-4 px-4 py-3 text-sm font-semibold text-gray-400 border-b border-white/10">
            <span>Offer</span>
            <span className="text-center">Country</span>
            <span className="text-center">Completed</span>
            <span className="text-right">Payout</span>
          </div>

          {/* BODY */}
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </>
          ) : (
            offers.map((offer) => (
              <div
                key={offer.id}
                className="grid grid-cols-4 items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition"
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
                <div className="text-center text-xl">
                  {COUNTRY_FLAG[offer.country]}
                </div>

                {/* COMPLETIONS */}
                <div className="text-center text-gray-300">
                  {offer.completions.toLocaleString()}
                </div>

                {/* PAYOUT */}
                <div className="text-right font-semibold text-green-400">
                  ${offer.payout.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
