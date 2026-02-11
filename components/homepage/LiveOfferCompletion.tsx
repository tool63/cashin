"use client";

import { useEffect, useRef, useState } from "react";

/* ================= DATA ================= */

// Worldwide flags
const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" }, { flag: "🇩🇪" },
  { flag: "🇫🇷" }, { flag: "🇪🇸" }, { flag: "🇮🇹" }, { flag: "🇳🇱" },
  { flag: "🇸🇪" }, { flag: "🇳🇴" }, { flag: "🇫🇮" }, { flag: "🇮🇳" },
  { flag: "🇦🇺" }, { flag: "🇧🇷" }, { flag: "🇯🇵" }, { flag: "🇰🇷" },
  { flag: "🇲🇽" }, { flag: "🇨🇭" }, { flag: "🇦🇷" }, { flag: "🇿🇦" },
  { flag: "🇪🇬" }, { flag: "🇹🇷" }, { flag: "🇸🇬" }, { flag: "🇦🇪" },
  { flag: "🇵🇱" }, { flag: "🇹🇭" }, { flag: "🇮🇩" }, { flag: "🇲🇾" },
  { flag: "🇵🇭" }, { flag: "🇵🇹" }
];

// 200+ realistic offer names
const offerNames = [
  "Crypto Wallet Signup","Spin & Win Casino App","Cash Rewards Survey","Mobile Legends Level 10",
  "VPN App Free Trial","Finance App Registration","Shopping Cashback App","Online Quiz Rewards",
  "Play & Earn Game Offer","Daily Polls Survey","Streaming App Trial","Gift Card Rewards App",
  "Bank Signup Bonus","Food Delivery Cashback","Video Game Beta Access","Fitness App Signup",
  "E-commerce Discount App","Survey Rewards App","Music Streaming Trial","Language Learning App",
  "Crypto Mining App","Online Course Signup","Streaming Subscription Bonus","Shopping App Points",
  "Gaming App Rewards","Cashback Browser Extension","Photo Editing App","Crypto Exchange Signup",
  "Trading App Demo Account","Wallet App Bonus","NFT Platform Registration","Shopping Points App",
  "Video Streaming Rewards","Fitness Tracker Trial","Product Review Rewards","Quiz Game Rewards",
  "Travel Booking App","Ride Hailing Signup","E-learning Course Bonus","Digital Wallet Bonus",
  "Food Coupon App","Health Tracker Rewards","Music App Premium Trial","Sports App Signup",
  "Crypto Airdrop Claim","Online Auction App","Fashion App Bonus","E-book App Rewards",
  "Streaming App Premium","Mobile Game Coins","Finance Tracker App","Cashback Card App",
  "Social Media Reward App","Survey App Freebies","Online Learning Platform","Crypto Staking App",
  "Game Booster App","Video Platform Signup","Fitness App Points","Banking App Cashback",
  "Shopping Festival Rewards","Streaming App Coupons","Travel App Bonus","Ride Sharing Cashback",
  "Quiz Platform Points","Trading App Signup","Music Platform Rewards","E-commerce Signup Bonus",
  "Crypto Wallet Bonus","Gaming Platform Coins","Cash Rewards App","Online Course Rewards",
  "Fitness Challenge Signup","Video Game Rewards","Banking App Signups","Shopping App Cashback",
  "Streaming Service Points","Survey Reward App","Crypto Exchange Rewards","E-learning App Signup",
  "Fitness App Bonus","Streaming App Signup","Game App Points","Digital Wallet Signup",
  "Shopping App Freebies","Online Game Bonus","Finance App Cashback","Music App Signup",
  "Quiz App Rewards","Crypto Airdrop Signup","Fitness App Free Trial","E-commerce Rewards",
  "Trading Platform Signup","Bank Signup Reward","Video Game Points","Streaming Platform Trial",
  "Cashback App Bonus","Mobile Game Rewards","Online Course Signup","Health App Rewards",
  "NFT Marketplace Signup","Quiz Game Freebies","Travel App Signup","Ride Sharing App Rewards",
  "Gaming App Signup","Streaming App Bonus","Finance Tracker Signup","Crypto Wallet Signup",
  "E-learning Platform Bonus","Fitness App Rewards","Music Streaming Signup","Social Media App Bonus",
  "Digital Wallet Rewards","Online Game Signup","E-commerce App Bonus","Crypto Trading Signup",
  "Video Platform Rewards","Fitness App Signup","Survey App Points","Banking App Bonus",
  "Game Platform Rewards","Shopping App Signup","Streaming Service Bonus","Quiz App Signup",
  "Finance App Rewards","NFT Platform Bonus","Ride Hailing App Signup","Online Learning Bonus",
  "Crypto Staking Signup","Gaming Rewards App","Digital Wallet Signup","Video Game Signup",
  "Streaming App Rewards","E-learning Signup","Fitness App Bonus","Music App Rewards",
  "Shopping App Rewards","Cashback App Signup","Trading App Rewards","Banking App Signup",
  "Online Course Bonus","Crypto Airdrop Rewards","Quiz Platform Signup","Streaming Signup",
  "Fitness Challenge Rewards","Game App Signup","E-commerce Signup","Mobile App Free Trial",
  "Cashback Offers App","Online Contest Signup","Spin the Wheel Rewards","Refer Friends Bonus",
  "Daily Login Bonus","Download Game App","Complete Daily Quiz","Watch Ad & Earn",
  "Sign Up Free Membership","Try Premium App","Claim Mystery Gift","Upload Screenshot Reward",
  "Invite Friends for Bonus","Complete Mini Game","Watch Tutorial Video","Share on Social Media",
  "Activate Promo Code","Join Referral Program","Complete Survey Form","Earn Loyalty Points",
  "Submit Feedback Reward","Claim Coupon Code","Play Trivia Game","Daily Challenge Bonus",
  "Sign Up Newsletter","Install Browser Extension","Test App Feature","Redeem Points for Cash",
  "Online Voting Bonus","Participate in Event","Streaming Event Signup","Download Educational App",
  "Bank Account Registration Bonus","Fitness Challenge Daily","Quiz Competition","Join Webinar Session",
  "E-learning Certification Bonus","Crypto Giveaway Claim","Mobile Gaming Challenge","Cashback Festival Signup",
  "Video Streaming Event","Try Beta Version App","Online Store Signup Bonus","Shop & Earn Rewards",
  "Watch Live Stream Bonus","Gaming Tournament Signup","Crypto Reward Claim","Install Productivity App",
  "Fitness Tracker Challenge","Online Workshop Signup","Play Daily Puzzle","Claim Bonus Points",
  "Social Media Challenge","Cashback App Daily","Video Game Level Completion","Music Event Signup",
  "Survey Rewards Daily","Shopping Festival Signup","Crypto Airdrop Event","E-commerce Discount Claim",
  "Watch Ad for Bonus","Fitness App Challenge","Bank Promotion Signup","Spin Bonus Wheel","Download NFT App",
  "Streaming Subscription Free Trial","Play Online Card Game","Crypto Quiz Rewards","E-learning Course Completion",
  "Refer & Earn Bonus","Daily App Login Rewards","Join Mobile Game Event","Cashback Shopping Event",
  "Complete Game Level","Invite Friends to Platform","Earn Loyalty Rewards","Watch Tutorial Bonus",
  "Sign Up for Newsletter","Try Free Trial App","Upload Proof Screenshot","Play Mini Game Challenge",
  "Claim Cashback Reward","Join Social Media Contest","Activate Trial Offer","Complete Registration Bonus",
  "Earn Points Today","Install Finance App","Play Quiz Game Daily","Streaming App Sign Up Bonus",
  "Fitness Tracker Signup","Crypto Event Participation","Gaming App Leaderboard","Watch Ad Video Bonus",
  "Claim Free Gift Card","Mobile App Reward Points","Refer Friends Challenge","Sign Up Webinar Bonus",
  "Complete Daily Task","Survey Participation Bonus","Play Game App Challenge","Download Free App",
  "Claim Daily Spins","Activate Promo Bonus","Join Online Contest","Social Media App Engagement",
  "E-commerce Reward Points","Streaming Event Rewards","Daily Challenge Game","Earn Bonus Coins",
  "Fitness App Daily Task","Crypto Reward Signup"
];

/* ================= HELPERS ================= */

const ROW_HEIGHT = 48;
const FPS = 60;

interface LiveOffer {
  id: number;
  offerName: string;
  flag: string;
  amount: string;
  time: string;
  speed: number;
  gradientOffset: number;
}

const randomCountry = () => countries[Math.floor(Math.random() * countries.length)];
const randomOffer = () => offerNames[Math.floor(Math.random() * offerNames.length)];
const randomAmount = () => {
  const low = Math.random() < 0.8;
  const value = low ? Math.random() * 0.94 + 0.05 : Math.random() * 1 + 1;
  return `$${value.toFixed(2)}`;
};
const randomTime = () => `${Math.floor(Math.random() * 10) + 1}s ago`;
const createOffer = (id: number): LiveOffer => {
  const c = randomCountry();
  const scrollTime = 1 + Math.random() * 11;
  return {
    id,
    offerName: randomOffer(),
    flag: c.flag,
    amount: randomAmount(),
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  };
};

/* ================= COMPONENT ================= */

export default function LiveOfferCompletion() {
  const [items, setItems] = useState<LiveOffer[]>(Array.from({ length: 100 }, (_, i) => createOffer(i)));
  const [isLive, setIsLive] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isLive) return;
    let raf: number;

    const animate = () => {
      if (!listRef.current) return;
      const rows = Array.from(listRef.current.children) as HTMLLIElement[];

      rows.forEach((row, index) => {
        const item = items[index];
        if (!item) return;

        let mb = parseFloat(row.style.marginBottom || "0");
        mb += item.speed;
        row.style.marginBottom = `${mb}px`;

        item.gradientOffset += 0.6;
        row.style.background = `
          linear-gradient(
            90deg,
            hsl(${item.gradientOffset}, 100%, 20%),
            hsl(${(item.gradientOffset + 120) % 360}, 100%, 25%),
            hsl(${(item.gradientOffset + 240) % 360}, 100%, 20%)
          )
        `;
      });

      const last = rows[rows.length - 1];
      if (last) {
        const height = last.offsetHeight;
        const mb = parseFloat(last.style.marginBottom || "0");
        if (mb >= height) {
          rows.forEach((r) => (r.style.marginBottom = "0"));
          setItems((prev) => {
            const next = [...prev];
            const moved = next.pop();
            if (moved) next.unshift(createOffer(moved.id));
            return next;
          });
        }
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [items, isLive]);

  return (
    <section className="relative py-20 overflow-hidden flex justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0b0f19] dark:to-[#0b0f19]">
      <div className="w-full max-w-4xl text-center px-4">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          ✅ Live Offer Completion
        </h2>

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center cursor-pointer gap-2">
            <span className="text-gray-900 dark:text-white font-medium">Live Updates</span>
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isLive ? 'bg-emerald-400' : 'bg-gray-400'}`}
              onClick={() => setIsLive(!isLive)}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isLive ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </label>
        </div>

        {/* Offers List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul ref={listRef} className="space-y-4 p-6">
            {items.map((o) => (
              <li
                key={o.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10
                  bg-gray-900 dark:bg-[#111827] text-gray-100 text-sm md:text-base font-medium
                  hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300"
              >
                <span className="truncate">{o.offerName}</span>
                <span className="text-xl text-center">{o.flag}</span>
                <span className="text-emerald-500 font-bold text-center">{o.amount}</span>
                <span className="text-gray-400 text-center">{o.time}</span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-[#0b0f19] to-transparent rounded-b-3xl" />
        </div>
      </div>
    </section>
  );
}
