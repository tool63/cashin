"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap } from "lucide-react";
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
};

type CategoryKey = "Surveys" | "App Installs" | "Play Games" | "Watch Videos";

/* ===================== FLAGS ===================== */
const COUNTRY_FLAG: Record<string, string> = {
  US: "🇺🇸",
  CA: "🇨🇦",
  UK: "🇬🇧",
  AU: "🇦🇺",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IN: "🇮🇳",
};

/* ===================== OFFERS DATA ===================== */
export const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: [
    { id: 1, title: "Daily Opinion Survey", payout: 4.0, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 5, title: "Market Research Poll", payout: 3.5, completions: 1800, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 6, title: "Product Feedback Survey", payout: 5.5, completions: 3200, country: "CA", badgeHigh: true, badgeFast: false },
  ],
  "App Installs": [
    { id: 2, title: "Candy Crush Saga Install", payout: 5.0, completions: 2800, country: "US", badgeHigh: true, badgeFast: true },
    { id: 7, title: "TikTok Install & Sign Up", payout: 6.0, completions: 4200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 8, title: "Uber Eats App Install", payout: 4.5, completions: 2100, country: "AU", badgeHigh: false, badgeFast: true },
  ],
  "Play Games": [
    { id: 3, title: "Coin Master Daily Spin", payout: 5.0, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 9, title: "FarmVille 3 Level 10", payout: 7.0, completions: 1500, country: "DE", badgeHigh: true, badgeFast: false },
    { id: 10, title: "Solitaire Grand Harvest", payout: 4.0, completions: 1900, country: "FR", badgeHigh: false, badgeFast: true },
  ],
  "Watch Videos": [
    { id: 4, title: "YouTube Sponsored Ad Watch", payout: 2.5, completions: 7000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 11, title: "Movie Trailer Watch", payout: 1.5, completions: 8500, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 12, title: "Music Video Reaction", payout: 2.0, completions: 5600, country: "UK", badgeHigh: false, badgeFast: true },
  ],
};

/* ===================== SKELETON ===================== */
function SkeletonRow() {
  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-4 animate-pulse">
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
    </div>
  );
}

/* ===================== HIGH PAYING OFFERS COMPONENT ===================== */
export default function HighPayingOffers() {
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
      <section className="relative py-20 bg-white dark:bg-[#070A14] transition-colors duration-300 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              High Paying Offers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete these top-paying offers and earn big rewards instantly
            </p>
          </motion.div>

          {/* CATEGORY FILTER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-3 mb-8 flex-wrap"
          >
            {(["Surveys", "App Installs", "Play Games", "Watch Videos"] as CategoryKey[]).map((c, index) => (
              <motion.button
                key={c}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(c)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  category === c
                    ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black shadow-lg hover:shadow-xl"
                    : "bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-yellow-400/50 hover:shadow-md"
                }`}
              >
                {c}
              </motion.button>
            ))}
          </motion.div>

          {/* OFFERS TABLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative border border-white/20 dark:border-white/10 rounded-xl shadow-lg bg-white/90 dark:bg-[#111827]/80 backdrop-blur-sm overflow-hidden"
          >
            <div className="overflow-y-auto max-h-[500px]">
              {/* TABLE HEADER */}
              <div className="grid grid-cols-4 gap-4 px-6 py-4 font-semibold sticky top-0 z-10 bg-gradient-to-r from-yellow-400/10 via-green-400/10 to-green-500/10 dark:from-yellow-400/5 dark:via-green-400/5 dark:to-green-500/5 border-b border-gray-200 dark:border-white/10">
                <span className="text-left text-gray-700 dark:text-gray-300">Offer</span>
                <span className="text-center text-gray-700 dark:text-gray-300">Country</span>
                <span className="text-center text-gray-700 dark:text-gray-300">Completions</span>
                <span className="text-right text-gray-700 dark:text-gray-300">Payout</span>
              </div>

              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : (
                offers.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`grid grid-cols-4 gap-4 px-6 py-4 border-b last:border-b-0 border-gray-200 dark:border-white/10 hover:bg-yellow-400/5 dark:hover:bg-yellow-400/5 transition-colors duration-200 ${
                      index % 2 === 0 
                        ? "bg-white/50 dark:bg-[#0B0E1A]/50" 
                        : "bg-transparent"
                    }`}
                  >
                    {/* Offer Name + Badges */}
                    <div className="flex items-center gap-2 text-left">
                      <span className="text-gray-900 dark:text-white font-medium">{offer.title}</span>
                      <div className="flex gap-1">
                        {offer.badgeHigh && (
                          <Flame className="text-yellow-400" size={16} title="High Paying" />
                        )}
                        {offer.badgeFast && (
                          <Zap className="text-green-400" size={16} title="Fast Completion" />
                        )}
                      </div>
                    </div>

                    {/* Country */}
                    <div className="text-center text-gray-700 dark:text-gray-300">
                      {COUNTRY_FLAG[offer.country] || offer.country}
                    </div>

                    {/* Completions */}
                    <div className="text-center text-gray-700 dark:text-gray-300">
                      {offer.completions.toLocaleString()}
                    </div>

                    {/* Payout */}
                    <div className="text-right font-bold text-green-600 dark:text-green-400">
                      ${offer.payout.toFixed(2)}
                    </div>
                  </motion.div>
                ))
              )}

              {!loading && offers.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No offers available in this category
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </OpeningStyle>
  );
}
