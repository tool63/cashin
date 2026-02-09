"use client";

import { useState } from "react";
import Link from "next/link";

type Offer = {
  id: number;
  title: string;
  category: string;
  amount: string;      // payout
  flag: string;
  completion: string;  // completion in $
  href: string;
};

// 20 offers per category
const offersData: Offer[] = [
  // === Surveys ===
  { id: 1, title: "Survey A", category: "Surveys", amount: "$5", flag: "🇺🇸", completion: "$50", href: "/surveys/a" },
  { id: 2, title: "Survey B", category: "Surveys", amount: "$4", flag: "🇬🇧", completion: "$40", href: "/surveys/b" },
  { id: 3, title: "Survey C", category: "Surveys", amount: "$6", flag: "🇨🇦", completion: "$60", href: "/surveys/c" },
  { id: 4, title: "Survey D", category: "Surveys", amount: "$5", flag: "🇦🇺", completion: "$55", href: "/surveys/d" },
  { id: 5, title: "Survey E", category: "Surveys", amount: "$7", flag: "🇮🇳", completion: "$70", href: "/surveys/e" },
  { id: 6, title: "Survey F", category: "Surveys", amount: "$8", flag: "🇺🇸", completion: "$80", href: "/surveys/f" },
  { id: 7, title: "Survey G", category: "Surveys", amount: "$4", flag: "🇬🇧", completion: "$45", href: "/surveys/g" },
  { id: 8, title: "Survey H", category: "Surveys", amount: "$5", flag: "🇨🇦", completion: "$50", href: "/surveys/h" },
  { id: 9, title: "Survey I", category: "Surveys", amount: "$6", flag: "🇦🇺", completion: "$65", href: "/surveys/i" },
  { id: 10, title: "Survey J", category: "Surveys", amount: "$7", flag: "🇮🇳", completion: "$75", href: "/surveys/j" },
  { id: 11, title: "Survey K", category: "Surveys", amount: "$5", flag: "🇺🇸", completion: "$55", href: "/surveys/k" },
  { id: 12, title: "Survey L", category: "Surveys", amount: "$6", flag: "🇬🇧", completion: "$60", href: "/surveys/l" },
  { id: 13, title: "Survey M", category: "Surveys", amount: "$4", flag: "🇨🇦", completion: "$42", href: "/surveys/m" },
  { id: 14, title: "Survey N", category: "Surveys", amount: "$7", flag: "🇦🇺", completion: "$70", href: "/surveys/n" },
  { id: 15, title: "Survey O", category: "Surveys", amount: "$5", flag: "🇮🇳", completion: "$50", href: "/surveys/o" },
  { id: 16, title: "Survey P", category: "Surveys", amount: "$6", flag: "🇺🇸", completion: "$65", href: "/surveys/p" },
  { id: 17, title: "Survey Q", category: "Surveys", amount: "$4", flag: "🇬🇧", completion: "$45", href: "/surveys/q" },
  { id: 18, title: "Survey R", category: "Surveys", amount: "$7", flag: "🇨🇦", completion: "$70", href: "/surveys/r" },
  { id: 19, title: "Survey S", category: "Surveys", amount: "$5", flag: "🇦🇺", completion: "$55", href: "/surveys/s" },
  { id: 20, title: "Survey T", category: "Surveys", amount: "$6", flag: "🇮🇳", completion: "$60", href: "/surveys/t" },

  // === Play Games ===
  { id: 21, title: "Game A", category: "Play Games", amount: "$5", flag: "🇺🇸", completion: "$50", href: "/play-games/a" },
  { id: 22, title: "Game B", category: "Play Games", amount: "$4", flag: "🇬🇧", completion: "$40", href: "/play-games/b" },
  { id: 23, title: "Game C", category: "Play Games", amount: "$6", flag: "🇨🇦", completion: "$60", href: "/play-games/c" },
  { id: 24, title: "Game D", category: "Play Games", amount: "$5", flag: "🇦🇺", completion: "$55", href: "/play-games/d" },
  { id: 25, title: "Game E", category: "Play Games", amount: "$7", flag: "🇮🇳", completion: "$70", href: "/play-games/e" },
  { id: 26, title: "Game F", category: "Play Games", amount: "$8", flag: "🇺🇸", completion: "$80", href: "/play-games/f" },
  { id: 27, title: "Game G", category: "Play Games", amount: "$4", flag: "🇬🇧", completion: "$45", href: "/play-games/g" },
  { id: 28, title: "Game H", category: "Play Games", amount: "$5", flag: "🇨🇦", completion: "$50", href: "/play-games/h" },
  { id: 29, title: "Game I", category: "Play Games", amount: "$6", flag: "🇦🇺", completion: "$65", href: "/play-games/i" },
  { id: 30, title: "Game J", category: "Play Games", amount: "$7", flag: "🇮🇳", completion: "$75", href: "/play-games/j" },
  { id: 31, title: "Game K", category: "Play Games", amount: "$5", flag: "🇺🇸", completion: "$55", href: "/play-games/k" },
  { id: 32, title: "Game L", category: "Play Games", amount: "$6", flag: "🇬🇧", completion: "$60", href: "/play-games/l" },
  { id: 33, title: "Game M", category: "Play Games", amount: "$4", flag: "🇨🇦", completion: "$42", href: "/play-games/m" },
  { id: 34, title: "Game N", category: "Play Games", amount: "$7", flag: "🇦🇺", completion: "$70", href: "/play-games/n" },
  { id: 35, title: "Game O", category: "Play Games", amount: "$5", flag: "🇮🇳", completion: "$50", href: "/play-games/o" },
  { id: 36, title: "Game P", category: "Play Games", amount: "$6", flag: "🇺🇸", completion: "$65", href: "/play-games/p" },
  { id: 37, title: "Game Q", category: "Play Games", amount: "$4", flag: "🇬🇧", completion: "$45", href: "/play-games/q" },
  { id: 38, title: "Game R", category: "Play Games", amount: "$7", flag: "🇨🇦", completion: "$70", href: "/play-games/r" },
  { id: 39, title: "Game S", category: "Play Games", amount: "$5", flag: "🇦🇺", completion: "$55", href: "/play-games/s" },
  { id: 40, title: "Game T", category: "Play Games", amount: "$6", flag: "🇮🇳", completion: "$60", href: "/play-games/t" },

  // You can continue similarly for "Install Apps", "Trial Offers", "Watch Videos"…
];

const categories = ["All", "Surveys", "Play Games", "Install Apps", "Trial Offers", "Watch Videos"];

export default function HighPayingOffers() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredOffers =
    activeCategory === "All"
      ? offersData
      : offersData.filter((offer) => offer.category === activeCategory);

  return (
    <section className="py-16 bg-[#0f111b] text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">High Paying Offers</h2>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black shadow-lg"
                  : "bg-white/10 hover:bg-white/20 text-white"
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
              className="flex flex-col items-center text-center p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all shadow-md"
            >
              <div className="text-2xl mb-2">{offer.flag}</div>
              <h3 className="text-lg font-semibold mb-1">{offer.title}</h3>
              <p className="text-sm text-gray-300 mb-2">Completion: {offer.completion}</p>
              <span className="text-base font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-3 py-1 rounded-full">
                {offer.amount}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
