"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import OpeningStyle from "@/components/animations/openingstyle";

/* ===================== TYPES ===================== */

interface Props {
  data?: any;
  translations?: any;
  countryName?: string;
}

interface Earning {
  id: number;
  name: string;
  flag: string;
  amount: string;
  joinedAt: number;
}

/* ===================== BASE DATA ===================== */

const baseUsers = [
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

/* ===================== GENERATORS ===================== */

const users500 = Array.from({ length: 500 }, (_, i) => {
  const base = baseUsers[Math.floor(Math.random() * baseUsers.length)];
  return {
    name: `${base.name}${i + 1}`,
    flag: base.flag,
  };
});

function generateEarning(id: number): Earning {
  const user = users500[Math.floor(Math.random() * users500.length)];
  return {
    id,
    name: user.name,
    flag: user.flag,
    amount: `$${(Math.random() * 10 + 1).toFixed(2)}`,
    joinedAt: Date.now() - Math.floor(Math.random() * 60000),
  };
}

/* ===================== HELPERS ===================== */

function replaceCountry(text?: string, countryName?: string) {
  if (!text) return "";
  return text.replace(/\{country\}/g, countryName || "");
}

function getText(
  dataValue?: string,
  translationValue?: string,
  fallback: string = ""
) {
  return dataValue || translationValue || fallback;
}

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  const mins = Math.floor(diff / 60);
  return `${mins}m ago`;
};

/* ===================== COMPONENT ===================== */

export default function LiveEarnings({
  data = {},
  translations = {},
  countryName = "",
}: Props) {
  const [earnings, setEarnings] = useState<Earning[]>(() =>
    Array.from({ length: 100 }, (_, i) => generateEarning(i + 1))
  );

  const [isLive, setIsLive] = useState(true);

  /* LIVE UPDATES */
  useEffect(() => {
    if (!isLive) return;

    let isMounted = true;

    const addNewEarning = () => {
      if (!isMounted) return;

      setEarnings((prev) => [
        generateEarning(Date.now()),
        ...prev.slice(0, 99),
      ]);

      const nextInterval =
        Math.floor(Math.random() * 50000) + 1000;

      setTimeout(addNewEarning, nextInterval);
    };

    addNewEarning();

    return () => {
      isMounted = false;
    };
  }, [isLive]);

  /* FORCE RE-RENDER TIME */
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* TOTAL */
  const totalEarnings = earnings.reduce((sum, e) => {
    return sum + parseFloat(e.amount.replace("$", ""));
  }, 0);

  /* ===================== RENDER ===================== */

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center">

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-400/20 border border-emerald-400">
              <Sparkles className="text-emerald-500 w-7 h-7" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500">
                {replaceCountry(
                  getText(data.title, translations.title, "Live Earnings"),
                  countryName
                )}
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {replaceCountry(
              getText(
                data.description,
                translations.description,
                ""
              ),
              countryName
            )}
          </p>

          {/* TOGGLE */}
          <div className="flex justify-center mb-8">
            <label className="flex items-center cursor-pointer gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {getText(
                  data.live_label,
                  translations.live_label,
                  "Live"
                )}
              </span>

              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  isLive ? "bg-emerald-400" : "bg-gray-400"
                }`}
                onClick={() => setIsLive(!isLive)}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full ${
                    isLive ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </label>
          </div>

          {/* LIST */}
          <div className="rounded-3xl border overflow-hidden">
            <div className="h-[500px] overflow-y-auto">
              <ul className="space-y-4 p-6">

                {earnings.map((e) => (
                  <li key={e.id} className="grid grid-cols-4 p-3">
                    <span>{e.name}</span>
                    <span className="text-center">{e.flag}</span>
                    <span className="text-center text-green-500 font-bold">
                      {e.amount}
                    </span>
                    <span className="text-center text-gray-500">
                      {formatTime(e.joinedAt)}
                    </span>
                  </li>
                ))}

              </ul>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">

            <div>
              {getText(
                data?.stats?.active,
                translations?.stats?.active,
                "Active Users"
              )}
            </div>

            <div>
              {getText(
                data?.stats?.realtime,
                translations?.stats?.realtime,
                "Real-time Updates"
              )}
            </div>

            <div>
              ${totalEarnings.toFixed(0)}+
              {" "}
              {getText(
                data?.stats?.total,
                translations?.stats?.total,
                "Earned Today"
              )}
            </div>

          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
