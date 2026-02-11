"use client";

import { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";

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
    <section className="relative py-20 overflow-hidden flex justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0b0f19] dark:to-[#0b0f19]">
      <div className="w-full max-w-4xl text-center px-4">

        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-400/20 border border-emerald-400 backdrop-blur-lg">
            <BadgeCheck className="text-emerald-500 w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Live Offer Completion
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center cursor-pointer gap-2">
            <span className="text-gray-900 dark:text-white font-medium">
              Live Updates
            </span>
            <div
              onClick={() => setIsLive(!isLive)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isLive ? "bg-emerald-400" : "bg-gray-400"
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

        {/* List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul className="space-y-4 p-6">
            {offers.map((o) => (
              <li
                key={o.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl 
                border border-gray-200 dark:border-white/10
                bg-gradient-to-r from-white/50 to-gray-100 
                dark:from-white/5 dark:to-transparent
                text-gray-900 dark:text-white text-sm md:text-base font-medium
                hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]
                transition-all duration-300"
              >
                <span className="truncate">{o.name}</span>
                <span className="text-xl text-center">{o.flag}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-center">
                  {o.amount}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-center">
                  {formatTime(o.createdAt)}
                </span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-[#0b0f19] to-transparent rounded-b-3xl" />
        </div>
      </div>
    </section>
  );
}
