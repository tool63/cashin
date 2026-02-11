"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface Earning {
  id: number;
  name: string;
  flag: string;
  amount: string;
  time: string;
}

const names = [
  "Rahim","John","Ayesha","Lucas","Maria","Ahmed","Sofia","Daniel","Mina","Alex",
  "Olivia","Liam","Emma","Noah","Ava","Ethan","Isabella","Mason","Mia","James",
  "Arif","Hasan","Nusrat","Karim","Sabbir","Tania","Rafi","Imran","Sadia","Farhan"
];

const flags = ["🇧🇩","🇺🇸","🇮🇳","🇧🇷","🇨🇦","🇦🇪","🇩🇪","🇫🇷","🇬🇧","🇦🇺"];

// Generate random time between 1s – 8m
function generateRandomTime() {
  const useSeconds = Math.random() > 0.5;

  if (useSeconds) {
    const seconds = Math.floor(Math.random() * 60) + 1;
    return `${seconds}s ago`;
  } else {
    const minutes = Math.floor(Math.random() * 8) + 1;
    return `${minutes}m ago`;
  }
}

function generateEarning(id: number): Earning {
  return {
    id,
    name: names[Math.floor(Math.random() * names.length)],
    flag: flags[Math.floor(Math.random() * flags.length)],
    amount: `$${(Math.random() * 10 + 1).toFixed(2)}`,
    time: generateRandomTime()
  };
}

export default function LiveEarnings() {
  const [earnings, setEarnings] = useState<Earning[]>([]);

  // Create 100 initial records
  useEffect(() => {
    const initialData = Array.from({ length: 100 }, (_, i) =>
      generateEarning(i + 1)
    );
    setEarnings(initialData);
  }, []);

  // Add new earning every 3 seconds at top
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => {
        const newItem = generateEarning(Date.now());
        return [newItem, ...prev.slice(0, 99)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-[#0b0f19] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Title - Centered */}
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-12">
          
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-lg">
            <Sparkles className="text-emerald-400 w-7 h-7" />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Live Earnings
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Real users earning rewards right now
            </p>
          </div>

        </div>

        {/* Live Feed Box */}
        <div className="relative h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <ul className="space-y-4 p-6">
            {earnings.map((e) => (
              <li
                key={e.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl
                border border-white/10
                bg-white/5
                text-white
                text-sm md:text-base
                transition-all duration-300
                hover:border-emerald-400/40
                hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <span className="font-semibold truncate">
                  {e.name}
                </span>

                <span className="text-center text-xl">
                  {e.flag}
                </span>

                <span className="text-center font-bold text-emerald-400 tracking-wide">
                  {e.amount}
                </span>

                <span className="text-center text-gray-400 text-xs md:text-sm">
                  {e.time}
                </span>
              </li>
            ))}
          </ul>

          {/* Bottom Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0b0f19] to-transparent" />
        </div>
      </div>
    </section>
  );
}
