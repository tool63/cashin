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

/* ===================== REALISTIC DATA ===================== */

const categoryOffers: Record<CategoryKey, Offer[]> = {
  surveys: [
    {
      id: 1,
      title: "Market Research Survey - Tech Users",
      payout: 1.2,
      completions: 12000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.3,
    },
    {
      id: 2,
      title: "Consumer Behavior Survey",
      payout: 1.5,
      completions: 18000,
      country: "Global",
      difficulty: "Medium",
      rating: 4.5,
    },
    {
      id: 3,
      title: "Health & Fitness Survey",
      payout: 0.9,
      completions: 9000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.2,
    },
  ],

  app_installs: [
    {
      id: 1,
      title: "Install & Open Finance App",
      payout: 2.1,
      completions: 25000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.6,
    },
    {
      id: 2,
      title: "Install Shopping App & Signup",
      payout: 2.5,
      completions: 30000,
      country: "Global",
      difficulty: "Medium",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Install Gaming App & Play",
      payout: 1.8,
      completions: 22000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.4,
    },
  ],

  play_games: [
    {
      id: 1,
      title: "Reach Level 10 in Puzzle Game",
      payout: 3.2,
      completions: 15000,
      country: "Global",
      difficulty: "Medium",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Win 5 Matches in Strategy Game",
      payout: 4.5,
      completions: 18000,
      country: "Global",
      difficulty: "Hard",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Complete Beginner Missions",
      payout: 2.8,
      completions: 20000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.3,
    },
  ],

  watch_videos: [
    {
      id: 1,
      title: "Watch 10 Short Ads",
      payout: 0.5,
      completions: 50000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.2,
    },
    {
      id: 2,
      title: "Watch Sponsored Content",
      payout: 0.8,
      completions: 60000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.4,
    },
    {
      id: 3,
      title: "Watch Video & Answer Questions",
      payout: 0.7,
      completions: 45000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.3,
    },
  ],
};

/* ===================== COMPONENT ===================== */

export default function HighPayingOffers({ data }: Props) {
  const [category, setCategory] = useState<CategoryKey>("surveys");
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

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

        {/* LOADING (ROW BASED) */}
        {loading ? (
          <CardSkeleton rows={5} />
        ) : (
          /* ROW BASED OFFER LIST (VERCEL STYLE) */
          <div className="rounded-xl border overflow-hidden">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex justify-between items-center px-4 py-4 border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4 w-2/3">
                  <span className="font-medium">{offer.title}</span>

                  <span className="text-xs text-gray-500">
                    ({offer.difficulty})
                  </span>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-end gap-1">
                  <div className="font-bold text-green-500">
                    ${offer.payout.toFixed(2)}
                  </div>

                  <div className="text-xs text-gray-500">
                    ⭐ {offer.rating} | {offer.completions}
                  </div>

                  {/* ICON BADGES */}
                  <div className="flex gap-2">
                    {offer.payout > 3 && <Crown size={14} />}
                    {offer.rating && offer.rating > 4.5 && (
                      <Star size={14} />
                    )}
                    {offer.payout < 1 && <Zap size={14} />}
                    {offer.completions > 40000 && (
                      <TrendingUp size={14} />
                    )}
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
