"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Wallet } from "lucide-react";
import OpeningStyle from "@/components/animations/openingstyle";

/* ================= TYPES ================= */

interface Props {
  data?: any;
  translations?: any;
  countryName?: string;
}

interface Withdrawal {
  id: number;
  name: string;
  flag: string;
  amount: string;
  createdAt: number;
}

/* ================= DATA ================= */

const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" }, { flag: "🇩🇪" },
  { flag: "🇫🇷" }, { flag: "🇪🇸" }, { flag: "🇮🇹" }, { flag: "🇳🇱" },
];

const names = [
  "Alex","John","Emma","Olivia","Liam","Noah","Ava","Sophia",
  "William","James","Isabella","Mason","Lucas","Mia","Amelia",
];

/* ================= HELPERS ================= */

const randomFrom = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomCountry = () => randomFrom(countries);
const randomName = () => randomFrom(names);

const randomAmount = () => {
  const value = Math.random() * 45 + 5;
  return `$${value.toFixed(2)}`;
};

const formatTime = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  return diff < 60 ? `${diff}s ago` : `${Math.floor(diff / 60)}m ago`;
};

const generateWithdrawal = (id: number): Withdrawal => ({
  id,
  name: randomName(),
  flag: randomCountry().flag,
  amount: randomAmount(),
  createdAt: Date.now() - Math.floor(Math.random() * 60000),
});

/* ================= TEXT HELPERS ================= */

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

/* ================= COMPONENT ================= */

export default function LiveWithdrawals({
  data = {},
  translations = {},
  countryName = "",
}: Props) {

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(() =>
    Array.from({ length: 50 }, (_, i) => generateWithdrawal(i + 1))
  );

  const [isLive, setIsLive] = useState(true);

  /* ================= LIVE UPDATES ================= */

  const addWithdrawal = useCallback(() => {
    setWithdrawals((prev) => {
      const newItem = generateWithdrawal(Date.now());
      return [newItem, ...prev.slice(0, 49)];
    });
  }, []);

  useEffect(() => {
    if (!isLive) return;

    let timeout: ReturnType<typeof setTimeout>;

    const loop = () => {
      addWithdrawal();
      timeout = setTimeout(loop, Math.random() * 45000 + 2000);
    };

    loop();

    return () => clearTimeout(timeout);
  }, [isLive, addWithdrawal]);

  /* FORCE REFRESH TIME */
  useEffect(() => {
    const interval = setInterval(() => {
      setWithdrawals((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* TOTAL */
  const totalAmount = useMemo(() => {
    return withdrawals
      .reduce(
        (sum, w) =>
          sum + parseFloat(w.amount.replace(/[^\d.]/g, "")),
        0
      )
      .toFixed(0);
  }, [withdrawals]);

  /* ================= RENDER ================= */

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          {/* HEADER */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-400/20 border border-amber-400">
              <Wallet className="text-amber-500 w-7 h-7" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              {replaceCountry(
                getText(
                  data?.title,
                  translations?.title,
                  "Live Withdrawals"
                ),
                countryName
              )}
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {replaceCountry(
              getText(
                data?.description,
                translations?.description,
                ""
              ),
              countryName
            )}
          </p>

          {/* TOGGLE */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsLive((prev) => !prev)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                isLive ? "bg-amber-400" : "bg-gray-400"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full transition ${
                  isLive ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>

          {/* LIST */}
          <div className="relative rounded-3xl border overflow-hidden">
            <div className="h-[500px] overflow-y-auto">
              <ul className="space-y-4 p-6">

                {withdrawals.map((w) => (
                  <li
                    key={w.id}
                    className="grid grid-cols-4 p-3 items-center"
                  >
                    <span className="truncate">{w.name}</span>
                    <span className="text-center text-xl">{w.flag}</span>
                    <span className="text-center text-amber-500 font-bold">
                      {w.amount}
                    </span>
                    <span className="text-center text-gray-500">
                      {formatTime(w.createdAt)}
                    </span>
                  </li>
                ))}

              </ul>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">

            <span>
              {getText(
                data?.stats?.withdrawals,
                translations?.stats?.withdrawals,
                "Withdrawals"
              )}: {withdrawals.length}+
            </span>

            <span>
              {getText(
                data?.stats?.countries,
                translations?.stats?.countries,
                "Countries"
              )}: 24+
            </span>

            <span>
              {getText(
                data?.stats?.total,
                translations?.stats?.total,
                "Total Withdrawn"
              )}: ${totalAmount}+
            </span>

          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
