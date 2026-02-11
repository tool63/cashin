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

// Random username generator
function randomName() {
  const number = Math.floor(Math.random() * 100);
  return names[Math.floor(Math.random() * names.length)] + number;
}

// User type
interface LiveUser {
  username: string;
  flag: string;
  joinedAt: number; // timestamp
}

// Generate initial users
const generateUsers = (count: number): LiveUser[] =>
  Array.from({ length: count }, () => {
    const c = countries[Math.floor(Math.random() * countries.length)];
    return {
      username: randomName(),
      flag: c.flag,
      joinedAt: Date.now() - Math.floor(Math.random() * 10000),
    };
  });

// Format timestamp to "x s/min ago"
const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
};

export default function LiveJoining() {
  const [users, setUsers] = useState<LiveUser[]>(generateUsers(200));

  // Move last user to top at random interval (1s–50s)
  useEffect(() => {
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
  }, []);

  // Update seconds ago every 1s
  useEffect(() => {
    const interval = setInterval(() => setUsers((prev) => [...prev]), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-emerald-400" />
        <h3 className="text-2xl md:text-3xl font-bold text-white">Live Joining</h3>
      </div>

      <div className="overflow-hidden h-[500px] md:h-[600px] rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg">
        <ul className="space-y-2 p-4">
          {users.map((user, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center px-4 py-2 rounded-xl bg-white/5 text-white text-sm md:text-base"
            >
              <span className="font-semibold">{user.username}</span>
              <span className="text-xl">{user.flag}</span>
              <span className="text-gray-300 text-xs md:text-sm">{formatTime(user.joinedAt)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
