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

"App Installs": [
  { id: 201, title: "Candy Crush Saga Install", payout: 5, completions: 2800, country: "US", badgeHigh: true, badgeFast: true },
  { id: 202, title: "TikTok App Install Reward", payout: 6, completions: 3000, country: "UK", badgeHigh: true, badgeFast: true },
  { id: 203, title: "Snapchat Daily Install", payout: 5, completions: 2700, country: "CA", badgeHigh: true, badgeFast: true },
  { id: 204, title: "Among Us VIP Challenge", payout: 5, completions: 2200, country: "AU", badgeHigh: true, badgeFast: true },
  { id: 205, title: "Clash Royale Tournament Reward", payout: 6, completions: 2500, country: "DE", badgeHigh: true, badgeFast: false },
  { id: 206, title: "Fortnite Daily Challenge", payout: 5, completions: 3000, country: "FR", badgeHigh: true, badgeFast: true },
  { id: 207, title: "Call of Duty Mobile Quest", payout: 5.5, completions: 2800, country: "IN", badgeHigh: true, badgeFast: true },
  { id: 208, title: "Pokemon Go Adventure Quest", payout: 4.5, completions: 2000, country: "US", badgeHigh: false, badgeFast: true },
  { id: 209, title: "Subway Surfers Daily Reward", payout: 5, completions: 3100, country: "UK", badgeHigh: false, badgeFast: true },
  { id: 210, title: "8 Ball Pool Tournament", payout: 5.5, completions: 2300, country: "CA", badgeHigh: true, badgeFast: true },
  { id: 211, title: "Gardenscapes Daily Spin", payout: 4.5, completions: 2700, country: "AU", badgeHigh: true, badgeFast: true },
  { id: 212, title: "Homescapes Quest Reward", payout: 5, completions: 2900, country: "DE", badgeHigh: false, badgeFast: true },
  { id: 213, title: "Candy Crush Friends Challenge", payout: 5, completions: 2500, country: "FR", badgeHigh: true, badgeFast: true },
  { id: 214, title: "Temple Run Adventure", payout: 4.5, completions: 1800, country: "IN", badgeHigh: false, badgeFast: true },
  { id: 215, title: "Angry Birds Classic Challenge", payout: 5, completions: 2000, country: "US", badgeHigh: true, badgeFast: true },
  { id: 216, title: "Farm Heroes Saga Reward", payout: 5.5, completions: 2400, country: "UK", badgeHigh: true, badgeFast: true },
  { id: 217, title: "Roblox Game Quest Reward", payout: 6, completions: 2200, country: "CA", badgeHigh: true, badgeFast: true },
  { id: 218, title: "Coin Master Spin Reward", payout: 5, completions: 2600, country: "AU", badgeHigh: false, badgeFast: true },
  { id: 219, title: "Garena Free Fire Challenge", payout: 5.5, completions: 2300, country: "DE", badgeHigh: true, badgeFast: true },
  { id: 220, title: "Mobile Legends Battle Reward", payout: 6, completions: 2100, country: "FR", badgeHigh: true, badgeFast: true }
],

"Watch Videos": [
  { id: 301, title: "YouTube Sponsored Ad Watch", payout: 2.5, completions: 7000, country: "US", badgeHigh: false, badgeFast: true },
  { id: 302, title: "Netflix Trailer Watch", payout: 3, completions: 6500, country: "UK", badgeHigh: true, badgeFast: true },
  { id: 303, title: "Amazon Prime Video Clip Watch", payout: 2.8, completions: 7200, country: "CA", badgeHigh: false, badgeFast: true },
  { id: 304, title: "Disney+ Promo Video Watch", payout: 3, completions: 6800, country: "AU", badgeHigh: true, badgeFast: true },
  { id: 305, title: "Spotify Ad Watch", payout: 2.5, completions: 6400, country: "DE", badgeHigh: false, badgeFast: true },
  { id: 306, title: "TikTok Sponsored Clip Watch", payout: 2.8, completions: 7000, country: "FR", badgeHigh: true, badgeFast: true },
  { id: 307, title: "Instagram Reel Watch", payout: 3, completions: 7200, country: "IN", badgeHigh: true, badgeFast: true },
  { id: 308, title: "Snapchat Ad Watch", payout: 2.5, completions: 6500, country: "US", badgeHigh: false, badgeFast: true },
  { id: 309, title: "Facebook Video Ad Watch", payout: 2.8, completions: 6700, country: "UK", badgeHigh: true, badgeFast: true },
  { id: 310, title: "Hulu Sponsored Clip Watch", payout: 3, completions: 7100, country: "CA", badgeHigh: true, badgeFast: true },
  { id: 311, title: "Crunchyroll Anime Clip Watch", payout: 2.5, completions: 6300, country: "AU", badgeHigh: false, badgeFast: true },
  { id: 312, title: "Twitch Ad Watch", payout: 2.8, completions: 7000, country: "DE", badgeHigh: true, badgeFast: true },
  { id: 313, title: "Vimeo Promo Video Watch", payout: 3, completions: 6800, country: "FR", badgeHigh: true, badgeFast: true },
  { id: 314, title: "LinkedIn Sponsored Video Watch", payout: 2.5, completions: 6500, country: "IN", badgeHigh: false, badgeFast: true },
  { id: 315, title: "Reddit Ad Watch", payout: 2.8, completions: 7200, country: "US", badgeHigh: true, badgeFast: true },
  { id: 316, title: "Pinterest Video Clip Watch", payout: 3, completions: 7000, country: "UK", badgeHigh: true, badgeFast: true },
  { id: 317, title: "DailyMotion Promo Video Watch", payout: 2.5, completions: 6800, country: "CA", badgeHigh: false, badgeFast: true },
  { id: 318, title: "Snap Ads Watch", payout: 2.8, completions: 7100, country: "AU", badgeHigh: true, badgeFast: true },
  { id: 319, title: "Quibi Video Watch", payout: 3, completions: 6500, country: "DE", badgeHigh: true, badgeFast: true },
  { id: 320, title: "IGTV Sponsored Video Watch", payout: 2.5, completions: 7200, country: "FR", badgeHigh: false, badgeFast: true }
],

"Play Games": [
  { id: 401, title: "Coin Master Daily Spin", payout: 5, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
  { id: 402, title: "Clash of Clans Battle Reward", payout: 6, completions: 2800, country: "UK", badgeHigh: true, badgeFast: true },
  { id: 403, title: "Subway Surfers High Score Challenge", payout: 5.5, completions: 2700, country: "CA", badgeHigh: true, badgeFast: true },
  { id: 404, title: "Among Us VIP Game Reward", payout: 5, completions: 2200, country: "AU", badgeHigh: true, badgeFast: true },
  { id: 405, title: "Fortnite Victory Royale Reward", payout: 6, completions: 3000, country: "DE", badgeHigh: true, badgeFast: false },
  { id: 406, title: "Minecraft Build Challenge", payout: 5.5, completions: 2800, country: "FR", badgeHigh: true, badgeFast: true },
  { id: 407, title: "Roblox Daily Quest", payout: 5, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
  { id: 408, title: "PUBG Mobile Tournament", payout: 6, completions: 2400, country: "US", badgeHigh: true, badgeFast: true },
  { id: 409, title: "Garena Free Fire Battle Reward", payout: 5.5, completions: 2300, country: "UK", badgeHigh: false, badgeFast: true },
  { id: 410, title: "Mobile Legends Arena Reward", payout: 6, completions: 2100, country: "CA", badgeHigh: true, badgeFast: true },
  { id: 411, title: "Call of Duty Challenge Reward", payout: 5, completions: 2500, country: "AU", badgeHigh: true, badgeFast: true },
  { id: 412, title: "Angry Birds Level Complete Reward", payout: 4.5, completions: 2000, country: "DE", badgeHigh: false, badgeFast: true },
  { id: 413, title: "Temple Run Daily Run", payout: 5, completions: 2700, country: "FR", badgeHigh: true, badgeFast: true },
  { id: 414, title: "Candy Crush Saga Level Reward", payout: 5.5, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
  { id: 415, title: "Gardenscapes Puzzle Reward", payout: 4.5, completions: 2400, country: "US", badgeHigh: true, badgeFast: true },
  { id: 416, title: "Homescapes Daily Task Reward", payout: 5, completions: 2800, country: "UK", badgeHigh: false, badgeFast: true },
  { id: 417, title: "8 Ball Pool Tournament Reward", payout: 5.5, completions: 2300, country: "CA", badgeHigh: true, badgeFast: true },
  { id: 418, title: "Farm Heroes Saga Daily Spin", payout: 5, completions: 2500, country: "AU", badgeHigh: true, badgeFast: true },
  { id: 419, title: "Roblox Game Quest", payout: 6, completions: 2200, country: "DE", badgeHigh: true, badgeFast: true },
  { id: 420, title: "Coin Master Spin Challenge", payout: 5.5, completions: 2400, country: "FR", badgeHigh: true, badgeFast: true }
]
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
                 
            
            
                  <span>{COUNTRY_FLAG[offer.country]}</span>
                  <span>{offer.completions.toLocaleString()}</span>
                  <span>${offer.payout.toFixed(2)}</span>
                
            
            
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
