"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Zap,
  TrendingUp,
  Star,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import OpeningStyle from "@/components/animations/openingstyle";

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

/* ===================== FAKE DATA ===================== */

const generateOffers = (category: CategoryKey): Offer[] => {
  return [
    {
      id: 1,
      title: "Sample Offer",
      payout: 2.5,
      completions: 12000,
      country: "Global",
      badgeHigh: true,
      badgeFast: true,
      difficulty: "Easy",
      rating: 4.8,
    },
  ];
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

        {/* OFFERS */}
        <div className="rounded-xl border overflow-hidden">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="flex justify-between p-4 border-b"
            >
              <div className="flex items-center gap-2">
                {offer.title}

                {offer.badgeHigh && <Crown size={14} />}
                {offer.badgeFast && <Zap size={14} />}
                {offer.badgeTrending && <TrendingUp size={14} />}
                {offer.badgeNew && <Star size={14} />}
              </div>

              <div className="font-bold text-green-500">
                ${offer.payout.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </OpeningStyle>
  );
}
