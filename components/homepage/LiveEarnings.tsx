"use client";

import React from "react";

interface Earning {
  id: number;
  name: string;
  flag: string;
  amount: string;
  time: string;
}

const earnings: Earning[] = [
  { id: 1, name: "Rahim", flag: "🇧🇩", amount: "$4.20", time: "2 min ago" },
  { id: 2, name: "John", flag: "🇺🇸", amount: "$8.75", time: "5 min ago" },
  { id: 3, name: "Ayesha", flag: "🇮🇳", amount: "$6.10", time: "8 min ago" },
  { id: 4, name: "Lucas", flag: "🇧🇷", amount: "$3.95", time: "12 min ago" },
];

export default function LiveEarnings() {
  return (
    <section className="relative py-16 bg-[#0b0f19] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          
          <div className="absolute inset-0 animate-scroll">
            <ul className="space-y-4 p-6">
              {earnings.map((e) => (
                <li
                  key={e.id}
                  className="grid grid-cols-4 items-center px-5 py-3 rounded-xl 
                  border border-white/10
                  backdrop-blur-lg
                  bg-white/5
                  text-sm md:text-base
                  text-white
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
          </div>

          {/* Bottom Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0b0f19] to-transparent" />
        </div>
      </div>
    </section>
  );
}
