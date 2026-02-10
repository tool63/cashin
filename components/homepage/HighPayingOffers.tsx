"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import GlobalLoading from "../loading/loading";

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

type HighPayingOffersProps = {
  offers?: Record<CategoryKey, Offer[]>; // optional, fallback to internal OFFERS
};

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
const OFFERS: Record<string, Offer[]> = {
  "Surveys": [
    { id: 101, title: "Daily Opinion Survey", payout: 4, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 102, title: "Market Research Survey", payout: 3.5, completions: 2200, country: "UK", badgeHigh: true, badgeFast: false },
    { id: 103, title: "Product Feedback Survey", payout: 4.5, completions: 2800, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 104, title: "Customer Satisfaction Survey", payout: 5, completions: 3000, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 105, title: "Gaming Experience Survey", payout: 3.5, completions: 2400, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 106, title: "App Review Survey", payout: 4, completions: 2600, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 107, title: "Lifestyle Survey Challenge", payout: 3, completions: 2100, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 108, title: "Tech Product Survey", payout: 5, completions: 3200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 109, title: "Health & Fitness Survey", payout: 4, completions: 2700, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 110, title: "Movie Feedback Survey", payout: 3.5, completions: 2500, country: "CA", badgeHigh: true, badgeFast: false },
    { id: 111, title: "Music Preference Survey", payout: 4.5, completions: 2800, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 112, title: "Travel Experience Survey", payout: 5, completions: 3000, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 113, title: "Food & Beverage Survey", payout: 3.5, completions: 2300, country: "FR", badgeHigh: false, badgeFast: true },
    { id: 114, title: "Education Feedback Survey", payout: 4, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 115, title: "Fashion Trend Survey", payout: 3, completions: 2000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 116, title: "Mobile App Feedback Survey", payout: 5, completions: 3100, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 117, title: "Gaming App Survey", payout: 4.5, completions: 2900, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 118, title: "Home Product Survey", payout: 3.5, completions: 2400, country: "AU", badgeHigh: false, badgeFast: true },
    { id: 119, title: "Streaming Service Survey", payout: 4, completions: 2700, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 120, title: "Social Media Survey", payout: 5, completions: 3000, country: "FR", badgeHigh: true, badgeFast: true }
  ],
  "App Installs": [ /* keep your original data here */ ],
  "Watch Videos": [ /* keep your original data here */ ],
  "Play Games": [ /* keep your original data here */ ]
};

/* ===================== COMPONENT ===================== */
export default function HighPayingOffers({ offers: propOffers }: HighPayingOffersProps) {
  const [category, setCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  // use dynamic offers if provided, otherwise fallback to default OFFERS
  const offers = useMemo(() => propOffers?.[category] ?? OFFERS[category], [category, propOffers]);

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

          {/* LOADING */}
          {loading ? (
            <GlobalLoading />
          ) : (
            offers.map(offer => (
              <div
                key={offer.id}
                className={`grid grid-cols-4 gap-4 px-4 py-2 border-b last:border-b-0 ${
                  resolvedTheme === "dark" ? "bg-[#0B0E1A]" : "bg-white"
                }`}
              >
                {/* Offer Name + Badges */}
                <div className="flex items-center gap-2 text-left">
                  {offer.title}
                  {offer.badgeHigh && <Flame className="text-yellow-400" size={16} />}
                  {offer.badgeFast && <Zap className="text-green-400" size={16} />}
                </div>

                {/* Country */}
                <div className="text-center">{COUNTRY_FLAG[offer.country]}</div>

                {/* Completions */}
                <div className="text-center">{offer.completions.toLocaleString()}</div>

                {/* Payout */}
                <div className="text-right">${offer.payout.toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
