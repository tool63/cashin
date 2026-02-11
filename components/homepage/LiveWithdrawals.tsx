"use client";

import { useEffect, useRef, useState } from "react";
import { DollarSign } from "lucide-react";

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

const names = [
  "Alex","Mia","John","Sara","Leo","Emma","Chris","Liam","Olivia","Noah",
  "Lucas","Sophia","Ethan","Isabella","Ava","William","Amelia","Oliver","Isla","Harry",
  "Charlotte","James","Emily","Benjamin","Ella","Daniel","Grace","Jacob","Chloe","Michael",
  "Sofia","Alexander","Lily","Matthew","Zoe","Ryan","Hannah","Nathan","Ruby","Samuel",
  "Mason","Scarlett","Henry","Aria","Sebastian","Layla","Gabriel","Aurora","Jack","Victoria",
  "Wyatt","Nora","Caleb","Luna","Isaac","Maya","Owen","Alice","Dylan","Clara",
  "Luke","Anna","Anthony","Eva","Jonathan","Leah","Christian","Ivy","Aaron","Camila",
  "Thomas","Elena","Charles","Stella","Eli","Hazel","Connor","Violet","Isaiah","Lydia",
  "Adam","Penelope","Julian","Riley","Hunter","Ellie","Aaron","Lillian","Carter","Madeline",
];

/* ================= HELPERS ================= */

const randomCountry = () => countries[Math.floor(Math.random() * countries.length)];
const randomName = () => names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);

const randomAmount = () => {
  const low = Math.random() < 0.8;
  const value = low ? Math.random() * 49 + 1 : Math.random() * 50 + 50;
  return `$${value.toFixed(2)}`;
};

const randomTime = () => `${Math.floor(Math.random() * 10) + 1}s ago`;

interface LiveWithdrawal {
  id: number;
  name: string;
  flag: string;
  amount: string;
  time: string;
  speed: number;
  gradientOffset: number;
}

const ROW_HEIGHT = 48;
const FPS = 60;

const createWithdrawal = (id: number): LiveWithdrawal => {
  const c = randomCountry();
  const scrollTime = 1 + Math.random() * 11;
  return {
    id,
    name: randomName(),
    flag: c.flag,
    amount: randomAmount(),
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  };
};

/* ================= COMPONENT ================= */

export default function LiveWithdrawals() {
  const [items, setItems] = useState<LiveWithdrawal[]>(
    Array.from({ length: 100 }, (_, i) => createWithdrawal(i))
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
            if (moved) next.unshift(createWithdrawal(moved.id));
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
            <DollarSign className="text-emerald-500 w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            💵 Live Withdrawals
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

        {/* Withdrawal List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul ref={listRef} className="space-y-4 p-6">
            {items.map((o) => (
              <li
                key={o.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10
                  bg-white/5 dark:bg-white/5 text-gray-900 dark:text-white text-sm md:text-base font-medium
                  hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300"
              >
                <span className="font-semibold truncate">{o.name}</span>
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
