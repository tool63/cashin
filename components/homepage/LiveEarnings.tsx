"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface Earning {
  id: number;
  name: string;
  flag: string;
  amount: string;
  joinedAt: number;
}

const users = [
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

function randomAmount() {
  return `$${(Math.random() * 10 + 1).toFixed(2)}`;
}

function generateEarning(id: number): Earning {
  const user = users[Math.floor(Math.random() * users.length)];
  return {
    id,
    name: user.name,
    flag: user.flag,
    amount: randomAmount(),
    joinedAt: Date.now() - Math.floor(Math.random() * 60000),
  };
}

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  const mins = Math.floor(diff / 60);
  return `${mins}m ago`;
};

export default function LiveEarnings() {
  const [earnings, setEarnings] = useState<Earning[]>([]);

  useEffect(() => {
    setEarnings(Array.from({ length: 100 }, (_, i) => generateEarning(i + 1)));
  }, []);

  useEffect(() => {
    let isMounted = true;
    const addNewEarning = () => {
      if (!isMounted) return;
      setEarnings((prev) => [generateEarning(Date.now()), ...prev.slice(0, 99)]);
      const nextInterval = Math.floor(Math.random() * 50000) + 1000;
      setTimeout(addNewEarning, nextInterval);
    };
    addNewEarning();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setEarnings((prev) => [...prev]), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-[#0b0f19] overflow-hidden flex justify-center">
      <div className="w-full max-w-4xl text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-lg">
            <Sparkles className="text-emerald-400 w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Live Earnings
          </h2>
        </div>

        <p className="text-gray-400 mb-6">Real users earning rewards right now</p>

        <div className="relative h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <ul className="space-y-4 p-6">
            {earnings.map((e) => (
              <li
                key={e.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl border border-white/10
                  bg-white/5 text-white text-sm md:text-base transition-all duration-300
                  hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <span className="font-semibold truncate">{e.name}</span>
                <span className="text-center text-xl">{e.flag}</span>
                <span className="text-center font-bold text-emerald-400 tracking-wide">{e.amount}</span>
                <span className="text-center text-gray-400 text-xs md:text-sm">{formatTime(e.joinedAt)}</span>
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0b0f19] to-transparent" />
        </div>
      </div>
    </section>
  );
}
