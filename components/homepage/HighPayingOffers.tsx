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
  country: string;
  rating?: number;
};

type CategoryKey =
  | "surveys"
  | "app_installs"
  | "play_games"
  | "watch_videos";

/* ===================== PROPS ===================== */

interface Props {
  data: any;
}

/* ===================== COUNTRY FLAGS ===================== */

const countryPool = [
  "🇺🇸 USA",
  "🇬🇧 UK",
  "🇨🇦 Canada",
  "🇦🇺 Australia",
  "🇯🇵 Japan",
  "🇪🇺 Europe",
];

const getCountry = (i: number) => countryPool[i % countryPool.length];

/* ===================== DATA ===================== */

const categoryOffers: Record<CategoryKey, Offer[]> = {
  surveys: [
    { id: 1, title: "Netflix Viewing Habits Survey", payout: 1.25, completions: 18200, country: "🇺🇸 USA", rating: 4.5 },
    { id: 2, title: "Amazon Shopping Trends Survey", payout: 1.80, completions: 22500, country: "🇬🇧 UK", rating: 4.6 },
    { id: 3, title: "Consumer Electronics Feedback", payout: 2.10, completions: 13800, country: "🇨🇦 Canada", rating: 4.7 },
    { id: 4, title: "Mobile Usage Behavior Survey", payout: 1.40, completions: 19200, country: "🇦🇺 Australia", rating: 4.4 },
    { id: 5, title: "Gaming Preferences Survey", payout: 1.95, completions: 26500, country: "🇯🇵 Japan", rating: 4.6 },
    { id: 6, title: "Streaming Services Feedback", payout: 1.60, completions: 21000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 7, title: "Online Shopping Behavior", payout: 2.25, completions: 31000, country: "🇬🇧 UK", rating: 4.7 },
    { id: 8, title: "Social Media Usage Survey", payout: 1.30, completions: 28000, country: "🇨🇦 Canada", rating: 4.3 },
    { id: 9, title: "Fitness Tracker Feedback Survey", payout: 1.50, completions: 23000, country: "🇦🇺 Australia", rating: 4.5 },
    { id: 10, title: "Food Delivery Preferences Survey", payout: 1.80, completions: 24000, country: "🇺🇸 USA", rating: 4.6 },
    { id: 11, title: "Streaming Preferences Survey", payout: 1.60, completions: 20000, country: "🇬🇧 UK", rating: 4.5 },
    { id: 12, title: "Mobile Payment Survey", payout: 2.05, completions: 27500, country: "🇨🇦 Canada", rating: 4.6 },
    { id: 13, title: "Gaming Trends Survey", payout: 1.85, completions: 29000, country: "🇦🇺 Australia", rating: 4.7 },
    { id: 14, title: "Tech Gadget Feedback Survey", payout: 2.15, completions: 31000, country: "🇺🇸 USA", rating: 4.7 },
    { id: 15, title: "Online Shopping Feedback", payout: 2.05, completions: 28000, country: "🇬🇧 UK", rating: 4.6 },
    { id: 16, title: "Food & Beverage Preferences", payout: 1.80, completions: 27000, country: "🇨🇦 Canada", rating: 4.4 },
    { id: 17, title: "Social Media Usage Study", payout: 2.00, completions: 25000, country: "🇯🇵 Japan", rating: 4.5 },
    { id: 18, title: "Music Streaming Feedback", payout: 1.40, completions: 23000, country: "🇦🇺 Australia", rating: 4.3 },
    { id: 19, title: "Retail Shopping Behavior Survey", payout: 1.90, completions: 27500, country: "🇺🇸 USA", rating: 4.6 },
    { id: 20, title: "Tech Gadget Usage Survey", payout: 2.25, completions: 29500, country: "🇬🇧 UK", rating: 4.7 },
  ],

  app_installs: [
    { id: 1, title: "Install Revolut Banking App", payout: 3.80, completions: 39800, country: "🇬🇧 UK", rating: 4.6 },
    { id: 2, title: "Install TikTok & Sign Up", payout: 4.50, completions: 50000, country: "🇺🇸 USA", rating: 4.8 },
    { id: 3, title: "Install Binance App", payout: 5.20, completions: 45000, country: "🇨🇦 Canada", rating: 4.7 },
    { id: 4, title: "Install Food Delivery App", payout: 3.20, completions: 28000, country: "🇦🇺 Australia", rating: 4.5 },
    { id: 5, title: "Install VPN App", payout: 4.10, completions: 35000, country: "🇯🇵 Japan", rating: 4.6 },
    { id: 6, title: "Install Shopping App", payout: 3.50, completions: 42000, country: "🇺🇸 USA", rating: 4.7 },
    { id: 7, title: "Install Crypto Wallet", payout: 4.90, completions: 30000, country: "🇬🇧 UK", rating: 4.6 },
    { id: 8, title: "Install Fitness App", payout: 2.80, completions: 27000, country: "🇨🇦 Canada", rating: 4.4 },
    { id: 9, title: "Install Travel App", payout: 3.75, completions: 45000, country: "🇦🇺 Australia", rating: 4.7 },
    { id: 10, title: "Install News App", payout: 3.10, completions: 32000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 11, title: "Install Weather App", payout: 3.20, completions: 35000, country: "🇬🇧 UK", rating: 4.6 },
    { id: 12, title: "Install Language Learning App", payout: 4.00, completions: 42000, country: "🇨🇦 Canada", rating: 4.7 },
    { id: 13, title: "Install Music Streaming App", payout: 3.90, completions: 38000, country: "🇦🇺 Australia", rating: 4.6 },
    { id: 14, title: "Install Health App", payout: 3.40, completions: 34000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 15, title: "Install Game Streaming App", payout: 4.50, completions: 50000, country: "🇬🇧 UK", rating: 4.8 },
    { id: 16, title: "Install Social Media App", payout: 3.60, completions: 42000, country: "🇨🇦 Canada", rating: 4.6 },
    { id: 17, title: "Install E-commerce App", payout: 4.20, completions: 39000, country: "🇦🇺 Australia", rating: 4.7 },
    { id: 18, title: "Install Fitness Tracker App", payout: 3.10, completions: 33000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 19, title: "Install Digital Wallet App", payout: 4.00, completions: 41000, country: "🇬🇧 UK", rating: 4.6 },
    { id: 20, title: "Install Study App", payout: 3.50, completions: 37000, country: "🇨🇦 Canada", rating: 4.4 },
  ],

  play_games: [
    { id: 1, title: "Reach Level 20 in Puzzle Game", payout: 5.20, completions: 38900, country: "🇨🇦 Canada", rating: 4.7 },
    { id: 2, title: "Complete Daily Missions", payout: 6.00, completions: 48000, country: "🇺🇸 USA", rating: 4.6 },
    { id: 3, title: "Win Tournament Challenge", payout: 7.50, completions: 35000, country: "🇯🇵 Japan", rating: 4.8 },
    { id: 4, title: "Reach Level 50 RPG Game", payout: 8.20, completions: 42000, country: "🇬🇧 UK", rating: 4.7 },
    { id: 5, title: "Complete Strategy Game Tasks", payout: 6.80, completions: 37000, country: "🇦🇺 Australia", rating: 4.6 },
    { id: 6, title: "Win 10 Matches", payout: 4.90, completions: 33000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 7, title: "Daily Login Rewards", payout: 3.60, completions: 52000, country: "🇨🇦 Canada", rating: 4.4 },
    { id: 8, title: "Complete Beginner Missions", payout: 2.80, completions: 41000, country: "🇬🇧 UK", rating: 4.3 },
    { id: 9, title: "Unlock Advanced Levels", payout: 5.10, completions: 46000, country: "🇺🇸 USA", rating: 4.6 },
    { id: 10, title: "Complete Campaign Challenges", payout: 6.30, completions: 49000, country: "🇨🇦 Canada", rating: 4.7 },
    { id: 11, title: "Win Tournament Prizes", payout: 7.80, completions: 52000, country: "🇬🇧 UK", rating: 4.8 },
    { id: 12, title: "Reach Level 100", payout: 9.00, completions: 55000, country: "🇯🇵 Japan", rating: 4.9 },
    { id: 13, title: "Compete in Ranked Matches", payout: 6.40, completions: 44000, country: "🇦🇺 Australia", rating: 4.6 },
    { id: 14, title: "Complete All Objectives", payout: 7.20, completions: 48000, country: "🇺🇸 USA", rating: 4.7 },
    { id: 15, title: "Finish Elite Challenges", payout: 8.00, completions: 46000, country: "🇨🇦 Canada", rating: 4.8 },
    { id: 16, title: "Win Multiplayer Tournaments", payout: 6.60, completions: 50000, country: "🇬🇧 UK", rating: 4.7 },
    { id: 17, title: "Complete Battle Royale Tasks", payout: 7.00, completions: 42000, country: "🇯🇵 Japan", rating: 4.7 },
    { id: 18, title: "Earn Daily Rewards", payout: 6.50, completions: 45000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 19, title: "Unlock Special Achievements", payout: 7.30, completions: 49000, country: "🇨🇦 Canada", rating: 4.6 },
    { id: 20, title: "Join Pro League", payout: 8.10, completions: 53000, country: "🇬🇧 UK", rating: 4.8 },
  ],

  watch_videos: [
    { id: 1, title: "Watch Sponsored Ads", payout: 0.65, completions: 78000, country: "🇺🇸 USA", rating: 4.4 },
    { id: 2, title: "Watch Short Videos", payout: 1.00, completions: 55000, country: "🇬🇧 UK", rating: 4.7 },
    { id: 3, title: "Watch & Rate Ads", payout: 1.25, completions: 62000, country: "🇨🇦 Canada", rating: 4.6 },
    { id: 4, title: "Watch Gaming Streams", payout: 0.90, completions: 68000, country: "🇦🇺 Australia", rating: 4.5 },
    { id: 5, title: "Watch Tech Reviews", payout: 1.10, completions: 47000, country: "🇯🇵 Japan", rating: 4.6 },
    { id: 6, title: "Watch Movie Trailers", payout: 0.70, completions: 80000, country: "🇺🇸 USA", rating: 4.4 },
    { id: 7, title: "Watch Ads Playlist", payout: 0.85, completions: 72000, country: "🇬🇧 UK", rating: 4.5 },
    { id: 8, title: "Watch Sponsored Clips", payout: 0.95, completions: 69000, country: "🇨🇦 Canada", rating: 4.6 },
    { id: 9, title: "Watch Music Videos", payout: 0.80, completions: 73000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 10, title: "Watch Sports Highlights", payout: 0.75, completions: 71000, country: "🇬🇧 UK", rating: 4.6 },
    { id: 11, title: "Watch Travel Vlogs", payout: 1.00, completions: 66000, country: "🇨🇦 Canada", rating: 4.6 },
    { id: 12, title: "Watch Daily Ads", payout: 0.95, completions: 68000, country: "🇦🇺 Australia", rating: 4.5 },
    { id: 13, title: "Watch Promo Ads", payout: 0.60, completions: 79000, country: "🇯🇵 Japan", rating: 4.4 },
    { id: 14, title: "Watch Cooking Shows", payout: 0.85, completions: 75000, country: "🇺🇸 USA", rating: 4.5 },
    { id: 15, title: "Watch Comedy Clips", payout: 0.90, completions: 74000, country: "🇬🇧 UK", rating: 4.6 },
    { id: 16, title: "Watch Movie Reviews", payout: 0.70, completions: 76000, country: "🇨🇦 Canada", rating: 4.5 },
    { id: 17, title: "Watch Fitness Tutorials", payout: 0.80, completions: 72000, country: "🇦🇺 Australia", rating: 4.5 },
    { id: 18, title: "Watch Product Demos", payout: 0.95, completions: 69000, country: "🇯🇵 Japan", rating: 4.6 },
    { id: 19, title: "Watch Eco-friendly Videos", payout: 0.85, completions: 71000, country: "🇺🇸 USA", rating: 4.4 },
    { id: 20, title: "Watch Health Tips Videos", payout: 0.80, completions: 73000, country: "🇬🇧 UK", rating: 4.5 },
  ],
};

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
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              {data?.title}
            </span>
          </h2>
        </div>

        {/* CATEGORY */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {data?.categories?.map((c: any) => (
            <motion.button
              key={c.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(c.key)}
              className={`px-6 py-3 rounded-full font-semibold ${
                category === c.key
                  ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black"
                  : "bg-gray-100 dark:bg-white/5"
              }`}
            >
              {c.label}
            </motion.button>
          ))}
        </div>

        {/* LOADING */}
        {loading ? (
          <CardSkeleton rows={5} />
        ) : (
          <div className="rounded-xl border overflow-hidden">

            {/* HEADER */}
            <div className="grid grid-cols-4 px-4 py-3 text-xs font-semibold text-gray-500 border-b">
              <div>Name</div>
              <div>Country</div>
              <div>Completed</div>
              <div className="text-right">($) Payout</div>
            </div>

            {/* ROWS */}
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="grid grid-cols-4 items-center px-4 py-4 border-b hover:bg-gray-50 dark:hover:bg-white/10"
              >
                <div>{offer.title}</div>
                <div>{offer.country}</div>
                <div>{offer.completions.toLocaleString()}</div>
                <div className="text-right">${offer.payout.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </OpeningStyle>
  );
}
