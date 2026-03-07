"use client";

import { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import OpeningStyle from "@/components/animations/openingstyle";
import Container from "@/components/animations/container";

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

const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)];

const randomOffer = () =>
  offerNames[Math.floor(Math.random() * offerNames.length)];

const randomAmount = () => {
  const low = Math.random() < 0.8;
  const value = low
    ? Math.random() * 0.94 + 0.05
    : Math.random() * 1 + 1;
  return `$${value.toFixed(2)}`;
};

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
};

const generateOffer = (id: number): Offer => {
  const country = randomCountry();
  return {
    id,
    name: randomOffer(),
    flag: country.flag,
    amount: randomAmount(),
    createdAt: Date.now() - Math.floor(Math.random() * 60000),
  };
};

/* ================= COMPONENT ================= */

export default function LiveOfferCompletion() {
  const [offers, setOffers] = useState<Offer[]>(() =>
    Array.from({ length: 100 }, (_, i) => generateOffer(i + 1))
  );

  const [isLive, setIsLive] = useState(true);

  /* Live update */
  useEffect(() => {
    if (!isLive) return;

    let active = true;

    const addNew = () => {
      if (!active) return;

      setOffers((prev) => [
        generateOffer(Date.now()),
        ...prev.slice(0, 99),
      ]);

      const next = Math.floor(Math.random() * 50000) + 1000;
      setTimeout(addNew, next);
    };

    addNew();

    return () => {
      active = false;
    };
  }, [isLive]);

  /* Update time every second */
  useEffect(() => {
    const interval = setInterval(() => {
      setOffers((prev) => [...prev]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
            <label className="flex items-center cursor-pointer gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Live Updates
              </span>
              <div
                onClick={() => setIsLive(!isLive)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  isLive ? "bg-purple-400" : "bg-gray-400"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    isLive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          {/* List Container */}
          <div className="relative rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-lg hover:border-purple-500/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-[500px] overflow-y-auto">
              <ul className="space-y-4 p-6">
                {offers.map((o) => (
                  <li
                    key={o.id}
                    className="grid grid-cols-4 items-center px-5 py-3 rounded-xl
                      bg-white/80 dark:bg-[#111827]/80
                      border border-gray-200 dark:border-white/10
                      text-gray-900 dark:text-white text-sm md:text-base font-medium
                      hover:border-purple-500/40 hover:shadow-lg hover:-translate-y-0.5
                      transition-all duration-300"
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

            {/* Gradient fade at bottom */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-100 dark:from-[#0b0f19] to-transparent rounded-b-3xl" />
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-purple-500">●</span> {offers.length}+ Offers Completed
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">●</span> 24+ Countries
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">●</span> Updated in Real-time
            </div>
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
