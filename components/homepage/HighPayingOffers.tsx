"use client";

import { useEffect, useMemo, useState } from "react";
import { Zap, TrendingUp, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import OpeningStyle from "@/components/animations/openingstyle";
import CardSkeleton from "@/components/loading/CardSkeleton";

/* ===================== TYPES ===================== */

type Offer = {
  id: number;
  title: string;
  payout: number;
  completions: number;
  country: string;
  difficulty?: "Easy" | "Medium" | "Hard";
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

/* ===================== DATA ===================== */

const categoryOffers: Record<CategoryKey, Offer[]> = {
  surveys: [
    { id: 1, title: "Market Survey", payout: 1.2, completions: 12000, country: "Global", difficulty: "Easy", rating: 4.3 },
    { id: 2, title: "Consumer Survey", payout: 1.5, completions: 18000, country: "Global", difficulty: "Medium", rating: 4.5 },
    { id: 3, title: "Health Survey", payout: 0.9, completions: 9000, country: "Global", difficulty: "Easy", rating: 4.2 },
  ],

  app_installs: [
    { id: 1, title: "Install Finance App", payout: 2.1, completions: 25000, country: "Global", difficulty: "Easy", rating: 4.6 },
    { id: 2, title: "Install Shopping App", payout: 2.5, completions: 30000, country: "Global", difficulty: "Medium", rating: 4.7 },
    { id: 3, title: "Install Game App", payout: 1.8, completions: 22000, country: "Global", difficulty: "Easy", rating: 4.4 },
  ],

  play_games: [
    { id: 1, title: "Reach Level 10", payout: 3.2, completions: 15000, country: "Global", difficulty: "Medium", rating: 4.5 },
    { id: 2, title: "Win 5 Matches", payout: 4.5, completions: 18000, country: "Global", difficulty: "Hard", rating: 4.7 },
    { id: 3, title: "Complete Missions", payout: 2.8, completions: 20000, country: "Global", difficulty: "Easy", rating: 4.3 },
  ],

  watch_videos: [
    { id: 1, title: "Watch 10 Ads", payout: 0.5, completions: 50000, country: "Global", difficulty: "Easy", rating: 4.2 },
    { id: 2, title: "Watch Content", payout: 0.8, completions: 60000, country: "Global", difficulty: "Easy", rating: 4.4 },
    { id: 3, title: "Watch & Answer", payout: 0.7, completions: 45000, country: "Global", difficulty: "Easy", rating: 4.3 },
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
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              {data?.title}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {data?.description}
          </p>
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
            <div className="grid grid-cols-4 px-4 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200 dark:border-white/10">
              <div>Name</div>
              <div>Country</div>
              <div>Completed</div>
              <div className="text-right">($) Payout</div>
            </div>

            {/* ROWS */}
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="grid grid-cols-4 items-center px-4 py-4 border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm"
              >
                {/* NAME */}
                <div className="font-medium truncate">
                  {offer.title}
                </div>

                {/* COUNTRY */}
                <div className="text-gray-600 dark:text-gray-400">
                  🌍 {offer.country}
                </div>

                {/* COMPLETED */}
                <div className="text-gray-600 dark:text-gray-400">
                  {offer.completions.toLocaleString()}
                </div>

                {/* PAYOUT */}
                <div className="flex justify-end items-center gap-3">
                  <span className="font-bold text-green-500">
                    ${offer.payout.toFixed(2)}
                  </span>

                  <div className="flex gap-2">
                    {offer.payout > 3 && <Crown size={14} />}
                    {offer.rating && offer.rating > 4.5 && <Star size={14} />}
                    {offer.payout < 1 && <Zap size={14} />}
                    {offer.completions > 40000 && <TrendingUp size={14} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>
    </OpeningStyle>
  );
}
