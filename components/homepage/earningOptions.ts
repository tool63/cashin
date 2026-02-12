// components/homepage/earningOptions.ts

/**
 * Static array of earning options: [icon as JSX.Element, title, slug]
 * Fully compatible with TypeScript and Next.js
 */
export const earningOptions: [JSX.Element, string, string][] = [
  [<span>🧠</span>, "Surveys", "/surveys"],
  [<span>📱</span>, "App Installs", "/app-installs"],
  [<span>🎮</span>, "Playing Games", "/play-games"],
  [<span>📺</span>, "Watching Videos", "/watch-videos"],
  [<span>⛏️</span>, "Mining Rewards", "/mining-rewards"],
  [<span>✅</span>, "Completing Offers", "/complete-offers"],
  [<span>🧩</span>, "Offerwall", "/offerwall"],
  [<span>📋</span>, "Surveywall", "/surveywall"],
  [<span>🎬</span>, "Watching Ads", "/watch-ads"],
  [<span>🛠️</span>, "Micro Tasks", "/micro-tasks"],
  [<span>🎁</span>, "Free Trials", "/complete-free-trials"],
  [<span>🧪</span>, "Testing Products", "/test-products"],
  [<span>📧</span>, "Reading Emails", "/read-emails"],
  [<span>🌐</span>, "Visiting Websites", "/visit-websites"],
  [<span>⭐</span>, "Review Tasks", "/review-tasks"],
  [<span>🎡</span>, "Spinning Wheel", "/spinning-wheel"],
  [<span>🏆</span>, "Loyalty", "/loyalty"],
  [<span>💳</span>, "Vouchers", "/vouchers"],
];

/**
 * Optional helper to get earning options dynamically
 */
export const getEarningOptions = () => earningOptions;
