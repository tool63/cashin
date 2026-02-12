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
  country: string;
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
export const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: [
    { id: 1, title: "Daily Opinion Survey", payout: 4.0, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 2, title: "Market Research Survey", payout: 3.5, completions: 2200, country: "UK", badgeHigh: true, badgeFast: false },
    { id: 3, title: "Product Feedback Survey", payout: 4.5, completions: 2800, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 4, title: "Customer Satisfaction Survey", payout: 5.0, completions: 3000, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 5, title: "Gaming Experience Survey", payout: 3.5, completions: 2400, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 6, title: "App Review Survey", payout: 4.0, completions: 2600, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 7, title: "Lifestyle Survey Challenge", payout: 3.0, completions: 2100, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 8, title: "Tech Product Survey", payout: 5.0, completions: 3200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 9, title: "Health & Fitness Survey", payout: 4.0, completions: 2700, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 10, title: "Movie Feedback Survey", payout: 3.5, completions: 2500, country: "CA", badgeHigh: true, badgeFast: false },
    { id: 11, title: "Music Preference Survey", payout: 4.5, completions: 2800, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 12, title: "Travel Experience Survey", payout: 5.0, completions: 3000, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 13, title: "Food & Beverage Survey", payout: 3.5, completions: 2300, country: "FR", badgeHigh: false, badgeFast: true },
    { id: 14, title: "Education Feedback Survey", payout: 4.0, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 15, title: "Fashion Trend Survey", payout: 3.0, completions: 2000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 16, title: "Mobile App Feedback Survey", payout: 5.0, completions: 3100, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 17, title: "Gaming App Survey", payout: 4.5, completions: 2900, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 18, title: "Home Product Survey", payout: 3.5, completions: 2400, country: "AU", badgeHigh: false, badgeFast: true },
    { id: 19, title: "Streaming Service Survey", payout: 4.0, completions: 2700, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 20, title: "Social Media Survey", payout: 5.0, completions: 3000, country: "FR", badgeHigh: true, badgeFast: true },
  ],

  "App Installs": [
    { id: 21, title: "Candy Crush Saga Install", payout: 5.0, completions: 2800, country: "US", badgeHigh: true, badgeFast: true },
    { id: 22, title: "TikTok App Install Reward", payout: 6.0, completions: 3000, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 23, title: "Snapchat Daily Install", payout: 5.0, completions: 2700, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 24, title: "Among Us VIP Challenge", payout: 5.0, completions: 2200, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 25, title: "Clash Royale Tournament Reward", payout: 6.0, completions: 2500, country: "DE", badgeHigh: true, badgeFast: false },
    { id: 26, title: "Fortnite Daily Challenge", payout: 5.0, completions: 3000, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 27, title: "Call of Duty Mobile Quest", payout: 5.5, completions: 2800, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 28, title: "Pokemon Go Adventure Quest", payout: 4.5, completions: 2000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 29, title: "Subway Surfers Daily Reward", payout: 5.0, completions: 3100, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 30, title: "8 Ball Pool Tournament", payout: 5.5, completions: 2300, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 31, title: "Gardenscapes Daily Spin", payout: 4.5, completions: 2700, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 32, title: "Homescapes Quest Reward", payout: 5.0, completions: 2900, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 33, title: "Candy Crush Friends Challenge", payout: 5.0, completions: 2500, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 34, title: "Temple Run Adventure", payout: 4.5, completions: 1800, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 35, title: "Angry Birds Classic Challenge", payout: 5.0, completions: 2000, country: "US", badgeHigh: true, badgeFast: true },
    { id: 36, title: "Farm Heroes Saga Reward", payout: 5.5, completions: 2400, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 37, title: "Roblox Game Quest Reward", payout: 6.0, completions: 2200, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 38, title: "Coin Master Spin Reward", payout: 5.0, completions: 2600, country: "AU", badgeHigh: false, badgeFast: true },
    { id: 39, title: "Garena Free Fire Challenge", payout: 5.5, completions: 2300, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 40, title: "Mobile Legends Battle Reward", payout: 6.0, completions: 2100, country: "FR", badgeHigh: true, badgeFast: true },
  ],

  "Watch Videos": [
    { id: 41, title: "YouTube Sponsored Ad Watch", payout: 2.5, completions: 7000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 42, title: "Netflix Trailer Watch", payout: 3.0, completions: 6500, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 43, title: "Amazon Prime Video Clip Watch", payout: 2.8, completions: 7200, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 44, title: "Disney+ Promo Video Watch", payout: 3.0, completions: 6800, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 45, title: "Spotify Ad Watch", payout: 2.5, completions: 6400, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 46, title: "TikTok Sponsored Clip Watch", payout: 2.8, completions: 7000, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 47, title: "Instagram Reel Watch", payout: 3.0, completions: 7200, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 48, title: "Snapchat Ad Watch", payout: 2.5, completions: 6500, country: "US", badgeHigh: false, badgeFast: true },
    { id: 49, title: "Facebook Video Ad Watch", payout: 2.8, completions: 6700, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 50, title: "Hulu Sponsored Clip Watch", payout: 3.0, completions: 7100, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 51, title: "Crunchyroll Anime Clip Watch", payout: 2.5, completions: 6300, country: "AU", badgeHigh: false, badgeFast: true },
    { id: 52, title: "Twitch Ad Watch", payout: 2.8, completions: 7000, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 53, title: "Vimeo Promo Video Watch", payout: 3.0, completions: 6800, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 54, title: "LinkedIn Sponsored Video Watch", payout: 2.5, completions: 6500, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 55, title: "Reddit Ad Watch", payout: 2.8, completions: 7200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 56, title: "Pinterest Video Clip Watch", payout: 3.0, completions: 7000, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 57, title: "DailyMotion Promo Video Watch", payout: 2.5, completions: 6800, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 58, title: "Snap Ads Watch", payout: 2.8, completions: 7100, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 59, title: "Quibi Video Watch", payout: 3.0, completions: 6500, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 60, title: "IGTV Sponsored Video Watch", payout: 2.5, completions: 7200, country: "FR", badgeHigh: false, badgeFast: true },
  ],

  "Play Games": [
    { id: 61, title: "Coin Master Daily Spin", payout: 5.0, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 62, title: "Clash of Clans Battle Reward", payout: 6.0, completions: 2800, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 63, title: "Subway Surfers High Score Challenge", payout: 5.5, completions: 2700, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 64, title: "Among Us VIP Game Reward", payout: 5.0, completions: 2200, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 65, title: "Fortnite Victory Royale Reward", payout: 6.0, completions: 3000, country: "DE", badgeHigh: true, badgeFast: false },
    { id: 66, title: "Minecraft Build Challenge", payout: 5.5, completions: 2800, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 67, title: "Roblox Daily Quest", payout: 5.0, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 68, title: "PUBG Mobile Tournament", payout: 6.0, completions: 2400, country: "US", badgeHigh: true, badgeFast: true },
    { id: 69, title: "Garena Free Fire Battle Reward", payout: 5.5, completions: 2300, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 70, title: "Mobile Legends Arena Reward", payout: 6.0, completions: 2100, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 71, title: "Call of Duty Challenge Reward", payout: 5.0, completions: 2500, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 72, title: "Angry Birds Level Complete Reward", payout: 4.5, completions: 2000, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 73, title: "Temple Run Daily Run", payout: 5.0, completions: 2700, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 74, title: "Candy Crush Saga Level Reward", payout: 5.5, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 75, title: "Gardenscapes Puzzle Reward", payout: 4.5, completions: 2400, country: "US", badgeHigh: true, badgeFast: true },
    { id: 76, title: "Homescapes Daily Task Reward", payout: 5.0, completions: 2800, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 77, title: "8 Ball Pool Tournament Reward", payout: 5.5, completions: 2300, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 78, title: "Farm Heroes Saga Daily Spin", payout: 5.0, completions: 2500, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 79, title: "Roblox Game Quest", payout: 6.0, completions: 2200, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 80, title: "Coin Master Spin Challenge", payout: 5.5, completions: 2400, country: "FR", badgeHigh: true, badgeFast: true },
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

/* ===================== HIGH PAYING OFFERS COMPONENT ===================== */
function HighPayingOffers({
  offersData,
}: {
  offersData: Record<CategoryKey, Offer[]>;
}) {
  const [category, setCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  const offers = useMemo(() => offersData[category], [category, offersData]);

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
            : offers.map((offer) => (
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
                  <div className="text-center">{COUNTRY_FLAG[offer.country] || offer.country}</div>

                  {/* Completions */}
                  <div className="text-center">{offer.completions.toLocaleString()}</div>

                  {/* Payout */}
                  <div className="text-right">${offer.payout.toFixed(2)}</div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== PAGE ===================== */
export default function Page() {
  return (
    <div>
      {/* HIGH PAYING OFFERS */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <HighPayingOffers offersData={OFFERS} />
      </div>

      {/* TRUST SECTION */}
      <TrustSection />
    </div>
  );
}

/* ===================== TRUST SECTION ===================== */
function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50 dark:bg-[#0B0E1A] rounded-3xl text-center shadow-lg mt-12">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
        Trusted by Thousands Worldwide
      </h2>

      {/* Accent Line */}
      <div className="w-24 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"></div>

      {/* Subtext */}
      <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
        Our platform is trusted by users worldwide to earn rewards safely and reliably.
        Fast, secure, and verified payouts every day.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <span className="text-4xl sm:text-5xl font-bold text-green-500">25K+</span>
          <span className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">Total Users</span>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <span className="text-4xl sm:text-5xl font-bold text-green-500">12K+</span>
          <span className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">Active Users</span>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <span className="text-4xl sm:text-5xl font-bold text-green-500">$1.2M+</span>
          <span className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">Total Payouts</span>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <span className="text-4xl sm:text-5xl font-bold text-green-500">4.8★</span>
          <span className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">Trust Rating</span>
        </div>
      </div>
    </section>
  );
}

