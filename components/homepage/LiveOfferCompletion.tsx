"use client";

import { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import OpeningStyle from "@/components/animations/openingstyle";

/* ===================== TYPES ===================== */

interface Props {
  data?: any;
  translations?: any;
  countryName?: string;
}

interface Offer {
  id: number;
  name: string;
  flag: string;
  amount: string;
  createdAt: number;
}

/* ===================== DATA ===================== */

const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" },
  { flag: "🇩🇪" }, { flag: "🇫🇷" }, { flag: "🇪🇸" },
  { flag: "🇮🇹" }, { flag: "🇳🇱" },
];

const offerNames = [
  "Crypto Wallet Signup",
  "Spin & Win Casino App",
  "Cash Rewards Survey",
  "Mobile Legends Level 10",
  "VPN App Free Trial",
  "Finance App Registration",
];

/* ===================== HELPERS ===================== */

const randomFrom = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomCountry = () => randomFrom(countries);
const randomOffer = () => randomFrom(offerNames);

const randomAmount = () => {
  const value = Math.random() * 2;
  return `$${value.toFixed(2)}`;
};

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

export default function LiveOfferCompletion({
  data = {},
  translations = {},
  countryName = "",
}: Props) {

  const [offers, setOffers] = useState<Offer[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: randomOffer(),
      flag: randomCountry().flag,
      amount: randomAmount(),
      createdAt: Date.now() - Math.random() * 60000,
    }))
  );

  const [isLive, setIsLive] = useState(true);

  /* LIVE UPDATES */
  useEffect(() => {
    if (!isLive) return;

    let isMounted = true;

    const addOffer = () => {
      if (!isMounted) return;

      setOffers((prev) => [
        {
          id: Date.now(),
          name: randomOffer(),
          flag: randomCountry().flag,
          amount: randomAmount(),
          createdAt: Date.now(),
        },
        ...prev.slice(0, 49),
      ]);

      const nextInterval =
        Math.floor(Math.random() * 40000) + 2000;

      setTimeout(addOffer, nextInterval);
    };

    addOffer();

    return () => {
      isMounted = false;
    };
  }, [isLive]);

  /* ===================== TOTAL ===================== */

  const totalOffers = offers.length;

  /* ===================== RENDER ===================== */

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          {/* HEADER */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-purple-400/20 border border-purple-400">
              <BadgeCheck className="text-purple-500 w-7 h-7" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {replaceCountry(
                  getText(
                    data.title,
                    translations.title,
                    "Live Offer Completions"
                  ),
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
                  data?.live_label,
                  translations?.live_label,
                  "Live"
                )}
              </span>

              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  isLive ? "bg-purple-500" : "bg-gray-400"
                }`}
                onClick={() => setIsLive(!isLive)}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full transition ${
                    isLive ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </label>
          </div>

          {/* LIST */}
          <div className="relative rounded-3xl border overflow-hidden bg-gray-100 dark:bg-white/5">
            <div className="h-[500px] overflow-y-auto">
              <ul className="p-6 space-y-3">

                {offers.map((o) => (
                  <li
                    key={o.id}
                    className="grid grid-cols-4 items-center p-3 rounded-xl bg-white/80 dark:bg-[#111827]/80"
                  >
                    <span className="truncate">{o.name}</span>
                    <span className="text-center text-xl">{o.flag}</span>
                    <span className="text-center text-purple-500 font-bold">
                      {o.amount}
                    </span>
                    <span className="text-center text-gray-500">
                      {formatTime(o.createdAt)}
                    </span>
                  </li>
                ))}

              </ul>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">

            <span>
              {getText(
                data?.stats?.completed,
                translations?.stats?.completed,
                "Completed"
              )}: {totalOffers}+
            </span>

            <span>
              {getText(
                data?.stats?.countries,
                translations?.stats?.countries,
                "Countries"
              )}: 20+
            </span>

            <span>
              {getText(
                data?.stats?.realtime,
                translations?.stats?.realtime,
                "Real-time"
              )}
            </span>

          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
