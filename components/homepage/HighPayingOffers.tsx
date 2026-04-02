"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import CardSkeleton from "@/components/loading/CardSkeleton";

/* ===================== TYPES ===================== */

type Offer = {
  id: number;
  title: string;
  payout: number;
  completions: number;
  country: string; // ISO code (US, GB, CA...)
  rating?: number;
};

type CategoryKey =
  | "surveys"
  | "app_installs"
  | "play_games"
  | "watch_videos";

interface Props {
  data: any;
}

/* ===================== FLAG HELPER ===================== */

const Flag = ({ code }: { code: string }) => (
  <img
    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
    alt={code}
    className="w-6 h-4 object-cover rounded-sm"
  />
);

/* ===================== DATA ===================== */

const categoryOffers: Record<CategoryKey, Offer[]> = {
  surveys: [
    { id: 1, title: "Netflix Viewing Habits Survey", payout: 1.25, completions: 18200, country: "US", rating: 4.5 },
    { id: 2, title: "Amazon Shopping Trends Survey", payout: 1.80, completions: 22500, country: "GB", rating: 4.6 },
    { id: 3, title: "Consumer Electronics Feedback", payout: 2.10, completions: 13800, country: "CA", rating: 4.7 },
    { id: 4, title: "Mobile Usage Behavior Survey", payout: 1.40, completions: 19200, country: "AU", rating: 4.4 },
    { id: 5, title: "Gaming Preferences Survey", payout: 1.95, completions: 26500, country: "JP", rating: 4.6 },
    { id: 6, title: "Streaming Services Feedback", payout: 1.60, completions: 21000, country: "US", rating: 4.5 },
    { id: 7, title: "Online Shopping Behavior", payout: 2.25, completions: 31000, country: "GB", rating: 4.7 },
    { id: 8, title: "Social Media Usage Survey", payout: 1.30, completions: 28000, country: "CA", rating: 4.3 },
  ],

  app_installs: [
    { id: 1, title: "Install Revolut Banking App", payout: 3.80, completions: 39800, country: "GB", rating: 4.6 },
    { id: 2, title: "Install TikTok & Sign Up", payout: 4.50, completions: 50000, country: "US", rating: 4.8 },
    { id: 3, title: "Install Binance App", payout: 5.20, completions: 45000, country: "CA", rating: 4.7 },
    { id: 4, title: "Install Food Delivery App", payout: 3.20, completions: 28000, country: "AU", rating: 4.5 },
    { id: 5, title: "Install VPN App", payout: 4.10, completions: 35000, country: "JP", rating: 4.6 },
    { id: 6, title: "Install Shopping App", payout: 3.50, completions: 42000, country: "US", rating: 4.7 },
    { id: 7, title: "Install Crypto Wallet", payout: 4.90, completions: 30000, country: "GB", rating: 4.6 },
    { id: 8, title: "Install Fitness App", payout: 2.80, completions: 27000, country: "CA", rating: 4.4 },
  ],

  play_games: [
    { id: 1, title: "Reach Level 20 in Puzzle Game", payout: 5.20, completions: 38900, country: "CA", rating: 4.7 },
    { id: 2, title: "Complete Daily Missions", payout: 6.00, completions: 48000, country: "US", rating: 4.6 },
    { id: 3, title: "Win Tournament Challenge", payout: 7.50, completions: 35000, country: "JP", rating: 4.8 },
    { id: 4, title: "Reach Level 50 RPG Game", payout: 8.20, completions: 42000, country: "GB", rating: 4.7 },
    { id: 5, title: "Complete Strategy Game Tasks", payout: 6.80, completions: 37000, country: "AU", rating: 4.6 },
    { id: 6, title: "Win 10 Matches", payout: 4.90, completions: 33000, country: "US", rating: 4.5 },
    { id: 7, title: "Daily Login Rewards", payout: 3.60, completions: 52000, country: "CA", rating: 4.4 },
    { id: 8, title: "Complete Beginner Missions", payout: 2.80, completions: 41000, country: "GB", rating: 4.3 },
  ],

  watch_videos: [
    { id: 1, title: "Watch Sponsored Ads", payout: 0.65, completions: 78000, country: "US", rating: 4.4 },
    { id: 2, title: "Watch Short Videos", payout: 1.00, completions: 55000, country: "GB", rating: 4.7 },
    { id: 3, title: "Watch & Rate Ads", payout: 1.25, completions: 62000, country: "CA", rating: 4.6 },
    { id: 4, title: "Watch Gaming Streams", payout: 0.90, completions: 68000, country: "AU", rating: 4.5 },
    { id: 5, title: "Watch Tech Reviews", payout: 1.10, completions: 47000, country: "JP", rating: 4.6 },
    { id: 6, title: "Watch Movie Trailers", payout: 0.70, completions: 80000, country: "US", rating: 4.4 },
    { id: 7, title: "Watch Ads Playlist", payout: 0.85, completions: 72000, country: "GB", rating: 4.5 },
    { id: 8, title: "Watch Sponsored Clips", payout: 0.95, completions: 69000, country: "CA", rating: 4.6 },
  ],
};

/* ===================== COMPONENT ===================== */

export default function HighPayingOffers({ data }: Props) {
  const [category, setCategory] = useState<CategoryKey>("surveys");
  const [loading, setLoading] = useState(true);

  const offers = useMemo(() => categoryOffers[category], [category]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [category]);

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold">
            {data?.title}
          </h2>
        </div>

        {/* CATEGORY */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {data?.categories?.map((c: any) => (
            <motion.button
              key={c.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(c.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold ${
                category === c.key
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 dark:bg-white/5"
              }`}
            >
              {c.label}
            </motion.button>
          ))}
        </div>

        {/* LOADING */}
        {loading ? (
          <CardSkeleton rows={6} />
        ) : (
          <div className="rounded-xl border overflow-hidden">

            {/* HEADER */}
            <div className="grid grid-cols-4 px-4 py-3 text-xs font-semibold text-gray-500 border-b sticky top-0 bg-white dark:bg-black z-10">
              <div>Name</div>
              <div>Country</div>
              <div>Completed</div>
              <div className="text-right">($) Payout</div>
            </div>

            {/* SCROLLABLE BODY */}
            <div className="max-h-[420px] overflow-y-auto">

              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="grid grid-cols-4 items-center px-4 py-4 border-b hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm"
                >
                  {/* NAME */}
                  <div className="font-medium truncate">
                    {offer.title}
                  </div>

                  {/* FLAG */}
                  <div className="flex items-center gap-2">
                    <Flag code={offer.country} />
                  </div>

                  {/* COMPLETED */}
                  <div className="text-gray-600 dark:text-gray-400">
                    {offer.completions.toLocaleString()}
                  </div>

                  {/* PAYOUT */}
                  <div className="text-right">
                    <span className="font-bold text-green-500">
                      ${offer.payout.toFixed(2)}
                    </span>
                    {offer.rating && (
                      <span className="text-xs text-gray-500 ml-2">
                        ⭐{offer.rating}
                      </span>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}
      </section>
    </OpeningStyle>
  );
}
