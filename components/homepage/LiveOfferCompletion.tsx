"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

/* =============================
   BASE USERS (US, UK, CA, EU)
============================= */

const baseUsers = [
  { name: "Olivia", flag: "🇺🇸" }, { name: "Liam", flag: "🇺🇸" },
  { name: "Emma", flag: "🇺🇸" }, { name: "Noah", flag: "🇺🇸" },
  { name: "Ava", flag: "🇺🇸" }, { name: "William", flag: "🇬🇧" },
  { name: "Amelia", flag: "🇬🇧" }, { name: "Oliver", flag: "🇬🇧" },
  { name: "Isla", flag: "🇬🇧" }, { name: "Harry", flag: "🇬🇧" },
  { name: "Charlotte", flag: "🇨🇦" }, { name: "Lucas", flag: "🇨🇦" },
  { name: "Mia", flag: "🇨🇦" }, { name: "Sophie", flag: "🇩🇪" },
  { name: "Leon", flag: "🇩🇪" }, { name: "Hannah", flag: "🇫🇷" },
  { name: "Mateo", flag: "🇪🇸" }, { name: "Anna", flag: "🇮🇹" },
  { name: "Ella", flag: "🇳🇱" }, { name: "Oscar", flag: "🇸🇪" },
];

/* =============================
   GENERATE 500 USERS
============================= */

const users500 = Array.from({ length: 500 }, (_, i) => {
  const base = baseUsers[Math.floor(Math.random() * baseUsers.length)];
  return {
    name: `${base.name}${i + 1}`,
    flag: base.flag,
  };
});

/* =============================
   TYPES
============================= */

interface Withdrawal {
  id: number;
  name: string;
  flag: string;
  amount: string;
  createdAt: number;
}

/* =============================
   GENERATE WITHDRAWAL
============================= */

function generateWithdrawal(id: number): Withdrawal {
  const user = users500[Math.floor(Math.random() * users500.length)];

  return {
    id,
    name: user.name,
    flag: user.flag,
    amount: `$${(Math.random() * 50 + 5).toFixed(2)}`,
    createdAt: Date.now(),
  };
}

/* =============================
   FORMAT TIME
============================= */

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);

  if (diff < 60) return `${diff}s ago`;
  const mins = Math.floor(diff / 60);
  return `${mins}m ago`;
};

/* =============================
   COMPONENT
============================= */

export default function LiveWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(() =>
    Array.from({ length: 100 }, (_, i) =>
      generateWithdrawal(i + 1)
    )
  );

  const [isLive, setIsLive] = useState(true);

  /* =============================
     LIVE ADD (1s–50s)
  ============================= */

  useEffect(() => {
    if (!isLive) return;

    let active = true;

    const addWithdrawal = () => {
      if (!active) return;

      setWithdrawals((prev) => [
        generateWithdrawal(Date.now()),
        ...prev.slice(0, 99),
      ]);

      const next = Math.floor(Math.random() * 49000) + 1000;
      setTimeout(addWithdrawal, next);
    };

    addWithdrawal();

    return () => {
      active = false;
    };
  }, [isLive]);

  /* =============================
     FORCE TIME UPDATE EVERY 1s
  ============================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setWithdrawals((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden flex justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0b0f19] dark:to-[#0b0f19]">
      <div className="w-full max-w-4xl text-center px-4">

        {/* HEADER */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-400/20 border border-emerald-400 backdrop-blur-lg">
            <Sparkles className="text-emerald-500 w-7 h-7" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Live Withdrawals
          </h2>
        </div>

        {/* TOGGLE */}
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

        {/* LIST */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul className="space-y-4 p-6">
            {withdrawals.map((w) => (
              <li
                key={w.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10
                  bg-gradient-to-r from-white/50 to-gray-100 dark:from-white/5 dark:to-transparent
                  text-gray-900 dark:text-white text-sm md:text-base font-medium
                  hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300"
              >
                <span className="truncate text-center">{w.name}</span>
                <span className="text-xl text-center">{w.flag}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-center">
                  {w.amount}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-center">
                  {formatTime(w.createdAt)}
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
