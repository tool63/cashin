"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

// Worldwide countries and flags
const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "India", flag: "🇮🇳" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Egypt", flag: "🇪🇬" },
];

// 200+ random first names
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
  "Robert","Nina","Dominic","Sadie","Austin","Paisley","Jordan","Aurora","Cole","Emilia",
  "Ian","Cora","Jason","Bella","Jasper","Naomi","Tyler","Anna","Blake","Adeline",
  "Brandon","Eliza","Gavin","Willow","Evan","Julia","Leo","Serena","Max","Amara",
  "Victor","Samantha","Milo","Avery","Fabian","Mila","Rafael","Lara","Tobias","Kylie",
  "Diego","Elodie","Hugo","Iris","Adrian","Amelie","Vincent","Freya","Julio","Zara",
  "Santiago","Arwen","Felix","Clara","Emmanuel","Livia","Matteo","Bianca","Oscar","Fiona",
  "Lorenzo","Cecilia","Enzo","Valeria","Thiago","Camila","Nicolas","Gabriela","Eduardo","Liliana",
  "Sebastian","Catalina","Antonio","Julieta","Ricardo","Isabella","Hector","Emilia","Ruben","Martina",
  "Jorge","Victoria","Carlos","Sofia","Pedro","Lucia","Diego","Maya","Rafael","Elena",
  "Manuel","Ariana","Miguel","Giulia","Fernando","Alessia","Andres","Claudia","Raul","Mariana",
  "Leonardo","Sara","Gabriel","Emma","Victor","Olivia","Alex","Sophia","Adrian","Isabel",
];

// Random name generator
function randomName() {
  const number = Math.floor(Math.random() * 100);
  return names[Math.floor(Math.random() * names.length)] + number;
}

interface LiveUser {
  username: string;
  flag: string;
  country: string;
  joinedAt: number;
}

// Generate initial 200 users
const generateUsers = (): LiveUser[] =>
  Array.from({ length: 200 }, () => {
    const c = countries[Math.floor(Math.random() * countries.length)];
    return {
      username: randomName(),
      flag: c.flag,
      country: c.name,
      joinedAt: Date.now() - Math.floor(Math.random() * 60000),
    };
  });

// Format time
const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
};

export default function LiveJoining() {
  const [users, setUsers] = useState<LiveUser[]>(generateUsers());
  const [isLive, setIsLive] = useState(true);

  // Live update movement
  useEffect(() => {
    if (!isLive) return;
    let isMounted = true;

    const addNewUser = () => {
      if (!isMounted) return;
      setUsers((prev) => {
        const next = [...prev];
        const moved = next.pop();
        if (moved) moved.joinedAt = Date.now();
        if (moved) next.unshift(moved);
        return next;
      });
      const nextInterval = Math.floor(Math.random() * 50000) + 1000;
      setTimeout(addNewUser, nextInterval);
    };

    addNewUser();
    return () => { isMounted = false; };
  }, [isLive]);

  // Update seconds ago every 1s
  useEffect(() => {
    const interval = setInterval(() => setUsers((prev) => [...prev]), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 flex justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0b0f19] dark:to-[#0b0f19]">
      <div className="w-full max-w-4xl px-4 text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-400/20 border border-emerald-400 backdrop-blur-lg">
            <Users className="text-emerald-500 w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Live Joining
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

        {/* Users List */}
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg">
          <ul className="space-y-4 p-6">
            {users.map((user, idx) => (
              <li
                key={idx}
                className="grid grid-cols-3 items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10
                  bg-gradient-to-r from-white/50 to-gray-100 dark:from-white/5 dark:to-transparent
                  text-gray-900 dark:text-white text-sm md:text-base font-medium
                  hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300"
              >
                <span className="truncate font-semibold">{user.username}</span>
                <span className="text-xl text-center">{user.flag}</span>
                <span className="text-gray-500 dark:text-gray-400 text-center">{formatTime(user.joinedAt)}</span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-[#0b0f19] to-transparent rounded-b-3xl" />
        </div>
      </div>
    </section>
  );
}
