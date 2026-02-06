// components/earningOptions.ts

import { useLang } from "../app/providers/LanguageProvider";

/**
 * Generates earning options dynamically based on translations.
 * Each option: [icon, translated title, slug]
 */
export const getEarningOptions = (t: (key: string) => string): [string, string, string][] => [
  ["🧠", t("hero_phrase_surveys") || "Surveys", "/surveys"],
  ["📱", t("hero_phrase_apps") || "App Installs", "/app-installs"],
  ["🎮", t("hero_phrase_games") || "Playing Games", "/play-games"],
  ["📺", t("hero_phrase_videos") || "Watching Videos", "/watch-videos"],
  ["⛏️", t("mining_rewards") || "Mining Rewards", "/mining-rewards"],
  ["✅", t("complete_offers") || "Completing Offers", "/complete-offers"],
  ["🧩", t("offerwall") || "Offerwall", "/offerwall"],
  ["📋", t("surveywall") || "Surveywall", "/surveywall"],
  ["🎬", t("watch_ads") || "Watching Ads", "/watch-ads"],
  ["🛠️", t("micro_tasks") || "Micro Tasks", "/micro-tasks"],
  ["🎁", t("free_trials") || "Free Trials", "/complete-free-trials"],
  ["🧪", t("testing_products") || "Testing Products", "/test-products"],
  ["📧", t("reading_emails") || "Reading Emails", "/read-emails"],
  ["🌐", t("visiting_websites") || "Visiting Websites", "/visit-websites"],
  ["⭐", t("review_tasks") || "Review Tasks", "/review-tasks"],
  ["🎡", t("spinning_wheel") || "Spinning Wheel", "/spinning-wheel"],
  ["🏆", t("loyalty") || "Loyalty", "/loyalty"],
  ["💳", t("vouchers") || "Vouchers", "/vouchers"],
];
