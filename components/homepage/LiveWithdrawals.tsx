"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Wallet } from "lucide-react";
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

const names = [
  "Alex","John","Emma","Olivia","Liam","Noah","Ava","Sophia",
  "William","James","Isabella","Mason","Lucas","Mia","Amelia",
  "Benjamin","Elijah","Charlotte","Harper","Daniel","Henry"
];

/* ================= TYPES ================= */

interface Withdrawal {
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
const randomName = () => randomFrom(names);

const randomAmount = () => {
  const value = Math.random() * 45 + 5;
  return `$${value.toFixed(2)}`;
};

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  return diff < 60 ? `${diff}s ago` : `${Math.floor(diff / 60)}m ago`;
};

const generateWithdrawal = (id: number): Withdrawal => ({
  id,
  name: randomName(),
  flag: randomCountry().flag,
  amount: randomAmount(),
  createdAt: Date.now() - Math.floor(Math.random() * 60000),
});

/* ================= COMPONENT ================= */

export default function LiveWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(() =>
    Array.from({ length: 50 }, (_, i) => generateWithdrawal(i + 1))
  );

  const [isLive, setIsLive] = useState(true);

  /* Add new withdrawal */
  const addWithdrawal = useCallback(() => {
    setWithdrawals((prev) => {
      const newItem = generateWithdrawal(Date.now());
      return [newItem, ...prev.slice(0, 49)];
    });
  }, []);

  /* Live updates */
  useEffect(() => {
    if (!isLive) return;

    let timeout: NodeJS.Timeout;

    const loop = () => {
      addWithdrawal();
      timeout = setTimeout(loop, Math.random() * 45000 + 2000);
    };

    loop();

    return () => clearTimeout(timeout);
  }, [isLive, addWithdrawal]);

  /* Force time refresh */
  useEffect(() => {
    const interval = setInterval(() => {
      setWithdrawals((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* Memoized total (performance optimization) */
  const totalAmount = useMemo(() => {
    return withdrawals.reduce(
      (sum, w) => sum + parseFloat(w.amount.replace("$", "")),
      0
    ).toFixed(0);
  }, [withdrawals]);

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-400/20 border border-amber-400">
              <Wallet className="text-amber-500 w-7 h-7" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                Live Withdrawals
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Watch users withdraw their earnings in real-time from around the world
          </p>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsLive((prev) => !prev)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                isLive ? "bg-amber-400" : "bg-gray-400"
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
              <ul className="space-y-4 p-6">
                {withdrawals.map((w) => (
                  <li
                    key={w.id}
                    className="grid grid-cols-4 items-center px-5 py-3 rounded-xl
                      bg-white/80 dark:bg-[#111827]/80
                      border border-gray-200 dark:border-white/10
                      text-sm md:text-base font-medium
                      hover:border-amber-500/40 transition"
                  >
                    <span className="truncate">{w.name}</span>
                    <span className="text-xl text-center">{w.flag}</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold text-center">
                      {w.amount}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      {formatTime(w.createdAt)}
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
            <span>● {withdrawals.length}+ Withdrawals</span>
            <span>● 24+ Countries</span>
            <span>● Total: ${totalAmount}+</span>
          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
