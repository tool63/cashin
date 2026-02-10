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
    { id: 1, title: "Consumer Electronics Feedback Survey", payout: 5, completions: 3200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 2, title: "Grocery Shopping Habits Survey", payout: 4.5, completions: 2100, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 3, title: "Travel Preferences Study", payout: 6, completions: 1800, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 4, title: "Streaming Service Experience Survey", payout: 5.5, completions: 2000, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 5, title: "Mobile App Usability Survey", payout: 4, completions: 2500, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 6, title: "E-commerce Checkout Feedback", payout: 4.5, completions: 2700, country: "FR", badgeHigh: true, badgeFast: false },
    { id: 7, title: "Cryptocurrency Awareness Survey", payout: 6.5, completions: 1500, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 8, title: "Fitness & Health Habits Survey", payout: 5, completions: 3300, country: "US", badgeHigh: false, badgeFast: true },
    { id: 9, title: "Smartphone Usage Survey", payout: 4, completions: 2900, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 10, title: "Subscription Services Feedback", payout: 5, completions: 2100, country: "CA", badgeHigh: true, badgeFast: false },
    { id: 11, title: "Social Media Trends Survey", payout: 4.5, completions: 2300, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 12, title: "Banking & Finance Experience", payout: 6, completions: 1900, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 13, title: "Online Education Experience", payout: 5, completions: 1800, country: "FR", badgeHigh: false, badgeFast: true },
    { id: 14, title: "Mobile Game Preferences Survey", payout: 4.5, completions: 1700, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 15, title: "Food Delivery Service Survey", payout: 5, completions: 3000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 16, title: "Remote Work Lifestyle Survey", payout: 6, completions: 2100, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 17, title: "Advertising Experience Feedback", payout: 4.5, completions: 2500, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 18, title: "Mobile Security & Privacy Survey", payout: 5, completions: 1900, country: "AU", badgeHigh: true, badgeFast: false },
    { id: 19, title: "Travel Booking Platform Feedback", payout: 6.5, completions: 1800, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 20, title: "Customer Loyalty Program Study", payout: 5, completions: 2000, country: "FR", badgeHigh: false, badgeFast: true },
  ],

  "App Installs": [
    { id: 101, title: "Spotify Music App Install", payout: 6, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 102, title: "Duolingo Language Learning Install", payout: 5, completions: 1800, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 103, title: "Cashback Shopping App Install", payout: 4.5, completions: 2200, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 104, title: "Netflix Install & Sign Up", payout: 6.5, completions: 1500, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 105, title: "Amazon Shopping App Install", payout: 5, completions: 3000, country: "DE", badgeHigh: true, badgeFast: false },
    { id: 106, title: "Uber App Install", payout: 4.5, completions: 2600, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 107, title: "Airbnb App Install & Sign Up", payout: 6, completions: 1800, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 108, title: "TikTok App Install", payout: 5, completions: 3200, country: "US", badgeHigh: false, badgeFast: true },
    { id: 109, title: "Zoom Video App Install", payout: 4.5, completions: 2700, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 110, title: "LinkedIn App Install & Signup", payout: 6, completions: 1900, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 111, title: "WhatsApp Messenger Install", payout: 5, completions: 3000, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 112, title: "Snapchat App Install", payout: 5, completions: 2800, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 113, title: "Google Maps Install", payout: 4.5, completions: 2200, country: "FR", badgeHigh: true, badgeFast: false },
    { id: 114, title: "YouTube App Install", payout: 6, completions: 2500, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 115, title: "PayPal App Install & Sign Up", payout: 5, completions: 2000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 116, title: "Instagram App Install", payout: 5.5, completions: 2800, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 117, title: "Amazon Kindle Install", payout: 4.5, completions: 1700, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 118, title: "Duolingo App Daily Practice Install", payout: 5, completions: 2100, country: "AU", badgeHigh: true, badgeFast: false },
    { id: 119, title: "Shazam Music App Install", payout: 4.5, completions: 1800, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 120, title: "Google Pay Install & Setup", payout: 5, completions: 2200, country: "FR", badgeHigh: false, badgeFast: true },
  ],

  "Play Games": Array.from({ length: 20 }).map((_, i) => ({
    id: 2000 + i,
    title: `Game Challenge ${i + 1} - Level Complete`,
    payout: Math.round(Math.random() * 5 + 5),
    completions: Math.floor(Math.random() * 3000 + 1000),
    country: ["US","UK","CA","AU","DE","FR","IN"][i % 7] as Offer["country"],
    badgeHigh: i % 2 === 0,
    badgeFast: i % 3 === 0,
  })),

  "Watch Videos": Array.from({ length: 20 }).map((_, i) => ({
    id: 3000 + i,
    title: `Watch Video ${i + 1} - Sponsored Content`,
    payout: Math.round(Math.random() * 3 + 2),
    completions: Math.floor(Math.random() * 8000 + 5000),
    country: ["US","UK","CA","AU","DE","FR","IN"][i % 7] as Offer["country"],
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
            <span>Offer</span>
            <span>Payout</span>
            <span>Completions</span>
            <span>Country</span>
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
      </div>
    </section>
  );
}
