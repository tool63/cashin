"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Flame, Zap } from "lucide-react";

/* ===================== TYPES ===================== */
type Offer = {
  id: number;
  title: string;
  payout: number;
  completions: number;
  country: string;
  badgeHigh: boolean;
  badgeFast: boolean;
  href: string;
};

type CategoryKey =
  | "Surveys"
  | "App Installs"
  | "Play Games"
  | "Watch Videos";

/* ===================== USER COUNTRY (AUTO) ===================== */
function useUserCountry() {
  const [country, setCountry] = useState("US");

  useEffect(() => {
    // API-ready (example)
    // fetch("/api/geo").then(r => r.json()).then(d => setCountry(d.country))
    setCountry("US");
  }, []);

  return country;
}

/* ===================== OFFER DATA ===================== */
/**
 * NOTE:
 * - Completion = NUMBER (realistic)
 * - Every offer has at least one badge
 * - High / Fast logic mirrors real GPT platforms
 */

const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: Array.from({ length: 20 }).map((_, i) => ({
    id: 1000 + i,
    title: [
      "Financial Habits Survey",
      "Online Shopping Experience",
      "Mobile Usage Study",
      "Crypto Awareness Survey",
      "Brand Feedback Research",
      "Streaming Preferences",
      "Remote Work Study",
      "Digital Wallet Survey",
      "AI Tools Opinion",
      "Lifestyle & Health Survey",
    ][i % 10],
    payout: 4 + (i % 4),
    completions: 3000 + i * 180,
    country: "US",
    badgeHigh: i % 3 === 0,
    badgeFast: true,
    href: "/offers/survey",
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
      "Stock Market Simulator",
      "Budget Planner App",
      "Cloud Storage Trial",
      "AI Photo Editor",
    ][i % 10],
    payout: 6 + (i % 5),
    completions: 1200 + i * 140,
    country: "US",
    badgeHigh: true,
    badgeFast: i % 2 === 0,
    href: "/offers/app-install",
  })),

  "Play Games": Array.from({ length: 20 }).map((_, i) => ({
    id: 3000 + i,
    title: [
      "Reach Level 10 – Strategy Game",
      "Complete Tutorial – RPG Game",
      "Win 3 Matches – PvP Arena",
      "Idle Tycoon Level 5",
      "Puzzle Game Stage 20",
      "Racing Game License A",
      "City Builder Level 8",
      "Merge Game Chapter 3",
      "Battle Pass Trial",
      "Adventure Quest Start",
    ][i % 10],
    payout: 8 + (i % 6),
    completions: 600 + i * 90,
    country: "US",
    badgeHigh: true,
    badgeFast: true,
    href: "/offers/play-game",
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
    completions: 7000 + i * 320,
    country: "US",
    badgeHigh: i % 4 === 0,
    badgeFast: true,
    href: "/offers/watch-video",
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
  const country = useUserCountry();
  const categories = Object.keys(OFFERS) as CategoryKey[];

  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [activeCategory]);

  const offers = useMemo(
    () =>
      OFFERS[activeCategory].filter(
        (o) => o.country === country
      ),
    [activeCategory, country]
  );

  return (
    <section className="py-20 bg-[#070A14] text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
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
            <span className="text-center">Payout</span>
            <span className="text-center">Completed</span>
            <span className="text-right">Action</span>
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

                {/* PAYOUT */}
                <div className="text-center font-semibold text-green-400">
                  ${offer.payout.toFixed(2)}
                </div>

                {/* COMPLETION COUNT */}
                <div className="text-center text-gray-300">
                  {offer.completions.toLocaleString()}
                </div>

                {/* CTA */}
                <div className="text-right">
                  <Link
                    href={offer.href}
                    className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-semibold text-sm hover:scale-105 transition"
                  >
                    Start
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
