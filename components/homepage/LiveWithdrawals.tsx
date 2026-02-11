"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Base users
const baseUsers = [
  { name: "Olivia", flag: "🇺🇸" }, { name: "Liam", flag: "🇺🇸" },
  { name: "Emma", flag: "🇺🇸" }, { name: "Noah", flag: "🇺🇸" },
  { name: "Ava", flag: "🇺🇸" }, { name: "William", flag: "🇬🇧" },
  { name: "Amelia", flag: "🇬🇧" }, { name: "Oliver", flag: "🇬🇧" },
  { name: "Isla", flag: "🇬🇧" }, { name: "Harry", flag: "🇬🇧" },
  { name: "Emma", flag: "🇨🇦" }, { name: "Liam", flag: "🇨🇦" },
  { name: "Charlotte", flag: "🇨🇦" }, { name: "Lucas", flag: "🇨🇦" },
  { name: "Mia", flag: "🇨🇦" }, { name: "Sophie", flag: "🇩🇪" },
  { name: "Leon", flag: "🇩🇪" }, { name: "Hannah", flag: "🇫🇷" },
  { name: "Lucas", flag: "🇫🇷" }, { name: "Lina", flag: "🇪🇸" },
  { name: "Mateo", flag: "🇪🇸" }, { name: "Anna", flag: "🇮🇹" },
  { name: "Luca", flag: "🇮🇹" }, { name: "Ella", flag: "🇳🇱" },
  { name: "Finn", flag: "🇳🇱" }, { name: "Emily", flag: "🇸🇪" },
  { name: "Oscar", flag: "🇸🇪" }, { name: "Isabelle", flag: "🇫🇮" },
  { name: "Elias", flag: "🇫🇮" }, { name: "Maya", flag: "🇳🇴" },
  { name: "Liam", flag: "🇳🇴" },
];

// Generate 500 users
const users500 = Array.from({ length: 500 }, (_, i) => {
  const base = baseUsers[Math.floor(Math.random() * baseUsers.length)];
  return {
    name: `${base.name}${i + 1}`,
    flag: base.flag,
  };
});

interface Withdrawal {
  id: number;
  name: string;
  flag: string;
  amount: string;
  withdrawnAt: number;
}

// Generate a single withdrawal
function generateWithdrawal(id: number): Withdrawal {
  const user = users500[Math.floor(Math.random() * users500.length)];
  return {
    id: id + Math.floor(Math.random() * 1000), // unique id
    name: user.name,
    flag: user.flag,
    amount: `$${(Math.random() * 50 + 5).toFixed(2)}`,
    withdrawnAt: Date.now() - Math.floor(Math.random() * 60000),
  };
}

// Format timestamp
const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  const mins = Math.floor(diff / 60);
  return `${mins}m ago`;
};

// Per-item timer component
const TimeAgo: React.FC<{ timestamp: number }> = ({ timestamp }) => {
  const [time, setTime] = useState(formatTime(timestamp));

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(timestamp)), 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-gray-500 dark:text-gray-400 text-center">{time}</span>;
};

export default function LiveWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(() =>
    Array.from({ length: 100 }, (_, i) => generateWithdrawal(i))
  );
  const [isLive, setIsLive] = useState(true);

  // Live updates
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const addNewWithdrawal = () => {
      setWithdrawals((prev) => [generateWithdrawal(Date.now()), ...prev.slice(0, 99)]);
      if (isLive) {
        const nextInterval = Math.floor(Math.random() * 50000) + 1000;
        timeoutId = setTimeout(addNewWithdrawal, nextInterval);
      }
    };

    if (isLive) addNewWithdrawal();

    return () => clearTimeout(timeoutId);
  }, [isLive]);

  return (
    <section className="relative py-20 overflow-hidden flex justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0b0f19] dark:to-[#0b0f19]">
      <div className="w-full max-w-4xl text-center px-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-rose-400/20 border border-rose-400 backdrop-blur-lg">
            <Sparkles className="text-rose-500 w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Live Withdrawals
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center cursor-pointer gap-2">
            <span className="text-gray-900 dark:text-white font-medium">Live Updates</span>
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isLive ? 'bg-rose-400' : 'bg-gray-400'}`}
              onClick={() => setIsLive(!isLive)}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isLive ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </label>
        </div>

        {/* Withdrawals List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul className="space-y-4 p-6">
            <AnimatePresence initial={false}>
              {withdrawals.map((w) => (
                <motion.li
                  key={w.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-4 items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10
                    bg-gradient-to-r from-white/50 to-gray-100 dark:from-white/5 dark:to-transparent
                    text-gray-900 dark:text-white text-sm md:text-base font-medium
                    hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-transform duration-300"
                >
                  <span className="truncate">{w.name}</span>
                  <span className="text-xl text-center">{w.flag}</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold text-center">{w.amount}</span>
                  <TimeAgo timestamp={w.withdrawnAt} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-[#0b0f19] to-transparent rounded-b-3xl" />
        </div>
      </div>
    </section>
  );
}
