"use client";

import { useEffect, useRef, useState } from "react";

// Countries and flags
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
];

// Random username generator
function randomName() {
  const names = [
    "Alex","Mia","John","Sara","Leo","Emma","Chris","Liam","Olivia","Noah",
    "Lucas","Sophia","Ethan","Isabella","Ava","William","Amelia","Oliver","Isla","Harry"
  ];
  const number = Math.floor(Math.random() * 100);
  return names[Math.floor(Math.random() * names.length)] + number;
}

// Live User type
interface LiveUser {
  username: string;
  country: string;
  flag: string;
  joinedAt: number; // timestamp in ms
}

// Generate 100 initial users
const generateUsers = (): LiveUser[] =>
  Array.from({ length: 100 }, () => {
    const c = countries[Math.floor(Math.random() * countries.length)];
    return {
      username: randomName(),
      country: c.name,
      flag: c.flag,
      joinedAt: Date.now() - Math.floor(Math.random() * 10000), // random 0–10s ago
    };
  });

// Convert timestamp to "x s ago" format
const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  const mins = Math.floor(diff / 60);
  return `${mins}m ago`;
};

export default function LiveJoining() {
  const [users, setUsers] = useState<LiveUser[]>(generateUsers());
  const listRef = useRef<HTMLUListElement>(null);

  // Scroll animation
  useEffect(() => {
    let animationFrame: number;

    const scrollStep = () => {
      if (!listRef.current) return;

      const listItems = Array.from(listRef.current.children) as HTMLLIElement[];

      // Move last item to top
      const lastItem = listItems[listItems.length - 1];
      if (lastItem) {
        const lastHeight = lastItem.offsetHeight;
        let margin = parseFloat(lastItem.style.marginBottom || "0");
        margin += 0.5; // scroll speed
        lastItem.style.marginBottom = `${margin}px`;

        if (margin >= lastHeight) {
          setUsers((prev) => {
            const next = [...prev];
            const moved = next.pop();
            if (moved) {
              moved.joinedAt = Date.now(); // reset joined time
              next.unshift(moved);
            }
            // Reset margin
            listItems.forEach((li) => (li.style.marginBottom = "0"));
            return next;
          });
        }
      }

      animationFrame = requestAnimationFrame(scrollStep);
    };

    animationFrame = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrame);
  }, [users]);

  // Update "seconds ago" every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) => [...prev]); // trigger re-render to update time
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Section Title */}
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
        Live Joining
      </h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg">
        <ul ref={listRef} className="space-y-2 p-4">
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
