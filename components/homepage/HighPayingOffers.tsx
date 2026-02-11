"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Zap } from "lucide-react";
import { useTheme } from "next-themes";

/* ===================== TYPES ===================== */
type Offer = {
  id: number;
  title: string;
  payout: number;
  completions: number;
  country: "US" | "CA" | "UK" | "AU" | "DE" | "FR" | "IN";
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
const OFFERS: Record<CategoryKey, Offer[]> = {
  Surveys: [
    { id: 1, title: "Daily Opinion Survey", payout: 3.5, completions: 5200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 2, title: "Market Research Survey", payout: 4.0, completions: 4800, country: "UK", badgeHigh: true, badgeFast: false },
    { id: 3, title: "Product Feedback Survey", payout: 4.5, completions: 5300, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 4, title: "Customer Satisfaction Survey", payout: 5.0, completions: 5000, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 5, title: "Gaming Experience Survey", payout: 3.5, completions: 4700, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 6, title: "App Review Survey", payout: 4.0, completions: 4900, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 7, title: "Lifestyle Survey Challenge", payout: 3.0, completions: 4500, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 8, title: "Tech Product Survey", payout: 5.0, completions: 5200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 9, title: "Health & Fitness Survey", payout: 4.0, completions: 4700, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 10, title: "Movie Feedback Survey", payout: 3.5, completions: 4500, country: "CA", badgeHigh: true, badgeFast: false },
    { id: 11, title: "Music Preference Survey", payout: 4.5, completions: 5300, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 12, title: "Travel Experience Survey", payout: 5.0, completions: 5000, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 13, title: "Food & Beverage Survey", payout: 3.5, completions: 4600, country: "FR", badgeHigh: false, badgeFast: true },
    { id: 14, title: "Education Feedback Survey", payout: 4.0, completions: 4900, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 15, title: "Fashion Trend Survey", payout: 3.0, completions: 4400, country: "US", badgeHigh: false, badgeFast: true },
    { id: 16, title: "Mobile App Feedback Survey", payout: 5.0, completions: 5100, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 17, title: "Gaming App Survey", payout: 4.5, completions: 5200, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 18, title: "Home Product Survey", payout: 3.5, completions: 4700, country: "AU", badgeHigh: false, badgeFast: true },
    { id: 19, title: "Streaming Service Survey", payout: 4.0, completions: 4900, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 20, title: "Social Media Survey", payout: 5.0, completions: 5200, country: "FR", badgeHigh: true, badgeFast: true },
  ],

  "App Installs": [
    { id: 21, title: "Candy Crush Saga Install", payout: 5.0, completions: 7200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 22, title: "TikTok App Install Reward", payout: 6.0, completions: 6800, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 23, title: "Snapchat Daily Install", payout: 5.0, completions: 7100, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 24, title: "Among Us VIP Challenge", payout: 5.0, completions: 6500, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 25, title: "Clash Royale Tournament Reward", payout: 6.0, completions: 6700, country: "DE", badgeHigh: true, badgeFast: false },
    { id: 26, title: "Fortnite Daily Challenge", payout: 5.0, completions: 6900, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 27, title: "Call of Duty Mobile Quest", payout: 5.5, completions: 6800, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 28, title: "Pokemon Go Adventure Quest", payout: 4.5, completions: 6400, country: "US", badgeHigh: false, badgeFast: true },
    { id: 29, title: "Subway Surfers Daily Reward", payout: 5.0, completions: 7000, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 30, title: "8 Ball Pool Tournament", payout: 5.5, completions: 6600, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 31, title: "Gardenscapes Daily Spin", payout: 4.5, completions: 6700, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 32, title: "Homescapes Quest Reward", payout: 5.0, completions: 6800, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 33, title: "Candy Crush Friends Challenge", payout: 5.0, completions: 6500, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 34, title: "Temple Run Adventure", payout: 4.5, completions: 6300, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 35, title: "Angry Birds Classic Challenge", payout: 5.0, completions: 6400, country: "US", badgeHigh: true, badgeFast: true },
    { id: 36, title: "Farm Heroes Saga Reward", payout: 5.5, completions: 6700, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 37, title: "Roblox Game Quest Reward", payout: 6.0, completions: 6200, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 38, title: "Coin Master Spin Reward", payout: 5.0, completions: 6500, country: "AU", badgeHigh: false, badgeFast: true },
    { id: 39, title: "Garena Free Fire Challenge", payout: 5.5, completions: 6600, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 40, title: "Mobile Legends Battle Reward", payout: 6.0, completions: 5600, country: "FR", badgeHigh: true, badgeFast: true },
  ],

  "Watch Videos": [
    { id: 41, title: "YouTube Sponsored Ad Watch", payout: 2.5, completions: 7000, country: "US", badgeHigh: false, badgeFast: true },
    { id: 42, title: "Netflix Trailer Watch", payout: 3.0, completions: 6500, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 43, title: "Amazon Prime Video Clip Watch", payout: 2.8, completions: 7200, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 44, title: "Disney+ Promo Video Watch", payout: 3.0, completions: 6800, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 45, title: "Spotify Ad Watch", payout: 2.5, completions: 6400, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 46, title: "TikTok Sponsored Clip Watch", payout: 2.8, completions: 7000, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 47, title: "Instagram Reel Watch", payout: 3.0, completions: 7200, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 48, title: "Snapchat Ad Watch", payout: 2.5, completions: 6500, country: "US", badgeHigh: false, badgeFast: true },
    { id: 49, title: "Facebook Video Ad Watch", payout: 2.8, completions: 6700, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 50, title: "Hulu Sponsored Clip Watch", payout: 3.0, completions: 7100, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 51, title: "Crunchyroll Anime Clip Watch", payout: 2.5, completions: 6300, country: "AU", badgeHigh: false, badgeFast: true },
    { id: 52, title: "Twitch Ad Watch", payout: 2.8, completions: 7000, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 53, title: "Vimeo Promo Video Watch", payout: 3.0, completions: 6800, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 54, title: "LinkedIn Sponsored Video Watch", payout: 2.5, completions: 6500, country: "IN", badgeHigh: false, badgeFast: true },
    { id: 55, title: "Reddit Ad Watch", payout: 2.8, completions: 7200, country: "US", badgeHigh: true, badgeFast: true },
    { id: 56, title: "Pinterest Video Clip Watch", payout: 3.0, completions: 7000, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 57, title: "DailyMotion Promo Video Watch", payout: 2.5, completions: 6800, country: "CA", badgeHigh: false, badgeFast: true },
    { id: 58, title: "Snap Ads Watch", payout: 2.8, completions: 7100, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 59, title: "Quibi Video Watch", payout: 3.0, completions: 6500, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 60, title: "IGTV Sponsored Video Watch", payout: 2.5, completions: 7200, country: "FR", badgeHigh: false, badgeFast: true },
  ],

  "Play Games": [
    { id: 61, title: "Coin Master Daily Spin", payout: 5.0, completions: 2500, country: "US", badgeHigh: true, badgeFast: true },
    { id: 62, title: "Clash of Clans Battle Reward", payout: 6.0, completions: 2800, country: "UK", badgeHigh: true, badgeFast: true },
    { id: 63, title: "Subway Surfers High Score Challenge", payout: 5.5, completions: 2700, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 64, title: "Among Us VIP Game Reward", payout: 5.0, completions: 2200, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 65, title: "Fortnite Victory Royale Reward", payout: 6.0, completions: 3000, country: "DE", badgeHigh: true, badgeFast: false },
    { id: 66, title: "Minecraft Build Challenge", payout: 5.5, completions: 2800, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 67, title: "Roblox Daily Quest", payout: 5.0, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 68, title: "PUBG Mobile Tournament", payout: 6.0, completions: 2400, country: "US", badgeHigh: true, badgeFast: true },
    { id: 69, title: "Garena Free Fire Battle Reward", payout: 5.5, completions: 2300, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 70, title: "Mobile Legends Arena Reward", payout: 6.0, completions: 2100, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 71, title: "Call of Duty Challenge Reward", payout: 5.0, completions: 2500, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 72, title: "Angry Birds Level Complete Reward", payout: 4.5, completions: 2000, country: "DE", badgeHigh: false, badgeFast: true },
    { id: 73, title: "Temple Run Daily Run", payout: 5.0, completions: 2700, country: "FR", badgeHigh: true, badgeFast: true },
    { id: 74, title: "Candy Crush Saga Level Reward", payout: 5.5, completions: 2600, country: "IN", badgeHigh: true, badgeFast: true },
    { id: 75, title: "Gardenscapes Puzzle Reward", payout: 4.5, completions: 2400, country: "US", badgeHigh: true, badgeFast: true },
    { id: 76, title: "Homescapes Daily Task Reward", payout: 5.0, completions: 2800, country: "UK", badgeHigh: false, badgeFast: true },
    { id: 77, title: "8 Ball Pool Tournament Reward", payout: 5.5, completions: 2300, country: "CA", badgeHigh: true, badgeFast: true },
    { id: 78, title: "Farm Heroes Saga Daily Spin", payout: 5.0, completions: 2500, country: "AU", badgeHigh: true, badgeFast: true },
    { id: 79, title: "Roblox Game Quest", payout: 6.0, completions: 2200, country: "DE", badgeHigh: true, badgeFast: true },
    { id: 80, title: "Coin Master Spin Challenge", payout: 5.5, completions: 2400, country: "FR", badgeHigh: true, badgeFast: true },
  ],
};

/* ===================== SKELETON ===================== */
function TableSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-4 animate-pulse">
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded" />
    </div>
  );
}

/* ===================== COMPONENT ===================== */
export default function HighPayingOffers() {
  const [category, setCategory] = useState<CategoryKey>("Surveys");
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  const offers = useMemo(() => OFFERS[category], [category]);

  useEffect
