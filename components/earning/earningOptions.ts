/**
 * Static array of earning options: [icon, title, slug]
 * Can be used directly on homepage and dynamic pages
 */
export const earningOptions: [string, string, string][] = [
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
 * Optional function to get earning options dynamically
 * (useful if translations are added later)
 */
export const getEarningOptions = () => earningOptions;
