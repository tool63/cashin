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

/* ===================== REALISTIC DATA (3 PER CATEGORY) ===================== */

const categoryOffers: Record<CategoryKey, Offer[]> = {
  surveys: [
    {
      id: 1,
      title: "Quick Market Survey",
      payout: 1.20,
      completions: 12000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.3,
    },
    {
      id: 2,
      title: "Consumer Feedback Survey",
      payout: 1.80,
      completions: 9000,
      country: "US",
      difficulty: "Medium",
      rating: 4.5,
    },
    {
      id: 3,
      title: "Product Research Survey",
      payout: 2.10,
      completions: 7000,
      country: "Global",
      difficulty: "Medium",
      rating: 4.6,
    },
  ],

  app_installs: [
    {
      id: 1,
      title: "Install & Open App",
      payout: 1.50,
      completions: 15000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.2,
    },
    {
      id: 2,
      title: "Install & Register App",
      payout: 2.30,
      completions: 11000,
      country: "UK",
      difficulty: "Medium",
      rating: 4.5,
    },
    {
      id: 3,
      title: "Install & Complete Tutorial",
      payout: 3.00,
      completions: 8000,
      country: "Global",
      difficulty: "Medium",
      rating: 4.6,
    },
  ],

  play_games: [
    {
      id: 1,
      title: "Reach Level 10",
      payout: 2.20,
      completions: 14000,
      country: "Global",
      difficulty: "Medium",
      rating: 4.4,
    },
    {
      id: 2,
      title: "Win 3 Matches",
      payout: 3.10,
      completions: 10000,
      country: "Global",
      difficulty: "Medium",
      rating: 4.5,
    },
    {
      id: 3,
      title: "Complete Game Challenge",
      payout: 4.00,
      completions: 6000,
      country: "Global",
      difficulty: "Hard",
      rating: 4.7,
    },
  ],

  watch_videos: [
    {
      id: 1,
      title: "Watch Short Video",
      payout: 0.30,
      completions: 50000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.1,
    },
    {
      id: 2,
      title: "Watch Ad + Confirm",
      payout: 0.60,
      completions: 40000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.2,
    },
    {
      id: 3,
      title: "Watch Full Promo Video",
      payout: 1.00,
      completions: 30000,
      country: "Global",
      difficulty: "Easy",
      rating: 4.4,
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

        {/* LOADING */}
        {loading ? (
          <CardSkeleton cards={5} />
        ) : (
          /* ROW BASED OFFER LIST */
          <div className="rounded-xl border overflow-hidden">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex justify-between items-center px-4 py-4 border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-medium">{offer.title}</span>

                  <span className="text-xs text-gray-500">
                    ({offer.difficulty})
                  </span>
                </div>

                {/* RIGHT */}
                <div className="text-right flex items-center gap-3">
                  <div className="font-bold text-green-500">
                    ${offer.payout.toFixed(2)}
                  </div>

                  <div className="text-xs text-gray-500 hidden sm:block">
                    ⭐ {offer.rating} | {offer.completions} leads
                  </div>

                  {/* BADGES */}
                  {offer.payout > 3 && <Crown size={14} />}
                  {offer.rating && offer.rating > 4.5 && <Star size={14} />}
                  {offer.payout < 1 && <Zap size={14} />}
                  {offer.completions > 40000 && <TrendingUp size={14} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </OpeningStyle>
  );
}
