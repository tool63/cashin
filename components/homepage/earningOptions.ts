// components/homepage/earningOptions.ts

/**
 * Type for a single earning option: [icon, title, slug]
 */
export type EarningOption = [icon: string, title: string, slug: string];

/**
 * Static array of earning options
 * Can be used directly on homepage and dynamic pages
 */
export const earningOptions: EarningOption[] = [
  ["🧠", "Surveys", "/surveys"],
  ["📱", "App Installs", "/app-installs"],
  ["🎮", "Playing Games", "/play-games"],
  ["📺", "Watching Videos", "/watch-videos"],
  ["⛏️", "Mining Rewards", "/mining-rewards"],
  ["✅", "Completing Offers", "/complete-offers"],
  ["🧩", "Offerwall", "/offerwall"],
  ["📋", "Surveywall", "/surveywall"],
  ["🎬", "Watching Ads", "/watch-ads"],
  ["🛠️", "Micro Tasks", "/micro-tasks"],
  ["🎁", "Free Trials", "/complete-free-trials"],
  ["🧪", "Testing Products", "/test-products"],
  ["📧", "Reading Emails", "/read-emails"],
  ["🌐", "Visiting Websites", "/visit-websites"],
  ["⭐", "Review Tasks", "/review-tasks"],
  ["🎡", "Spinning Wheel", "/spinning-wheel"],
  ["🏆", "Loyalty", "/loyalty"],
  ["💳", "Vouchers", "/vouchers"],
];

/**
 * Helper function to get earning options dynamically
 * Useful for filtering, translations, or future API integration
 */
export const getEarningOptions = (): EarningOption[] => [...earningOptions];
