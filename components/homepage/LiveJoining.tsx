"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

import OpeningStyle from "@/components/animations/openingstyle";

/* ===================== TYPES ===================== */

interface LiveUser {
  username: string;
  flag: string;
  country: string;
  joinedAt: number;
}

/* ===================== DATA ===================== */

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

const names = [
  "Alex","Mia","John","Sara","Leo","Emma","Chris","Liam","Olivia","Noah",
  "Lucas","Sophia","Ethan","Isabella","Ava","William","Amelia","Oliver","Isla","Harry"
];

/* ===================== HELPERS ===================== */

function randomName() {
  return names[Math.floor(Math.random() * names.length)] +
    Math.floor(Math.random() * 100);
}

function generateUsers(): LiveUser[] {
  return Array.from({ length: 200 }, () => {
    const c = countries[Math.floor(Math.random() * countries.length)];
    return {
      username: randomName(),
      flag: c.flag,
      country: c.name,
      joinedAt: Date.now() - Math.floor(Math.random() * 60000),
    };
  });
}

/* 👉 LOCALIZED TIME (IMPORTANT) */
function formatTime(timestamp: number, locale: string) {
  const diff = Math.floor((Date.now() - timestamp) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diff < 60) return rtf.format(-diff, "second");
  if (diff < 3600) return rtf.format(-Math.floor(diff / 60), "minute");
  return rtf.format(-Math.floor(diff / 3600), "hour");
}

/* ===================== COMPONENT ===================== */

export default function LiveJoining() {
  const t = useTranslations("liveJoining");

  const [users, setUsers] = useState<LiveUser[]>(generateUsers());
  const [isLive, setIsLive] = useState(true);

  const locale = t("locale") || "en";

  /* LIVE UPDATE */
  useEffect(() => {
    if (!isLive) return;

    let isMounted = true;

    const addNewUser = () => {
      if (!isMounted) return;

      setUsers((prev) => {
        const next = [...prev];
        const moved = next.pop();

        if (moved) {
          moved.joinedAt = Date.now();
          next.unshift(moved);
        }

        return next;
      });

      const nextInterval = Math.floor(Math.random() * 50000) + 1000;
      setTimeout(addNewUser, nextInterval);
    };

    addNewUser();

    return () => {
      isMounted = false;
    };
  }, [isLive]);

  /* TIMER UPDATE */
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          {/* HEADER */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-400/20 border border-blue-400">
              <Users className="text-blue-500 w-7 h-7" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                {t("title")}
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("description")}
          </p>

          {/* TOGGLE */}
          <div className="flex justify-center mb-8">
            <label className="flex items-center cursor-pointer gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("live_label")}
              </span>

              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  isLive ? "bg-blue-400" : "bg-gray-400"
                }`}
                onClick={() => setIsLive(!isLive)}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ${
                    isLive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          {/* USERS LIST */}
          <div className="relative rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-lg overflow-hidden">

            <div className="h-[500px] overflow-y-auto">
              <ul className="space-y-4 p-6">
                {users.map((user, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-3 items-center px-5 py-3 rounded-xl bg-white/80 dark:bg-[#111827]/80 border border-gray-200 dark:border-white/10 text-sm font-medium hover:shadow-lg transition"
                  >
                    <span className="truncate font-semibold">
                      {user.username}
                    </span>

                    <span className="text-xl text-center">
                      {user.flag}
                    </span>

                    <span className="text-gray-500 text-center">
                      {formatTime(user.joinedAt, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FADE */}
            <div className="pointer-events-none absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-100 dark:from-[#0b0f19] to-transparent" />
          </div>

          {/* STATS */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">

            <div className="flex items-center gap-2">
              <span className="text-blue-500">●</span>
              {t("stats.active", { count: users.length })}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-blue-500">●</span>
              {t("stats.countries")}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-blue-500">●</span>
              {t("stats.realtime")}
            </div>

          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
