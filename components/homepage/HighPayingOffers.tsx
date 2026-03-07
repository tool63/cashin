"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap, Clock, TrendingUp, Award, Star, Gift, Crown } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import Container, { Card, CardGrid } from "@/components/animations/container";
import Loading from "@/components/loading/GlobalLoading";

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

/* ===================== FLAGS ===================== */
const COUNTRY_FLAG: Record<string, string> = {
  US: "🇺🇸",
  CA: "🇨🇦",
  UK: "🇬🇧",
  AU: "🇦🇺",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IN: "🇮🇳",
  BR: "🇧🇷",
  MX: "🇲🇽",
  JP: "🇯🇵",
  KR: "🇰🇷",
  IT: "🇮🇹",
  ES: "🇪🇸",
  NL: "🇳🇱",
  SE: "🇸🇪",
  NO: "🇳🇴",
  DK: "🇩🇰",
  FI: "🇫🇮",
  CH: "🇨🇭",
  BE: "🇧🇪",
  AT: "🇦🇹",
  PT: "🇵🇹",
  IE: "🇮🇪",
  NZ: "🇳🇿",
  ZA: "🇿🇦",
};

/* ===================== OFFERS DATA ===================== */
export const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: [
    { id: 1, title: "Daily Opinion Survey", payout: 4.0, completions: 2500, country: "US", badgeHigh: true, badgeFast: true, badgeTrending: true, timeEstimate: "15 min", difficulty: "Easy", rating: 4.8 },
    { id: 2, title: "Consumer Behavior Study", payout: 6.5, completions: 1200, country: "US", badgeHigh: true, badgeFast: false, badgeNew: true, timeEstimate: "25 min", difficulty: "Medium", rating: 4.5 },
    { id: 3, title: "Product Feedback Panel", payout: 5.0, completions: 3400, country: "UK", badgeHigh: false, badgeFast: true, timeEstimate: "18 min", difficulty: "Easy", rating: 4.6 },
    { id: 4, title: "Financial Habits Survey", payout: 8.0, completions: 890, country: "CA", badgeHigh: true, badgeFast: false, badgeLimited: true, timeEstimate: "30 min", difficulty: "Hard", rating: 4.9 },
    { id: 5, title: "Entertainment Preferences", payout: 3.5, completions: 5600, country: "AU", badgeHigh: false, badgeFast: true, timeEstimate: "12 min", difficulty: "Easy", rating: 4.3 },
    { id: 6, title: "Health & Wellness Study", payout: 7.0, completions: 2100, country: "DE", badgeHigh: true, badgeFast: false, timeEstimate: "22 min", difficulty: "Medium", rating: 4.7 },
    { id: 7, title: "Technology Usage Survey", payout: 5.5, completions: 4300, country: "FR", badgeHigh: false, badgeFast: true, badgeTrending: true, timeEstimate: "16 min", difficulty: "Easy", rating: 4.4 },
    { id: 8, title: "Automotive Market Research", payout: 9.0, completions: 650, country: "JP", badgeHigh: true, badgeFast: false, badgeNew: true, timeEstimate: "35 min", difficulty: "Hard", rating: 4.8 },
    { id: 9, title: "Travel Experience Survey", payout: 4.5, completions: 3800, country: "IT", badgeHigh: false, badgeFast: true, timeEstimate: "14 min", difficulty: "Easy", rating: 4.5 },
    { id: 10, title: "Fashion Brand Perception", payout: 6.0, completions: 1750, country: "ES", badgeHigh: true, badgeFast: false, timeEstimate: "20 min", difficulty: "Medium", rating: 4.6 },
    { id: 11, title: "Streaming Service Feedback", payout: 5.0, completions: 5200, country: "BR", badgeHigh: false, badgeFast: true, badgeTrending: true, timeEstimate: "15 min", difficulty: "Easy", rating: 4.5 },
    { id: 12, title: "Grocery Shopping Habits", payout: 4.0, completions: 6700, country: "MX", badgeHigh: false, badgeFast: true, timeEstimate: "12 min", difficulty: "Easy", rating: 4.3 },
    { id: 13, title: "Mobile App User Experience", payout: 7.5, completions: 1450, country: "KR", badgeHigh: true, badgeFast: false, badgeNew: true, timeEstimate: "25 min", difficulty: "Medium", rating: 4.7 },
    { id: 14, title: "Banking & Finance Survey", payout: 8.5, completions: 980, country: "CH", badgeHigh: true, badgeFast: false, badgeLimited: true, timeEstimate: "28 min", difficulty: "Hard", rating: 4.9 },
    { id: 15, title: "Real Estate Market Study", payout: 7.0, completions: 1120, country: "NL", badgeHigh: true, badgeFast: false, timeEstimate: "22 min", difficulty: "Medium", rating: 4.6 },
    { id: 16, title: "Education & Learning Survey", payout: 5.5, completions: 2900, country: "SE", badgeHigh: false, badgeFast: true, timeEstimate: "18 min", difficulty: "Easy", rating: 4.4 },
    { id: 17, title: "Pet Ownership Study", payout: 4.5, completions: 4300, country: "NO", badgeHigh: false, badgeFast: true, badgeTrending: true, timeEstimate: "14 min", difficulty: "Easy", rating: 4.5 },
    { id: 18, title: "Gaming Habits Survey", payout: 6.5, completions: 5600, country: "DK", badgeHigh: true, badgeFast: false, timeEstimate: "20 min", difficulty: "Medium", rating: 4.6 },
    { id: 19, title: "Sustainability & Environment", payout: 8.0, completions: 820, country: "FI", badgeHigh: true, badgeFast: false, badgeNew: true, timeEstimate: "30 min", difficulty: "Hard", rating: 4.8 },
    { id: 20, title: "Work From Home Study", payout: 5.0, completions: 4800, country: "IE", badgeHigh: false, badgeFast: true, timeEstimate: "16 min", difficulty: "Easy", rating: 4.5 },
  ],
  "App Installs": [
    { id: 21, title: "Candy Crush Saga Install", payout: 5.0, completions: 2800, country: "US", badgeHigh: true, badgeFast: true, badgeTrending: true, timeEstimate: "5 min", difficulty: "Easy", rating: 4.7 },
    { id: 22, title: "TikTok Install & Sign Up", payout: 6.0, completions: 4200, country: "US", badgeHigh: true, badgeFast: true, badgeNew: true, timeEstimate: "8 min", difficulty: "Easy", rating: 4.9 },
    { id: 23, title: "Uber Eats App Install", payout: 4.5, completions: 2100, country: "AU", badgeHigh: false, badgeFast: true, timeEstimate: "6 min", difficulty: "Easy", rating: 4.5 },
    { id: 24, title: "Netflix Mobile App", payout: 7.0, completions: 3500, country: "UK", badgeHigh: true, badgeFast: false, badgeLimited: true, timeEstimate: "10 min", difficulty: "Medium", rating: 4.6 },
    { id: 25, title: "Spotify Music Install", payout: 4.0, completions: 6800, country: "DE", badgeHigh: false, badgeFast: true, timeEstimate: "4 min", difficulty: "Easy", rating: 4.4 },
    { id: 26, title: "Amazon Shopping App", payout: 5.5, completions: 5200, country: "CA", badgeHigh: false, badgeFast: true, badgeTrending: true, timeEstimate: "5 min", difficulty: "Easy", rating: 4.5 },
    { id: 27, title: "PayPal Mobile Install", payout: 6.5, completions: 1900, country: "FR", badgeHigh: true, badgeFast: false, timeEstimate: "12 min", difficulty: "Medium", rating: 4.6 },
    { id: 28, title: "Disney+ Hotstar Install", payout: 8.0, completions: 2300, country: "IN", badgeHigh: true, badgeFast: false, badgeNew: true, timeEstimate: "15 min", difficulty: "Medium", rating: 4.8 },
    { id: 29, title: "WhatsApp Business Install", payout: 3.5, completions: 8900, country: "BR", badgeHigh: false, badgeFast: true, timeEstimate: "3 min", difficulty: "Easy", rating: 4.3 },
    { id: 30, title: "LinkedIn Job Search App", payout: 5.0, completions: 3200, country: "JP", badgeHigh: false, badgeFast: true, timeEstimate: "6 min", difficulty: "Easy", rating: 4.4 },
    { id: 31, title: "Temu Shopping Install", payout: 7.5, completions: 5800, country: "US", badgeHigh: true, badgeFast: true, badgeTrending: true, timeEstimate: "8 min", difficulty: "Easy", rating: 4.9 },
    { id: 32, title: "Shein Fashion App", payout: 6.0, completions: 4100, country: "ES", badgeHigh: true, badgeFast: true, timeEstimate: "7 min", difficulty: "Easy", rating: 4.7 },
    { id: 33, title: "Duolingo Language Learning", payout: 4.5, completions: 5300, country: "MX", badgeHigh: false, badgeFast: true, badgeNew: true, timeEstimate: "6 min", difficulty: "Easy", rating: 4.5 },
    { id: 34, title: "Robinhood Invest App", payout: 9.0, completions: 1200, country: "US", badgeHigh: true, badgeFast: false, badgeLimited: true, timeEstimate: "20 min", difficulty: "Hard", rating: 4.8 },
    { id: 35, title: "Coinbase Crypto Wallet", payout: 8.5, completions: 2100, country: "KR", badgeHigh: true, badgeFast: false, timeEstimate: "18 min", difficulty: "Medium", rating: 4.7 },
    { id: 36, title: "Uber Driver App", payout: 7.0, completions: 1650, country: "IT", badgeHigh: true, badgeFast: false, timeEstimate: "12 min", difficulty: "Medium", rating: 4.5 },
    { id: 37, title: "Airbnb Host App", payout: 6.5, completions: 1400, country: "NL", badgeHigh: true, badgeFast: false, badgeTrending: true, timeEstimate: "10 min", difficulty: "Medium", rating: 4.6 },
    { id: 38, title: "DoorDash Driver Install", payout: 5.5, completions: 2700, country: "CA", badgeHigh: false, badgeFast: true, timeEstimate: "8 min", difficulty: "Easy", rating: 4.4 },
    { id: 39, title: "Pandora Music App", payout: 3.5, completions: 6200, country: "AU", badgeHigh: false, badgeFast: true, timeEstimate: "4 min", difficulty: "Easy", rating: 4.3 },
    { id: 40, title: "Telegram Messenger", payout: 4.0, completions: 7500, country: "CH", badgeHigh: false, badgeFast: true, timeEstimate: "3 min", difficulty: "Easy", rating: 4.4 },
  ],
  "Play Games": [
    { id: 41, title: "Coin Master Daily Spin", payout: 5.0, completions: 2500, country: "US", badgeHigh: true, badgeFast: true, badgeTrending: true, timeEstimate: "20 min", difficulty: "Easy", rating: 4.6 },
    { id: 42, title: "FarmVille 3 Level 10", payout: 7.0, completions: 1500, country: "DE", badgeHigh: true, badgeFast: false, badgeNew: true, timeEstimate: "45 min", difficulty: "Medium", rating: 4.7 },
    { id: 43, title: "Solitaire Grand Harvest", payout: 4.0, completions: 1900, country: "FR", badgeHigh: false, badgeFast: true, timeEstimate: "15 min", difficulty: "Easy", rating: 4.4 },
    { id: 44, title: "Monopoly Go Level 15", payout: 8.0, completions: 3200, country: "UK", badgeHigh: true, badgeFast: false, badgeLimited: true, timeEstimate: "60 min", difficulty: "Hard", rating: 4.8 },
    { id: 45, title: "Bingo Blitz Level 20", payout: 6.5, completions: 2800, country: "CA", badgeHigh: true, badgeFast: false, timeEstimate: "40 min", difficulty: "Medium", rating: 4.5 },
    { id: 46, title: "Slotomania Casino", payout: 5.5, completions: 4100, country: "AU", badgeHigh: false, badgeFast: true, badgeTrending: true, timeEstimate: "25 min", difficulty: "Easy", rating: 4.4 },
    { id: 47, title: "Wordscapes Level 50", payout: 6.0, completions: 2200, country: "US", badgeHigh: true, badgeFast: false, timeEstimate: "35 min", difficulty: "Medium", rating: 4.6 },
    { id: 48, title: "Yahtzee With Buddies", payout: 4.5, completions: 3400, country: "SE", badgeHigh: false, badgeFast: true, badgeNew: true, timeEstimate: "20 min", difficulty: "Easy", rating: 4.3 },
    { id: 49, title: "June's Journey Level 30", payout: 7.5, completions: 1800, country: "NO", badgeHigh: true, badgeFast: false, timeEstimate: "50 min", difficulty: "Hard", rating: 4.7 },
    { id: 50, title: "Mafia City Level 12", payout: 9.0, completions: 950, country: "JP", badgeHigh: true, badgeFast: false, badgeLimited: true, timeEstimate: "75 min", difficulty: "Hard", rating: 4.9 },
    { id: 51, title: "Raids Shadow Legends", payout: 10.0, completions: 2100, country: "KR", badgeHigh: true, badgeFast: false, badgeTrending: true, timeEstimate: "90 min", difficulty: "Hard", rating: 4.8 },
    { id: 52, title: "Genshin Impact Level 8", payout: 8.5, completions: 1300, country: "CN", badgeHigh: true, badgeFast: false, badgeNew: true, timeEstimate: "60 min", difficulty: "Hard", rating: 4.9 },
    { id: 53, title: "Pokémon GO Special Task", payout: 5.0, completions: 4700, country: "BR", badgeHigh: false, badgeFast: true, timeEstimate: "25 min", difficulty: "Easy", rating: 4.5 },
    { id: 54, title: "Subway Surfers Score 1M", payout: 3.5, completions: 8200, country: "MX", badgeHigh: false, badgeFast: true, timeEstimate: "15 min", difficulty: "Easy", rating: 4.3 },
    { id: 55, title: "Candy Crush Level 150", payout: 6.5, completions: 5600, country: "IT", badgeHigh: true, badgeFast: false, timeEstimate: "40 min", difficulty: "Medium", rating: 4.6 },
    { id: 56, title: "Fishdom Level 25", payout: 5.5, completions: 3100, country: "ES", badgeHigh: false, badgeFast: true, timeEstimate: "30 min", difficulty: "Easy", rating: 4.4 },
    { id: 57, title: "Gardenscapes Level 40", payout: 6.0, completions: 2900, country: "NL", badgeHigh: true, badgeFast: false, timeEstimate: "35 min", difficulty: "Medium", rating: 4.5 },
    { id: 58, title: "Homescapes Level 35", payout: 5.5, completions: 3300, country: "BE", badgeHigh: false, badgeFast: true, timeEstimate: "30 min", difficulty: "Easy", rating: 4.4 },
    { id: 59, title: "Merge Dragons Level 20", payout: 7.0, completions: 1900, country: "CH", badgeHigh: true, badgeFast: false, badgeTrending: true, timeEstimate: "45 min", difficulty: "Medium", rating: 4.7 },
    { id: 60, title: "EverMerge Level 15", payout: 6.5, completions: 1600, country: "AT", badgeHigh: true, badgeFast: false, timeEstimate: "40 min", difficulty: "Medium", rating: 4.5 },
  ],
  "Watch Videos": [
    { id: 61, title: "YouTube Sponsored Ad Watch", payout: 2.5, completions: 7000, country: "US", badgeHigh: false, badgeFast: true, badgeTrending: true, timeEstimate: "2 min", difficulty: "Easy", rating: 4.3 },
    { id: 62, title: "Movie Trailer Watch", payout: 1.5, completions: 8500, country: "IN", badgeHigh: false, badgeFast: true, timeEstimate: "1 min", difficulty: "Easy", rating: 4.2 },
    { id: 63, title: "Music Video Reaction", payout: 2.0, completions: 5600, country: "UK", badgeHigh: false, badgeFast: true, timeEstimate: "3 min", difficulty: "Easy", rating: 4.1 },
    { id: 64, title: "TV Show Episode Preview", payout: 3.0, completions: 4300, country: "CA", badgeHigh: false, badgeFast: true, badgeNew: true, timeEstimate: "5 min", difficulty: "Easy", rating: 4.3 },
    { id: 65, title: "Product Review Video", payout: 4.0, completions: 3800, country: "AU", badgeHigh: false, badgeFast: false, timeEstimate: "8 min", difficulty: "Easy", rating: 4.4 },
    { id: 66, title: "Documentary Short Film", payout: 5.0, completions: 2900, country: "DE", badgeHigh: false, badgeFast: false, timeEstimate: "15 min", difficulty: "Medium", rating: 4.6 },
    { id: 67, title: "Tutorial Series Episode 1", payout: 3.5, completions: 5200, country: "FR", badgeHigh: false, badgeFast: true, timeEstimate: "7 min", difficulty: "Easy", rating: 4.3 },
    { id: 68, title: "Gaming Livestream Clip", payout: 2.5, completions: 6800, country: "JP", badgeHigh: false, badgeFast: true, timeEstimate: "4 min", difficulty: "Easy", rating: 4.2 },
    { id: 69, title: "Celebrity Interview", payout: 4.5, completions: 4100, country: "KR", badgeHigh: false, badgeFast: false, badgeTrending: true, timeEstimate: "12 min", difficulty: "Easy", rating: 4.5 },
    { id: 70, title: "Sports Highlight Reel", payout: 3.0, completions: 5900, country: "BR", badgeHigh: false, badgeFast: true, timeEstimate: "6 min", difficulty: "Easy", rating: 4.3 },
    { id: 71, title: "Cooking Tutorial Video", payout: 4.0, completions: 4700, country: "IT", badgeHigh: false, badgeFast: false, timeEstimate: "10 min", difficulty: "Easy", rating: 4.4 },
    { id: 72, title: "Fitness Workout Guide", payout: 5.5, completions: 3200, country: "ES", badgeHigh: false, badgeFast: false, badgeNew: true, timeEstimate: "18 min", difficulty: "Medium", rating: 4.6 },
    { id: 73, title: "DIY Home Improvement", payout: 4.5, completions: 3500, country: "MX", badgeHigh: false, badgeFast: false, timeEstimate: "14 min", difficulty: "Easy", rating: 4.4 },
    { id: 74, title: "Tech Review: Latest Smartphone", payout: 6.0, completions: 2800, country: "US", badgeHigh: true, badgeFast: false, badgeTrending: true, timeEstimate: "20 min", difficulty: "Medium", rating: 4.7 },
    { id: 75, title: "Car Review & Test Drive", payout: 6.5, completions: 1900, country: "DE", badgeHigh: true, badgeFast: false, timeEstimate: "22 min", difficulty: "Medium", rating: 4.6 },
    { id: 76, title: "Travel Vlog Destination", payout: 4.0, completions: 4300, country: "NL", badgeHigh: false, badgeFast: true, timeEstimate: "12 min", difficulty: "Easy", rating: 4.4 },
    { id: 77, title: "News Briefing Video", payout: 2.0, completions: 9200, country: "SE", badgeHigh: false, badgeFast: true, timeEstimate: "3 min", difficulty: "Easy", rating: 4.1 },
    { id: 78, title: "Educational Science Video", payout: 5.0, completions: 3100, country: "CH", badgeHigh: false, badgeFast: false, badgeNew: true, timeEstimate: "16 min", difficulty: "Easy", rating: 4.5 },
    { id: 79, title: "Comedy Skit Short", payout: 2.5, completions: 7500, country: "IE", badgeHigh: false, badgeFast: true, timeEstimate: "4 min", difficulty: "Easy", rating: 4.2 },
    { id: 80, title: "Animation Short Film", payout: 3.5, completions: 4800, country: "DK", badgeHigh: false, badgeFast: true, timeEstimate: "8 min", difficulty: "Easy", rating: 4.3 },
  ],
};

/* ===================== SKELETON ROW COMPONENT ===================== */
function SkeletonRow() {
  return (
    <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-200 dark:border-white/10 animate-pulse">
      <div className="col-span-2 flex items-center gap-2">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
      <div className="text-center">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
      </div>
      <div className="text-center">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto"></div>
      </div>
      <div className="text-right">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-14 ml-auto"></div>
      </div>
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
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              High Paying Offers
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete these top-paying offers and earn big rewards instantly
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {(["Surveys", "App Installs", "Play Games", "Watch Videos"] as CategoryKey[]).map((c, index) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(c)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                category === c
                  ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black shadow-lg hover:shadow-xl"
                  : "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-blue-500/40 hover:shadow-md"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* OFFERS TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-xl shadow-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden hover:border-blue-500/40 hover:shadow-xl transition-all duration-300"
        >
          <div className="overflow-y-auto max-h-[600px]">
            {/* TABLE HEADER */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 font-semibold sticky top-0 z-10 bg-gradient-to-r from-yellow-400/10 via-green-400/10 to-green-500/10 dark:from-yellow-400/5 dark:via-green-400/5 dark:to-green-500/5 border-b border-gray-200 dark:border-white/10">
              <span className="text-left text-gray-700 dark:text-gray-300 col-span-2">Offer</span>
              <span className="text-center text-gray-700 dark:text-gray-300">Country</span>
              <span className="text-center text-gray-700 dark:text-gray-300">Completions</span>
              <span className="text-right text-gray-700 dark:text-gray-300">Payout</span>
            </div>

            {loading ? (
              // Show skeleton rows when loading
              Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : (
              offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`grid grid-cols-5 gap-4 px-6 py-4 border-b last:border-b-0 border-gray-200 dark:border-white/10 hover:bg-yellow-400/5 dark:hover:bg-yellow-400/5 transition-colors duration-200 ${
                    index % 2 === 0 
                      ? "bg-white/50 dark:bg-[#0B0E1A]/50" 
                      : "bg-transparent"
                  }`}
                >
                  {/* Offer Name + Badges */}
                  <div className="flex items-center gap-2 text-left col-span-2">
                    <span className="text-gray-900 dark:text-white font-medium truncate" title={offer.title}>
                      {offer.title}
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      {offer.badgeHigh && (
                        <span title="High Paying">
                          <Crown className="text-yellow-400" size={16} />
                        </span>
                      )}
                      {offer.badgeFast && (
                        <span title="Fast Completion">
                          <Zap className="text-green-400" size={16} />
                        </span>
                      )}
                      {offer.badgeNew && (
                        <span title="New Offer">
                          <Star className="text-blue-400" size={16} />
                        </span>
                      )}
                      {offer.badgeTrending && (
                        <span title="Trending">
                          <TrendingUp className="text-purple-400" size={16} />
                        </span>
                      )}
                      {offer.badgeLimited && (
                        <span title="Limited Time">
                          <Clock className="text-red-400" size={16} />
                        </span>
                      )}
                      {offer.rating && offer.rating >= 4.7 && (
                        <span title={`Rating: ${offer.rating}/5`}>
                          <Award className="text-orange-400" size={16} />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="text-center text-gray-700 dark:text-gray-300">
                    <span title={offer.country}>
                      {COUNTRY_FLAG[offer.country] || offer.country}
                    </span>
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

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center hover:border-blue-500/40 hover:shadow-xl transition-all duration-300">
            <div className="text-2xl font-bold text-yellow-400">{offers.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Available Offers</div>
          </div>
          <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center hover:border-blue-500/40 hover:shadow-xl transition-all duration-300">
            <div className="text-2xl font-bold text-green-400">
              ${offers.reduce((sum, offer) => sum + offer.payout, 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Potential</div>
          </div>
          <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center hover:border-blue-500/40 hover:shadow-xl transition-all duration-300">
            <div className="text-2xl font-bold text-purple-400">
              {offers.filter(o => o.badgeHigh).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">High Paying</div>
          </div>
          <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center hover:border-blue-500/40 hover:shadow-xl transition-all duration-300">
            <div className="text-2xl font-bold text-blue-400">
              {offers.filter(o => o.badgeNew || o.badgeTrending).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hot Offers</div>
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
