"use client";

import { useEffect, useState, useCallback } from "react";
import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import OpeningStyle from "@/components/animations/openingstyle";

/* ================= DATA ================= */

const countries = [
  { flag: "🇺🇸" }, { flag: "🇬🇧" }, { flag: "🇨🇦" }, { flag: "🇩🇪" },
  { flag: "🇫🇷" }, { flag: "🇪🇸" }, { flag: "🇮🇹" }, { flag: "🇳🇱" },
  { flag: "🇸🇪" }, { flag: "🇳🇴" }, { flag: "🇮🇳" }, { flag: "🇦🇺" }
];

const offerNames = [
  "Crypto Wallet Signup","Spin & Win Casino App","Cash Rewards Survey",
  "Mobile Legends Level 10","VPN App Free Trial","Finance App Registration"
];

/* ================= TYPES ================= */

interface Offer {
  id: number;
  name: string;
  flag: string;
  amount: string;
  createdAt: number;
}

/* ================= HELPERS ================= */

const randomFrom = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomCountry = () => randomFrom(countries);
const randomOffer = () => randomFrom(offerNames);

const randomAmount = () => {
  const value = Math.random() * 2;
  return `$${value.toFixed(2)}`;
};

/* 👉 localized time */
function formatTime(timestamp: number, locale: string) {
  const diff = Math.floor((Date.now() - timestamp) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diff < 60) return rtf.format(-diff, "second");
  if (diff < 3600) return rtf.format(-Math.floor(diff / 60), "minute");
  return rtf.format(-Math.floor(diff / 3600), "hour");
}

/* ================= COMPONENT ================= */

export default function LiveOfferCompletion() {
  const t = useTranslations("liveOffers");

  const locale = t("locale") || "en";

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

  /* Add offer */
  const addOffer = useCallback(() => {
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
  }, []);

  /* Live updates */
  useEffect(() => {
    if (!isLive) return;

    let timeout: ReturnType<typeof setTimeout>;

    const loop = () => {
      addOffer();
      timeout = setTimeout(loop, Math.random() * 40000 + 2000);
    };

    loop();

    return () => clearTimeout(timeout);
  }, [isLive, addOffer]);

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-purple-400/20 border border-purple-400">
              <BadgeCheck className="text-purple-500 w-7 h-7" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {t("title")}
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t("description")}
          </p>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsLive((p) => !p)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                isLive ? "bg-purple-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full transition ${
                  isLive ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* List */}
          <div className="relative rounded-3xl border bg-gray-100 dark:bg-white/5 overflow-hidden">
            <div className="h-[500px] overflow-y-auto">
              <ul className="p-6 space-y-3">
                {offers.map((o) => (
                  <li
                    key={o.id}
                    className="grid grid-cols-4 items-center p-3 rounded-xl bg-white/80 dark:bg-[#111827]/80"
                  >
                    <span className="truncate">{o.name}</span>
                    <span className="text-xl text-center">{o.flag}</span>
                    <span className="text-purple-500 font-bold text-center">
                      {o.amount}
                    </span>
                    <span className="text-gray-500 text-center">
                      {formatTime(o.createdAt, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span>● {t("stats.completed", { count: offers.length })}</span>
            <span>● {t("stats.countries")}</span>
            <span>● {t("stats.realtime")}</span>
          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
