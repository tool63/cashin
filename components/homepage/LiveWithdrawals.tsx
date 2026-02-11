"use client";

import { useEffect, useRef, useState } from "react";

/* ================= DATA ================= */

const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" }, { flag: "🇩🇪" },
  { flag: "🇮🇳" }, { flag: "🇫🇷" }, { flag: "🇪🇸" }, { flag: "🇮🇹" },
  { flag: "🇯🇵" }, { flag: "🇰🇷" }, { flag: "🇦🇺" }, { flag: "🇧🇷" },
  { flag: "🇷🇺" }, { flag: "🇲🇽" }, { flag: "🇸🇪" }, { flag: "🇳🇴" },
  { flag: "🇳🇱" }, { flag: "🇨🇭" }, { flag: "🇦🇷" }, { flag: "🇿🇦" },
  { flag: "🇪🇬" }, { flag: "🇹🇷" }, { flag: "🇸🇬" }, { flag: "🇦🇪" },
];

const names = [
  "Olivia","Liam","Emma","Noah","Ava","William","Amelia","Oliver",
  "Isla","Harry","Mia","Sophia","Lucas","Charlotte","Ella","Leo",
  "Emily","James","Grace","Alexander","Sofia","Benjamin","Lily",
  "Daniel","Chloe","Michael","Ruby","Jacob","Hannah","Ethan","Ava",
  "Nathan","Scarlett","Samuel","Aria","Mason","Aurora","Henry","Layla",
  "Sebastian","Victoria","Gabriel","Nora","Jack","Luna","Caleb","Maya",
  "Isaac","Alice","Owen","Clara","Dylan","Anna","Luke","Eva","Anthony",
  "Ivy","Jonathan","Leah","Christian","Camila","Thomas","Elena","Charles",
  "Stella","Eli","Hazel","Connor","Violet","Isaiah","Lydia","Adam",
  "Penelope","Julian","Riley","Hunter","Ellie","Carter","Madeline",
  "Robert","Nina","Dominic","Sadie","Austin","Paisley","Jordan","Aurora",
  "Cole","Emilia","Ian","Cora","Jason","Bella","Jasper","Naomi","Tyler",
  "Adeline","Brandon","Eliza","Gavin","Willow","Evan","Julia","Leo",
  "Serena","Max","Amara","Victor","Samantha","Milo","Avery","Fabian",
  "Mila","Rafael","Lara","Tobias","Kylie","Diego","Elodie","Hugo",
  "Iris","Adrian","Amelie","Vincent","Freya","Julio","Zara","Santiago",
  "Arwen","Felix","Clara","Emmanuel","Livia","Matteo","Bianca","Oscar",
  "Fiona","Lorenzo","Cecilia","Enzo","Valeria","Thiago","Camila","Nicolas",
  "Gabriela","Eduardo","Liliana","Sebastian","Catalina","Antonio","Julieta",
  "Ricardo","Isabella","Hector","Emilia","Ruben","Martina","Jorge","Victoria",
  "Carlos","Sofia","Pedro","Lucia","Diego","Maya","Rafael","Elena","Manuel",
  "Ariana","Miguel","Giulia","Fernando","Alessia","Andres","Claudia","Raul",
  "Mariana","Leonardo","Sara","Gabriel","Emma","Victor","Olivia","Alex",
  "Sophia","Adrian","Isabel",
];

/* ================= HELPERS ================= */

interface Withdrawal {
  id: number;
  name: string;
  flag: string;
  amount: string;
  joinedAt: number;
  speed: number;
  gradientOffset: number;
}

const ROW_HEIGHT = 48;
const FPS = 60;

const randomCountry = () => countries[Math.floor(Math.random() * countries.length)];
const randomName = () => names[Math.floor(Math.random() * names.length)];
const randomAmount = () => `$${(Math.random() * 50 + 1).toFixed(2)}`;
const randomTime = () => Date.now() - Math.floor(Math.random() * 60000);

const createWithdrawal = (id: number): Withdrawal => {
  const country = randomCountry();
  const scrollTime = 1 + Math.random() * 11;
  return {
    id,
    name: randomName(),
    flag: country.flag,
    amount: randomAmount(),
    joinedAt: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  };
};

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
};

/* ================= COMPONENT ================= */

export default function LiveWithdrawals() {
  const [items, setItems] = useState<Withdrawal[]>(Array.from({ length: 100 }, (_, i) => createWithdrawal(i)));
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
    <section className="relative py-20 overflow-hidden flex justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0b0f19] dark:to-[#0b0f19]">
      <div className="w-full max-w-4xl text-center px-4">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          💸 Live Withdrawals
        </h2>

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

        {/* Withdrawals List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul ref={listRef} className="space-y-4 p-6">
            {items.map((o) => (
              <li
                key={o.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10
                  bg-white/5 dark:bg-white/5 text-gray-900 dark:text-white text-sm md:text-base font-medium
                  hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300"
              >
                <span className="truncate">{o.name}</span>
                <span className="text-xl text-center">{o.flag}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-center">{o.amount}</span>
                <span className="text-gray-500 dark:text-gray-400 text-center">{formatTime(o.joinedAt)}</span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-[#0b0f19] to-transparent rounded-b-3xl" />
        </div>
      </div>
    </section>
  );
}
