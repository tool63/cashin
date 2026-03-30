"use client";

import { useEffect, useState, useCallback } from "react";
import { BadgeCheck } from "lucide-react";
import OpeningStyle from "@/components/animations/openingstyle";

/* ================= DATA ================= */

const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" }, { flag: "🇩🇪" },
  { flag: "🇫🇷" }, { flag: "🇪🇸" }, { flag: "🇮🇹" }, { flag: "🇳🇱" },
  { flag: "🇸🇪" }, { flag: "🇳🇴" }, { flag: "🇫🇮" }, { flag: "🇮🇳" },
  { flag: "🇦🇺" }, { flag: "🇧🇷" }, { flag: "🇯🇵" }, { flag: "🇰🇷" },
  { flag: "🇲🇽" }, { flag: "🇨🇭" }, { flag: "🇦🇷" }, { flag: "🇿🇦" },
  { flag: "🇪🇬" }, { flag: "🇹🇷" }, { flag: "🇸🇬" }, { flag: "🇦🇪" }
];

const offerNames = [
  "Crypto Wallet Signup","Spin & Win Casino App","Cash Rewards Survey",
  "Mobile Legends Level 10","VPN App Free Trial","Finance App Registration",
  "Shopping Cashback App","Online Quiz Rewards","Play & Earn Game Offer",
  "Streaming App Trial","Gift Card Rewards App","Bank Signup Bonus",
  "Food Delivery Cashback","Fitness App Signup","Crypto Exchange Signup",
  "NFT Platform Registration","Travel Booking App","Ride Hailing Signup",
  "Daily Login Bonus","Watch Ad & Earn","Refer Friends Bonus"
];

/* ================= TYPES ================= */

interface Offer {
  id: number;
  name: string;
  flag: string;
  amount: string;
  createdAt: number;
}

/* ================= HELPERS ================= */

const randomFrom = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomCountry = () => randomFrom(countries);

const randomOffer = () => randomFrom(offerNames);

const randomAmount = () => {
  const isSmall = Math.random() < 0.8;
  const value = isSmall
    ? Math.random() * 0.94 + 0.05
    : Math.random() * 1 + 1;

  return `$${value.toFixed(2)}`;
};

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  return diff < 60 ? `${diff}s ago` : `${Math.floor(diff / 60)}m ago`;
};

const generateOffer = (id: number): Offer => {
  return {
    id,
    name: randomOffer(),
    flag: randomCountry().flag,
    amount: randomAmount(),
    createdAt: Date.now() - Math.floor(Math.random() * 60000),
  };
};

/* ================= COMPONENT ================= */

export default function LiveOfferCompletion() {
  const [offers, setOffers] = useState<Offer[]>(() =>
    Array.from({ length: 50 }, (_, i) => generateOffer(i + 1))
  );

  const [isLive, setIsLive] = useState(true);

  /* Add new offer */
  const addOffer = useCallback(() => {
    setOffers((prev) => {
      const newOffer = generateOffer(Date.now());
      return [newOffer, ...prev.slice(0, 49)];
    });
  }, []);

  /* Live updates */
  useEffect(() => {
    if (!isLive) return;

    let timeout: NodeJS.Timeout;

    const loop = () => {
      addOffer();
      timeout = setTimeout(loop, Math.random() * 40000 + 2000);
    };

    loop();

    return () => clearTimeout(timeout);
  }, [isLive, addOffer]);

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-purple-400/20 border border-purple-400">
              <BadgeCheck className="text-purple-500 w-7 h-7" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Live Offer Completion
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Watch users complete offers and earn rewards in real-time
          </p>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsLive((prev) => !prev)}
              className={`relative w-14 h-7 flex items-center rounded-full p-1 transition ${
                isLive ? "bg-purple-500" : "bg-gray-400"
              }`}
              aria-label="Toggle live updates"
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
                  isLive ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* List */}
          <div className="relative rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-lg overflow-hidden">
            <div className="h-[500px] overflow-y-auto">
              <ul className="space-y-3 p-6">
                {offers.map((o) => (
                  <li
                    key={o.id}
                    className="grid grid-cols-4 items-center px-4 py-3 rounded-xl
                      bg-white/80 dark:bg-[#111827]/80
                      border border-gray-200 dark:border-white/10
                      text-sm md:text-base font-medium
                      hover:border-purple-500/40 transition"
                  >
                    <span className="truncate">{o.name}</span>
                    <span className="text-xl text-center">{o.flag}</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-center">
                      {o.amount}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      {formatTime(o.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fade */}
            <div className="pointer-events-none absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-100 dark:from-[#0b0f19]" />
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span>● {offers.length}+ Offers Completed</span>
            <span>● 24+ Countries</span>
            <span>● Real-time Updates</span>
          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
