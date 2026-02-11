"use client";

import { useEffect, useRef, useState } from "react";
import { Banknote } from "lucide-react";

/* ================= DATA ================= */

const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" }, { flag: "🇩🇪" },
  { flag: "🇫🇷" }, { flag: "🇪🇸" }, { flag: "🇮🇹" }, { flag: "🇳🇱" },
  { flag: "🇸🇪" }, { flag: "🇳🇴" }, { flag: "🇫🇮" }, { flag: "🇮🇳" },
  { flag: "🇦🇺" }, { flag: "🇧🇷" }, { flag: "🇯🇵" }, { flag: "🇰🇷" },
  { flag: "🇲🇽" }, { flag: "🇨🇭" }, { flag: "🇦🇷" }, { flag: "🇿🇦" },
  { flag: "🇪🇬" }, { flag: "🇹🇷" }, { flag: "🇸🇬" }, { flag: "🇦🇪" },
  { flag: "🇵🇱" }, { flag: "🇹🇭" }, { flag: "🇮🇩" }, { flag: "🇲🇾" },
  { flag: "🇵🇭" }, { flag: "🇵🇹" }
];

const names = [
  "Olivia","Noah","Emma","Liam","Ava","Sophia","Mason","Isabella",
  "James","Mia","Lucas","Charlotte","Amelia","Benjamin","Ethan","Harper",
  "Alexander","Daniel","Henry","Sebastian","Jackson","Avery","Ella",
  "Scarlett","Aria","Layla","Chloe","Luna","Jack","Levi","Mateo",
  "David","Joseph","John","Wyatt","Matthew","Luke","Asher","Carter",
  "Julian","Grayson","Leo","Jayden","Gabriel","Isaac","Lincoln",
  "Anthony","Hudson","Dylan","Ezra","Thomas","Charles","Christopher",
  "Jaxon","Maverick","Josiah","Isaiah","Andrew","Elias","Joshua"
];

const ROW_HEIGHT = 60;
const FPS = 60;

interface Withdrawal {
  id: number;
  name: string;
  flag: string;
  amount: string;
  secondsAgo: number;
  speed: number;
}

/* ================= HELPERS ================= */

const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)];

const randomName = () =>
  names[Math.floor(Math.random() * names.length)];

const randomAmount = () => {
  const value = Math.random() * 45 + 5;
  return `$${value.toFixed(2)}`;
};

const createWithdrawal = (id: number): Withdrawal => {
  const scrollTime = 1 + Math.random() * 10;

  return {
    id,
    name: randomName(),
    flag: randomCountry().flag,
    amount: randomAmount(),
    secondsAgo: Math.floor(Math.random() * 20) + 1,
    speed: ROW_HEIGHT / (scrollTime * FPS),
  };
};

/* ================= COMPONENT ================= */

export default function LiveWithdrawals() {
  const [items, setItems] = useState<Withdrawal[]>(
    Array.from({ length: 100 }, (_, i) => createWithdrawal(i))
  );

  const [isLive, setIsLive] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  /* ===== Time Ago Update ===== */
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          secondsAgo: item.secondsAgo + 1,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  /* ===== Scroll Animation ===== */
  useEffect(() => {
    if (!isLive) return;
    let raf: number;

    const animate = () => {
      if (!listRef.current) return;

      const rows = Array.from(
        listRef.current.children
      ) as HTMLLIElement[];

      rows.forEach((row, index) => {
        const item = items[index];
        if (!item) return;

        let mb = parseFloat(row.style.marginBottom || "0");
        mb += item.speed;
        row.style.marginBottom = `${mb}px`;
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
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-400/20 border border-emerald-400 backdrop-blur-lg">
            <Banknote className="text-emerald-500 w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Live Withdrawals
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <div
            onClick={() => setIsLive(!isLive)}
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
              isLive ? "bg-emerald-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                isLive ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f172a] backdrop-blur-xl shadow-xl">

          <ul ref={listRef} className="space-y-4 p-6">
            {items.map((w) => (
              <li
                key={w.id}
                className="grid grid-cols-4 items-center px-6 py-4 rounded-2xl
                bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0b1220]
                border border-white/10
                text-gray-200 text-sm md:text-base font-medium
                hover:scale-[1.02] transition-transform duration-300 shadow-lg"
              >
                <span className="truncate text-white font-semibold">
                  {w.name}
                </span>

                <span className="text-2xl text-center">{w.flag}</span>

                <span className="text-emerald-400 font-bold text-center text-lg">
                  {w.amount}
                </span>

                <span className="text-gray-400 text-center text-sm">
                  {w.secondsAgo}s ago
                </span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0b0f19] to-transparent rounded-b-3xl" />
        </div>
      </div>
    </section>
  );
}
