"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Example offers data
const offersData = [
  { id: 1, title: "Survey A", category: "Surveys", amount: "$5", flag: "🇺🇸", href: "/surveys/a" },
  { id: 2, title: "Game B", category: "Play Games", amount: "$3", flag: "🇬🇧", href: "/play-games/b" },
  { id: 3, title: "App Install C", category: "Install Apps", amount: "$4", flag: "🇨🇦", href: "/install-apps/c" },
  { id: 4, title: "Trial Offer D", category: "Trial Offers", amount: "$6", flag: "🇦🇺", href: "/trial-offers/d" },
  { id: 5, title: "Watch Video E", category: "Watch Videos", amount: "$2", flag: "🇮🇳", href: "/watch-videos/e" },
  { id: 6, title: "Survey F", category: "Surveys", amount: "$7", flag: "🇺🇸", href: "/surveys/f" },
  { id: 7, title: "Game G", category: "Play Games", amount: "$5", flag: "🇬🇧", href: "/play-games/g" },
  // Add more offers as needed
];

const categories = [
  "All",
  "Surveys",
  "Play Games",
  "Install Apps",
  "Trial Offers",
  "Watch Videos",
];

export default function HighPayingOffers() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredOffers =
    activeCategory === "All"
      ? offersData
      : offersData.filter((offer) => offer.category === activeCategory);

  return (
    <section className="py-16 bg-gray-100 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-6 text-center">High Paying Offers</h2>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black"
                  : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* OFFERS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => (
            <Link
              key={offer.id}
              href={offer.href}
              className="flex flex-col items-center text-center bg-white dark:bg-[#0f111b] border border-gray-200 dark:border-white/10 rounded-2xl p-4 hover:scale-105 transition shadow"
            >
              <div className="text-xl mb-2">{offer.flag}</div>
              <h3 className="text-lg font-semibold">{offer.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{offer.amount}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
