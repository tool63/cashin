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
  badgeHigh?: boolean;
  badgeFast?: boolean;
  badgeNew?: boolean;
  badgeTrending?: boolean;
  badgeLimited?: boolean;
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

/* ===================== DATA GENERATOR ===================== */

const generateOffers = (category: CategoryKey): Offer[] => {
  const base = [
    "Quick Survey",
    "Mobile App Install",
    "Game Bonus",
    "Video Reward",
    "Task Completion",
    "Daily Challenge",
    "High Reward Offer",
    "Exclusive Deal",
    "Fast Cash Task",
    "Limited Time Offer",
  ];

  const offers: Offer[] = [];

  for (let i = 1; i <= 20; i++) {
    const title = `${base[i % base.length]} #${i}`;

    offers.push({
      id: i,
      title: `${category.toUpperCase()} - ${title}`,
      payout: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
      completions: Math.floor(Math.random() * 50000 + 1000),
      country: "Global",
      badgeHigh: Math.random() > 0.7,
      badgeFast: Math.random() > 0.6,
      badgeNew: Math.random() > 0.8,
      badgeTrending: Math.random() > 0.5,
      difficulty: ["Easy", "Medium", "Hard"][
        Math.floor(Math.random() * 3)
      ] as any,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    });
  }

  return offers.sort((a, b) => b.payout - a.payout);
};

/* ===================== COMPONENT ===================== */

export default function HighPayingOffers({ data }: Props) {
  const [category, setCategory] = useState<CategoryKey>("surveys");
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  const offers = useMemo(() => generateOffers(category), [category]);

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
          <CardSkeleton rows={10} />
        ) : (
          /* OFFERS */
          <div className="rounded-xl border overflow-hidden">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex justify-between items-center p-4 border-b"
              >
                {/* LEFT */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span>{offer.title}</span>

                  {offer.badgeHigh && <Crown size={14} />}
                  {offer.badgeFast && <Zap size={14} />}
                  {offer.badgeTrending && <TrendingUp size={14} />}
                  {offer.badgeNew && <Star size={14} />}

                  <span className="text-xs text-gray-500">
                    ({offer.difficulty})
                  </span>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <div className="font-bold text-green-500">
                    ${offer.payout.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    ⭐ {offer.rating} | {offer.completions} completions
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
