"use client";

import { useEffect, useMemo, useState } from "react";
import { Zap, TrendingUp, Star, Crown } from "lucide-react";
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
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Survey Offer ${i + 1}`,
      payout: +(0.8 + i * 0.12).toFixed(2),
      completions: 5000 + i * 3000,
      country: getCountry(i),
      rating: +(4.1 + (i % 5) * 0.1).toFixed(1),
    })),

    // ➕ 3 NEW
    {
      id: 21,
      title: "Quick Market Insights",
      payout: 1.95,
      completions: 28500,
      country: "🇺🇸 USA",
      rating: 4.6,
    },
    {
      id: 22,
      title: "Brand Feedback Survey",
      payout: 2.15,
      completions: 32000,
      country: "🇬🇧 UK",
      rating: 4.7,
    },
    {
      id: 23,
      title: "Product Experience Survey",
      payout: 2.35,
      completions: 41000,
      country: "🇨🇦 Canada",
      rating: 4.8,
    },
  ],

  app_installs: [
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Install App ${i + 1}`,
      payout: +(1.5 + i * 0.18).toFixed(2),
      completions: 10000 + i * 3500,
      country: getCountry(i),
      rating: +(4.2 + (i % 4) * 0.1).toFixed(1),
    })),

    // ➕ 3 NEW
    {
      id: 21,
      title: "Finance App Install",
      payout: 3.25,
      completions: 38000,
      country: "🇺🇸 USA",
      rating: 4.6,
    },
    {
      id: 22,
      title: "Shopping App Install",
      payout: 3.75,
      completions: 42000,
      country: "🇬🇧 UK",
      rating: 4.7,
    },
    {
      id: 23,
      title: "Gaming App Install",
      payout: 4.1,
      completions: 50000,
      country: "🇨🇦 Canada",
      rating: 4.8,
    },
  ],

  play_games: [
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Game Task ${i + 1}`,
      payout: +(2.2 + i * 0.22).toFixed(2),
      completions: 8000 + i * 2500,
      country: getCountry(i),
      rating: +(4.3 + (i % 5) * 0.1).toFixed(1),
    })),

    // ➕ 3 NEW
    {
      id: 21,
      title: "Reach Level 20",
      payout: 5.25,
      completions: 45000,
      country: "🇺🇸 USA",
      rating: 4.7,
    },
    {
      id: 22,
      title: "Win Tournament",
      payout: 6.5,
      completions: 52000,
      country: "🇯🇵 Japan",
      rating: 4.8,
    },
    {
      id: 23,
      title: "Daily Missions",
      payout: 4.75,
      completions: 48000,
      country: "🇦🇺 Australia",
      rating: 4.6,
    },
  ],

  watch_videos: [
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Watch & Earn ${i + 1}`,
      payout: +(0.3 + i * 0.06).toFixed(2),
      completions: 20000 + i * 4000,
      country: getCountry(i),
      rating: +(4.0 + (i % 3) * 0.1).toFixed(1),
    })),

    // ➕ 3 NEW
    {
      id: 21,
      title: "Premium Video Watch",
      payout: 0.95,
      completions: 65000,
      country: "🇬🇧 UK",
      rating: 4.6,
    },
    {
      id: 22,
      title: "Ad Engagement Task",
      payout: 0.85,
      completions: 72000,
      country: "🇺🇸 USA",
      rating: 4.7,
    },
    {
      id: 23,
      title: "Short Video Tasks",
      payout: 0.75,
      completions: 80000,
      country: "🇨🇦 Canada",
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
    if (offer.payout > 3) return "HOT";
    if (offer.completions > 40000) return "TRENDING";
    if (offer.rating && offer.rating > 4.6) return "NEW";
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
                  <div className="flex items-center gap-2 font-medium truncate">
                    {offer.title}

                    {badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        badge === "HOT"
                          ? "bg-red-500 text-white"
                          : badge === "TRENDING"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-500 text-white"
                      }`}>
                        {badge}
                      </span>
                    )}
                  </div>

                  <div className="text-gray-600 dark:text-gray-400">
                    {offer.country}
                  </div>

                  <div className="text-gray-600 dark:text-gray-400">
                    {offer.completions.toLocaleString()}
                  </div>

                  <div className="flex justify-end items-center">
                    <span className="font-bold text-green-500">
                      ${offer.payout.toFixed(2)}
                    </span>
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
