"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

/* ================= DATA ================= */

const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" }, { flag: "🇩🇪" },
  { flag: "🇮🇳" }, { flag: "🇫🇷" }, { flag: "🇪🇸" }, { flag: "🇮🇹" },
  { flag: "🇯🇵" }, { flag: "🇰🇷" }, { flag: "🇦🇺" }, { flag: "🇧🇷" },
  { flag: "🇷🇺" }, { flag: "🇲🇽" }, { flag: "🇸🇪" }, { flag: "🇳🇴" },
  { flag: "🇳🇱" }, { flag: "🇨🇭" }, { flag: "🇦🇷" }, { flag: "🇿🇦" },
  { flag: "🇪🇬" }, { flag: "🇹🇷" }, { flag: "🇸🇬" }, { flag: "🇦🇪" },
  { flag: "🇮🇱" }, { flag: "🇹🇭" }, { flag: "🇨🇳" }, { flag: "🇵🇭" },
  { flag: "🇳🇿" }, { flag: "🇵🇰" }, { flag: "🇻🇳" }, { flag: "🇧🇩" },
];

const offerNames = [
  "Crypto Wallet Signup","Spin & Win Casino App","Cash Rewards Survey","Mobile Legends Level 10",
  "VPN App Free Trial","Finance App Registration","Shopping Cashback App","Online Quiz Rewards",
  "Play & Earn Game Offer","Daily Polls Survey","Streaming App Trial","Gift Card Rewards App",
  "App Install Rewards","Bank Signup Bonus","Crypto Mining App","Fantasy Sports Signup",
  "Survey & Earn","Fitness App Challenge","New User Bonus","Video App Trial","Referral Rewards",
  "Quiz Master Challenge","Online Casino Bonus","Shopping App Signup","Health App Rewards",
  "Trivia Game Challenge","Music App Trial","Cashback Shopping","Stock Trading App Bonus","E-learning App",
  "Sign Up Rewards","Game Booster App","Mobile Game Rewards","Photo App Signup","Shopping Challenge",
  "Online Poll Rewards","Puzzle Game Challenge","VPN Premium Trial","Food Delivery Signup Bonus",
  "Streaming Service Rewards","Crypto Exchange Signup","Spin Wheel Rewards","Quiz App Challenge",
  "Play Casino Online","App Daily Bonus","Survey Rewards App","Travel App Signup","Music Streaming Bonus",
  "New User Cashback","Fantasy App Bonus","E-commerce Signup Reward","Download & Earn","Gift Card Survey",
  "Banking App Challenge","Crypto Rewards App","Video Game App Signup","Mobile Quiz Rewards",
  "Sign Up Offer","Gaming Platform Bonus","Crypto App Challenge","Online Learning Bonus","Cash App Trial",
  "Referral Program Bonus","Top Quiz App","Casino Game Signup","Daily Rewards App","Cashback App Signup",
  "Health App Challenge","Finance App Signup","Shopping Rewards","Crypto Wallet Trial","Spin & Win Bonus",
  "Survey App Challenge","E-commerce App Rewards","Game Rewards Signup","Streaming App Bonus",
  "Quiz Challenge App","Play & Earn Casino","Fitness App Signup","Crypto Game Bonus","Online Poll App",
  "Mobile Game Challenge","Bank Signup Rewards","Gift Card App Bonus","Trivia App Rewards","Travel App Bonus",
  "Download App Bonus","Survey & Win","Mobile Rewards Challenge","App Install Bonus","Crypto App Signup",
];

/* ================= HELPERS ================= */

const randomCountry = () => countries[Math.floor(Math.random() * countries.length)];
const randomOfferName = () => offerNames[Math.floor(Math.random() * offerNames.length)];
const randomAmount = () => {
  const low = Math.random() < 0.8;
  const value = low ? Math.random() * 0.94 + 0.05 : Math.random() * 1 + 1;
  return `$${value.toFixed(2)}`;
};
const randomTime = () => `${Math.floor(Math.random() * 10) + 1}s ago`;

interface LiveOffer {
  id: number;
  offerName: string;
  flag: string;
  amount: string;
  time: string;
  speed: number;
  gradientOffset: number;
}

const ROW_HEIGHT = 48;
const FPS = 60;

const createOffer = (id: number): LiveOffer => {
  const c = randomCountry();
  const scrollTime = 1 + Math.random() * 11;
  return {
    id,
    offerName: randomOfferName(),
    flag: c.flag,
    amount: randomAmount(),
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  };
};

/* ================= COMPONENT ================= */

export default function LiveOfferCompletion() {
  const [items, setItems] = useState<LiveOffer[]>(
    Array.from({ length: 100 }, (_, i) => createOffer(i))
  );
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
            hsl(${item.gradientOffset},100%,50%),
            hsl(${(item.gradientOffset + 120) % 360},100%,50%),
            hsl(${(item.gradientOffset + 240) % 360},100%,50%)
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
    <section className="relative py-20 flex justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0b0f19] dark:to-[#0b0f19]">
      <div className="w-full max-w-4xl px-4 text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-400/20 border border-emerald-400 backdrop-blur-lg">
            <CheckCircle className="text-emerald-500 w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            ✅ Live Offer Completion
          </h2>
        </div>

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

        {/* Offer List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul ref={listRef} className="space-y-4 p-6">
            {items.map((o) => (
              <li
                key={o.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10
                  bg-white/5 dark:bg-white/5 text-gray-900 dark:text-white text-sm md:text-base font-medium
                  hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300"
              >
                <span className="font-semibold truncate">{o.offerName}</span>
                <span className="text-center text-xl">{o.flag}</span>
                <span className="text-green-500 font-semibold text-center">{o.amount}</span>
                <span className="text-gray-500 dark:text-gray-400 text-center">{o.time}</span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-[#0b0f19] to-transparent rounded-b-3xl" />
        </div>
      </div>
    </section>
  );
}
