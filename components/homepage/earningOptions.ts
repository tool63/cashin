// components/homepage/earningOptions.ts

/**
 * Earning option type definition
 */
export interface EarningOption {
  emoji: string;
  title: string;
  href: string;
  /**
   * @deprecated Use href instead - kept for backward compatibility
   */
  slug?: string;
}

/**
 * Static array of earning options with proper href structure
 * Href paths follow the same pattern as footer (without country prefix)
 * Country prefix will be added by the Link component
 */
export const earningOptions: EarningOption[] = [
  { emoji: "🧠", title: "Surveys", href: "/earn/surveys" },
  { emoji: "📱", title: "App Installs", href: "/earn/app-installs" },
  { emoji: "🎮", title: "Playing Games", href: "/earn/play-games" },
  { emoji: "📺", title: "Watching Videos", href: "/earn/watch-videos" },
  { emoji: "⛏️", title: "Mining Rewards", href: "/earn/mining-rewards" },
  { emoji: "✅", title: "Completing Offers", href: "/earn/complete-offers" },
  { emoji: "🧩", title: "Offerwall", href: "/earn/offerwall" },
  { emoji: "📋", title: "Surveywall", href: "/earn/surveywall" },
  { emoji: "🎬", title: "Watching Ads", href: "/earn/watch-ads" },
  { emoji: "🛠️", title: "Micro Tasks", href: "/earn/micro-tasks" },
  { emoji: "🎁", title: "Free Trials", href: "/earn/complete-free-trials" },
  { emoji: "🧪", title: "Testing Products", href: "/earn/test-products" },
  { emoji: "📧", title: "Reading Emails", href: "/earn/read-emails" },
  { emoji: "🌐", title: "Visiting Websites", href: "/earn/visit-websites" },
  { emoji: "⭐", title: "Review Tasks", href: "/earn/review-tasks" },
  { emoji: "🎡", title: "Spinning Wheel", href: "/earn/spinning-wheel" },
  { emoji: "🏆", title: "Loyalty", href: "/earn/loyalty" },
  { emoji: "💳", title: "Vouchers", href: "/earn/vouchers" },
];

// Legacy tuple format for backward compatibility
// @deprecated Use earningOptions array with EarningOption type instead
export const legacyEarningOptions: [string, string, string][] = earningOptions.map(
  (opt): [string, string, string] => [opt.emoji, opt.title, opt.href]
);

/**
 * Get earning options with optional filtering
 */
export const getEarningOptions = (): EarningOption[] => earningOptions;

/**
 * Get earning option by href
 */
export const getEarningOptionByHref = (href: string): EarningOption | undefined => {
  return earningOptions.find(opt => opt.href === href);
};

/**
 * Get earning option by title (case-insensitive)
 */
export const getEarningOptionByTitle = (title: string): EarningOption | undefined => {
  return earningOptions.find(opt => opt.title.toLowerCase() === title.toLowerCase());
};
