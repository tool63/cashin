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
  country: string; // USA, UK, etc
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

/* ===================== FLAG HELPER ===================== */

const getFlag = (country: string) => {
  switch (country) {
    case "USA":
      return "🇺🇸";
    case "UK":
      return "🇬🇧";
    case "Canada":
      return "🇨🇦";
    case "Australia":
      return "🇦🇺";
    case "Japan":
      return "🇯🇵";
    case "Europe":
      return "🇪🇺";
    default:
      return "🌍";
  }
};

/* ===================== COUNTRY POOL ===================== */

const countryPool = ["USA", "UK", "Canada", "Australia", "Japan", "Europe"];
const getCountry = (i: number) => countryPool[i % countryPool.length];

/* ===================== DATA ===================== */

const categoryOffers: Record<CategoryKey, Offer[]> = {
  surveys: [
    {
      id: 1,
      title: "Netflix Viewing Habits Survey",
      payout: 1.25,
      completions: 18200,
      country: "USA",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Install Market Research Survey",
      payout: 1.75,
      completions: 25000,
      country: "UK",
      rating: 4.6,
    },
    {
      id: 3,
      title: "Consumer Preferences Survey",
      payout: 2.10,
      completions: 13800,
      country: "Canada",
      rating: 4.7,
    },
    {
      id: 4,
      title: "User Feedback on New Features",
      payout: 1.90,
      completions: 22000,
      country: "Australia",
      rating: 4.4,
    },
    {
      id: 5,
      title: "E-commerce Shopping Experience Survey",
      payout: 1.60,
      completions: 15000,
      country: "USA",
      rating: 4.3,
    },
    {
      id: 6,
      title: "Smartphone App Usability Survey",
      payout: 1.80,
      completions: 24000,
      country: "UK",
      rating: 4.5,
    },
    {
      id: 7,
      title: "Health & Fitness Survey",
      payout: 2.00,
      completions: 18000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 8,
      title: "Travel Preferences Survey",
      payout: 1.40,
      completions: 28000,
      country: "USA",
      rating: 4.3,
    },
    {
      id: 9,
      title: "Workplace Satisfaction Survey",
      payout: 1.85,
      completions: 22000,
      country: "Australia",
      rating: 4.4,
    },
    {
      id: 10,
      title: "Tech Product Feedback Survey",
      payout: 1.95,
      completions: 25000,
      country: "UK",
      rating: 4.7,
    },
    {
      id: 11,
      title: "Market Research on Shopping Trends",
      payout: 2.30,
      completions: 27000,
      country: "Canada",
      rating: 4.8,
    },
    {
      id: 12,
      title: "Customer Experience Survey",
      payout: 1.70,
      completions: 20000,
      country: "USA",
      rating: 4.5,
    },
    {
      id: 13,
      title: "Food Preferences Survey",
      payout: 1.50,
      completions: 22000,
      country: "UK",
      rating: 4.4,
    },
    {
      id: 14,
      title: "Online Shopping Experience Survey",
      payout: 2.20,
      completions: 23000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 15,
      title: "Entertainment Survey",
      payout: 2.10,
      completions: 26000,
      country: "USA",
      rating: 4.7,
    },
    {
      id: 16,
      title: "Tech Consumer Insights",
      payout: 2.00,
      completions: 20000,
      country: "Australia",
      rating: 4.5,
    },
    {
      id: 17,
      title: "Fashion Preferences Survey",
      payout: 1.80,
      completions: 21000,
      country: "UK",
      rating: 4.4,
    },
    {
      id: 18,
      title: "Health Products Survey",
      payout: 2.05,
      completions: 19000,
      country: "Canada",
      rating: 4.7,
    },
    {
      id: 19,
      title: "Consumer Goods Feedback Survey",
      payout: 1.60,
      completions: 23000,
      country: "USA",
      rating: 4.3,
    },
    {
      id: 20,
      title: "Mobile App Usage Survey",
      payout: 1.90,
      completions: 24000,
      country: "Australia",
      rating: 4.5,
    },
  ],

  app_installs: [
    {
      id: 1,
      title: "Install Revolut Banking App",
      payout: 3.80,
      completions: 39800,
      country: "UK",
      rating: 4.6,
    },
    {
      id: 2,
      title: "Install Spotify App & Sign Up",
      payout: 4.50,
      completions: 50000,
      country: "USA",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Install Mobile Game & Play",
      payout: 3.20,
      completions: 22000,
      country: "Canada",
      rating: 4.5,
    },
    {
      id: 4,
      title: "Install Amazon Shopping App",
      payout: 3.30,
      completions: 35000,
      country: "USA",
      rating: 4.7,
    },
    {
      id: 5,
      title: "Install Uber Eats & Order",
      payout: 3.10,
      completions: 28000,
      country: "UK",
      rating: 4.4,
    },
    {
      id: 6,
      title: "Install Walmart App & Shop",
      payout: 3.50,
      completions: 45000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 7,
      title: "Install PayPal App & Link Card",
      payout: 3.00,
      completions: 32000,
      country: "USA",
      rating: 4.5,
    },
    {
      id: 8,
      title: "Install Google Pay & Send Money",
      payout: 3.40,
      completions: 36000,
      country: "UK",
      rating: 4.7,
    },
    {
      id: 9,
      title: "Install TikTok & Watch Videos",
      payout: 3.10,
      completions: 29000,
      country: "Canada",
      rating: 4.4,
    },
    {
      id: 10,
      title: "Install Facebook & Create Account",
      payout: 2.90,
      completions: 27000,
      country: "USA",
      rating: 4.3,
    },
    {
      id: 11,
      title: "Install Netflix & Watch a Movie",
      payout: 4.00,
      completions: 51000,
      country: "UK",
      rating: 4.8,
    },
    {
      id: 12,
      title: "Install Twitter App & Follow Accounts",
      payout: 2.80,
      completions: 24000,
      country: "Canada",
      rating: 4.5,
    },
    {
      id: 13,
      title: "Install Reddit App & Join Communities",
      payout: 3.00,
      completions: 30000,
      country: "USA",
      rating: 4.6,
    },
    {
      id: 14,
      title: "Install Instagram & Post a Photo",
      payout: 3.50,
      completions: 40000,
      country: "UK",
      rating: 4.7,
    },
    {
      id: 15,
      title: "Install Zoom & Join a Meeting",
      payout: 3.00,
      completions: 27000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 16,
      title: "Install TikTok & Create a Video",
      payout: 3.10,
      completions: 35000,
      country: "USA",
      rating: 4.5,
    },
    {
      id: 17,
      title: "Install Skype & Call a Friend",
      payout: 2.90,
      completions: 23000,
      country: "UK",
      rating: 4.3,
    },
    {
      id: 18,
      title: "Install Messenger & Send a Message",
      payout: 2.80,
      completions: 28000,
      country: "Canada",
      rating: 4.4,
    },
    {
      id: 19,
      title: "Install LinkedIn & Add a Connection",
      payout: 3.20,
      completions: 37000,
      country: "USA",
      rating: 4.6,
    },
    {
      id: 20,
      title: "Install WhatsApp & Make a Call",
      payout: 3.50,
      completions: 41000,
      country: "UK",
      rating: 4.7,
    },
  ],

  play_games: [
    {
      id: 1,
      title: "Reach Level 20 in Puzzle Game",
      payout: 5.20,
      completions: 38900,
      country: "Canada",
      rating: 4.7,
    },
    {
      id: 2,
      title: "Complete Daily Mission in RPG",
      payout: 6.00,
      completions: 48000,
      country: "USA",
      rating: 4.6,
    },
    {
      id: 3,
      title: "Win Tournament Challenge",
      payout: 7.50,
      completions: 35000,
      country: "Japan",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Complete 10 Quests in Fantasy RPG",
      payout: 6.20,
      completions: 42000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 5,
      title: "Level Up in Action Game",
      payout: 5.50,
      completions: 38000,
      country: "USA",
      rating: 4.7,
    },
    {
      id: 6,
      title: "Win Multiplayer Battle",
      payout: 6.80,
      completions: 33000,
      country: "Japan",
      rating: 4.9,
    },
    {
      id: 7,
      title: "Complete Racing Game Challenge",
      payout: 5.40,
      completions: 40000,
      country: "Canada",
      rating: 4.5,
    },
    {
      id: 8,
      title: "Defeat Boss in RPG",
      payout: 6.50,
      completions: 37000,
      country: "USA",
      rating: 4.8,
    },
    {
      id: 9,
      title: "Unlock New Skin in Mobile Game",
      payout: 5.00,
      completions: 33000,
      country: "Japan",
      rating: 4.6,
    },
    {
      id: 10,
      title: "Complete Puzzle Challenge",
      payout: 5.20,
      completions: 42000,
      country: "Canada",
      rating: 4.7,
    },
    {
      id: 11,
      title: "Win in Multiplayer FPS",
      payout: 7.00,
      completions: 35000,
      country: "USA",
      rating: 4.9,
    },
    {
      id: 12,
      title: "Complete Stealth Game Challenge",
      payout: 6.30,
      completions: 33000,
      country: "Japan",
      rating: 4.8,
    },
    {
      id: 13,
      title: "Level Up in Online Strategy Game",
      payout: 5.40,
      completions: 36000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 14,
      title: "Reach High Score in Arcade Game",
      payout: 5.10,
      completions: 31000,
      country: "USA",
      rating: 4.5,
    },
    {
      id: 15,
      title: "Win Battle Royale",
      payout: 7.20,
      completions: 42000,
      country: "Japan",
      rating: 4.9,
    },
    {
      id: 16,
      title: "Complete 15 Missions in RPG",
      payout: 6.00,
      completions: 38000,
      country: "Canada",
      rating: 4.7,
    },
    {
      id: 17,
      title: "Complete Time Trial in Racing Game",
      payout: 5.60,
      completions: 34000,
      country: "USA",
      rating: 4.6,
    },
    {
      id: 18,
      title: "Master Strategy Game",
      payout: 6.80,
      completions: 45000,
      country: "Japan",
      rating: 4.8,
    },
    {
      id: 19,
      title: "Win in Team-based FPS",
      payout: 7.50,
      completions: 39000,
      country: "Canada",
      rating: 4.9,
    },
    {
      id: 20,
      title: "Unlock New Character in RPG",
      payout: 5.70,
      completions: 42000,
      country: "USA",
      rating: 4.7,
    },
  ],

  watch_videos: [
    {
      id: 1,
      title: "Watch Sponsored Ads",
      payout: 0.65,
      completions: 78000,
      country: "USA",
      rating: 4.4,
    },
    {
      id: 2,
      title: "Watch Short Sponsored Videos",
      payout: 1.00,
      completions: 55000,
      country: "UK",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Watch & Rate New Ads",
      payout: 1.25,
      completions: 62000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 4,
      title: "Watch 5 Ads for Rewards",
      payout: 0.80,
      completions: 45000,
      country: "USA",
      rating: 4.3,
    },
    {
      id: 5,
      title: "Watch 10 Short Videos",
      payout: 1.10,
      completions: 55000,
      country: "UK",
      rating: 4.5,
    },
    {
      id: 6,
      title: "Watch Video & Complete Quiz",
      payout: 1.20,
      completions: 60000,
      country: "Canada",
      rating: 4.7,
    },
    {
      id: 7,
      title: "Watch Sponsored Clips",
      payout: 0.90,
      completions: 48000,
      country: "USA",
      rating: 4.4,
    },
    {
      id: 8,
      title: "Watch Ad for Free Points",
      payout: 1.30,
      completions: 53000,
      country: "UK",
      rating: 4.6,
    },
    {
      id: 9,
      title: "Watch 5 Ads & Earn Rewards",
      payout: 0.75,
      completions: 40000,
      country: "Canada",
      rating: 4.5,
    },
    {
      id: 10,
      title: "Watch Exclusive Content",
      payout: 1.50,
      completions: 55000,
      country: "USA",
      rating: 4.6,
    },
    {
      id: 11,
      title: "Watch Ads for Points",
      payout: 1.00,
      completions: 45000,
      country: "UK",
      rating: 4.4,
    },
    {
      id: 12,
      title: "Watch 20 Sponsored Videos",
      payout: 1.25,
      completions: 60000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 13,
      title: "Watch Short Ads for Coins",
      payout: 0.85,
      completions: 48000,
      country: "USA",
      rating: 4.5,
    },
    {
      id: 14,
      title: "Watch Ad & Answer Question",
      payout: 1.10,
      completions: 53000,
      country: "UK",
      rating: 4.7,
    },
    {
      id: 15,
      title: "Watch Ads & Rate Content",
      payout: 1.00,
      completions: 51000,
      country: "Canada",
      rating: 4.4,
    },
    {
      id: 16,
      title: "Watch Ads for Extra Points",
      payout: 1.20,
      completions: 46000,
      country: "USA",
      rating: 4.6,
    },
    {
      id: 17,
      title: "Watch & Review Sponsored Content",
      payout: 1.40,
      completions: 55000,
      country: "UK",
      rating: 4.8,
    },
    {
      id: 18,
      title: "Watch 15 Ads for Rewards",
      payout: 1.25,
      completions: 60000,
      country: "Canada",
      rating: 4.6,
    },
    {
      id: 19,
      title: "Watch Video & Get Free Coins",
      payout: 0.95,
      completions: 52000,
      country: "USA",
      rating: 4.4,
    },
    {
      id: 20,
      title: "Watch Ads for Extra Coins",
      payout: 1.30,
      completions: 55000,
      country: "UK",
      rating: 4.5,
    },
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

  const getBadge = (offer: Offer) => {
    if (offer.payout > 3) return "🚀";
    if (offer.completions > 40000) return "🔥";
    if (offer.rating && offer.rating > 4.6) return "🆕";
    return null;
  };

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
            {offers.map((offer) => {
              const badge = getBadge(offer);

              return (
                <div
                  key={offer.id}
                  className="grid grid-cols-4 items-center px-4 py-4 border-b hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm"
                >
                  {/* NAME */}
                  <div className="flex items-center gap-2 font-medium truncate">
                    {offer.title}
                    {badge && <span>{badge}</span>}
                  </div>

                  {/* FLAG */}
                  <div className="text-lg">
                    {getFlag(offer.country)}
                  </div>

                  {/* COMPLETED */}
                  <div className="text-gray-600 dark:text-gray-400">
                    {offer.completions.toLocaleString()}
                  </div>

                  {/* PAYOUT */}
                  <div className="flex justify-end items-center gap-2">
                    <span className="font-bold text-green-500">
                      ${offer.payout.toFixed(2)}
                    </span>
                    {offer.rating && (
                      <span className="text-xs text-gray-500">
                        ⭐{offer.rating}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>
    </OpeningStyle>
  );
}
