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
