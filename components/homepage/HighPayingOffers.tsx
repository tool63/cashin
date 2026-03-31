"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Zap,
  Clock,
  TrendingUp,
  Award,
  Star,
  Crown,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
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
  timeEstimate?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  rating?: number;
};

type CategoryKey = "Surveys" | "App Installs" | "Play Games" | "Watch Videos";

/* ===================== PROPS ===================== */
interface Props {
  data: any;
}

/* ===================== FAKE DATA ===================== */
const generateOffers = (category: CategoryKey): Offer[] => {
  const baseOffers: Record<CategoryKey, Offer[]> = {
    Surveys: [
      {
        id: 1,
        title: "Complete 5-Min Survey",
        payout: 2.5,
        completions: 12000,
        country: "Global",
        badgeHigh: true,
        badgeFast: true,
        badgeNew: true,
        difficulty: "Easy",
        rating: 4.8,
      },
      {
        id: 2,
        title: "Health Survey Study",
        payout: 3.2,
        completions: 9800,
        country: "Global",
        badgeHigh: true,
        badgeTrending: true,
        difficulty: "Medium",
        rating: 4.7,
      },
      {
        id: 3,
        title: "Finance Survey",
        payout: 4.1,
        completions: 7400,
        country: "Global",
        badgeHigh: true,
        difficulty: "Medium",
        rating: 4.6,
      },
      {
        id: 4,
        title: "Quick Opinion Survey",
        payout: 1.8,
        completions: 15000,
        country: "Global",
        badgeFast: true,
        difficulty: "Easy",
        rating: 4.5,
      },
      {
        id: 5,
        title: "Product Feedback Survey",
        payout: 2.9,
        completions: 11000,
        country: "Global",
        badgeTrending: true,
        difficulty: "Easy",
        rating: 4.7,
      },
    ],

    "App Installs": [
      {
        id: 6,
        title: "Install & Open App",
        payout: 1.5,
        completions: 20000,
        country: "Global",
        badgeFast: true,
        badgeNew: true,
        difficulty: "Easy",
        rating: 4.6,
      },
      {
        id: 7,
        title: "Try Finance App",
        payout: 3.8,
        completions: 9000,
        country: "Global",
        badgeHigh: true,
        badgeTrending: true,
        difficulty: "Medium",
        rating: 4.8,
      },
      {
        id: 8,
        title: "Gaming App Install",
        payout: 2.2,
        completions: 15000,
        country: "Global",
        badgeFast: true,
        difficulty: "Easy",
        rating: 4.5,
      },
      {
        id: 9,
        title: "Shopping App Install",
        payout: 2.9,
        completions: 13000,
        country: "Global",
        badgeTrending: true,
        difficulty: "Easy",
        rating: 4.6,
      },
      {
        id: 10,
        title: "Install & Register",
        payout: 4.5,
        completions: 7000,
        country: "Global",
        badgeHigh: true,
        badgeLimited: true,
        difficulty: "Medium",
        rating: 4.9,
      },
    ],

    "Play Games": [
      {
        id: 11,
        title: "Reach Level 10",
        payout: 3.0,
        completions: 18000,
        country: "Global",
        badgeFast: true,
        difficulty: "Easy",
        rating: 4.7,
      },
      {
        id: 12,
        title: "Complete Tutorial",
        payout: 1.2,
        completions: 22000,
        country: "Global",
        badgeFast: true,
        difficulty: "Easy",
        rating: 4.4,
      },
      {
        id: 13,
        title: "Win First Match",
        payout: 2.8,
        completions: 14000,
        country: "Global",
        badgeTrending: true,
        difficulty: "Medium",
        rating: 4.6,
      },
      {
        id: 14,
        title: "Strategy Game",
        payout: 4.0,
        completions: 8000,
        country: "Global",
        badgeHigh: true,
        difficulty: "Hard",
        rating: 4.8,
      },
      {
        id: 15,
        title: "Daily Rewards",
        payout: 2.0,
        completions: 16000,
        country: "Global",
        badgeNew: true,
        difficulty: "Easy",
        rating: 4.5,
      },
    ],

    "Watch Videos": [
      {
        id: 16,
        title: "Watch 5 Videos",
        payout: 1.0,
        completions: 25000,
        country: "Global",
        badgeFast: true,
        difficulty: "Easy",
        rating: 4.5,
      },
      {
        id: 17,
        title: "Watch Ads Series",
        payout: 1.8,
        completions: 21000,
        country: "Global",
        badgeTrending: true,
        difficulty: "Easy",
        rating: 4.6,
      },
      {
        id: 18,
        title: "Video Engagement",
        payout: 2.5,
        completions: 17000,
        country: "Global",
        badgeHigh: true,
        difficulty: "Easy",
        rating: 4.7,
      },
      {
        id: 19,
        title: "Rate Videos",
        payout: 2.2,
        completions: 19000,
        country: "Global",
        badgeNew: true,
        difficulty: "Easy",
        rating: 4.6,
      },
      {
        id: 20,
        title: "Short Video Task",
        payout: 1.3,
        completions: 24000,
        country: "Global",
        badgeFast: true,
        difficulty: "Easy",
        rating: 4.5,
      },
    ],
  };

  return baseOffers[category];
};

/* ===================== COMPONENT ===================== */
export default function HighPayingOffers({ data }: Props) {
  const [category, setCategory] = useState<CategoryKey>("Surveys");
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
              {data.title}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* CATEGORY */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {data.categories.map((c: CategoryKey) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(c)}
              className={`px-6 py-3 rounded-full font-semibold ${
                category === c
                  ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black"
                  : "bg-gray-100 dark:bg-white/5"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* OFFERS LIST */}
        <div className="rounded-xl border overflow-hidden">
          {offers.map((offer) => (
            <div key={offer.id} className="flex justify-between p-4 border-b">
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
