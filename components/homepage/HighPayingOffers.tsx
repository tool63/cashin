"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap, Clock, TrendingUp, Award, Star, Gift, Crown } from "lucide-react";
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
  badgeHigh: boolean;
  badgeFast: boolean;
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

/* ===================== OFFERS (STATIC FOR NOW) ===================== */
import { OFFERS } from "./offers-data"; // 👈 move your huge OFFERS object here (recommended)

/* ===================== COMPONENT ===================== */
export default function HighPayingOffers({ data }: Props) {
  const [category, setCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  const offers = useMemo(() => OFFERS[category], [category]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [category]);

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* SECTION TITLE */}
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

        {/* CATEGORY FILTER */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {data.categories.map((c: string) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(c)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                category === c
                  ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black shadow-lg"
                  : "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* TABLE */}
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">

          {/* HEADER */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 font-semibold bg-yellow-400/10 dark:bg-yellow-400/5 border-b border-gray-200 dark:border-white/10">
            <span className="col-span-2">{data.headers.offer}</span>
            <span className="text-center">{data.headers.country}</span>
            <span className="text-center">{data.headers.completions}</span>
            <span className="text-right">{data.headers.payout}</span>
          </div>

          {/* CONTENT */}
          <div className="overflow-y-auto max-h-[600px]">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse border-b border-gray-200 dark:border-white/10" />
              ))
            ) : offers.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                {data.no_offers}
              </div>
            ) : (
              offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-200 dark:border-white/10 hover:bg-yellow-400/5"
                >

                  {/* TITLE + BADGES */}
                  <div className="col-span-2 flex items-center gap-2 truncate">
                    <span className="truncate">{offer.title}</span>
                    <div className="flex gap-1">
                      {offer.badgeHigh && <Crown size={14} className="text-yellow-400" />}
                      {offer.badgeFast && <Zap size={14} className="text-green-400" />}
                      {offer.badgeNew && <Star size={14} className="text-blue-400" />}
                      {offer.badgeTrending && <TrendingUp size={14} className="text-purple-400" />}
                      {offer.badgeLimited && <Clock size={14} className="text-red-400" />}
                      {offer.rating && offer.rating >= 4.7 && <Award size={14} className="text-orange-400" />}
                    </div>
                  </div>

                  {/* COUNTRY */}
                  <div className="text-center">
                    {offer.country}
                  </div>

                  {/* COMPLETIONS */}
                  <div className="text-center">
                    {offer.completions.toLocaleString()}
                  </div>

                  {/* PAYOUT */}
                  <div className="text-right font-bold text-green-500">
                    ${offer.payout.toFixed(2)}
                  </div>

                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 text-center border rounded-xl">
            <div className="text-2xl font-bold text-yellow-400">{offers.length}</div>
            <div>{data.stats.available}</div>
          </div>

          <div className="p-4 text-center border rounded-xl">
            <div className="text-2xl font-bold text-green-400">
              ${offers.reduce((sum, o) => sum + o.payout, 0).toFixed(0)}
            </div>
            <div>{data.stats.total}</div>
          </div>

          <div className="p-4 text-center border rounded-xl">
            <div className="text-2xl font-bold text-purple-400">
              {offers.filter(o => o.badgeHigh).length}
            </div>
            <div>{data.stats.high}</div>
          </div>

          <div className="p-4 text-center border rounded-xl">
            <div className="text-2xl font-bold text-blue-400">
              {offers.filter(o => o.badgeNew || o.badgeTrending).length}
            </div>
            <div>{data.stats.hot}</div>
          </div>
        </div>

      </section>
    </OpeningStyle>
  );
}
