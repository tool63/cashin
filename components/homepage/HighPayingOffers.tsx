"use client";

import { useState } from "react";
import Link from "next/link";

type Offer = {
  id: number;
  name: string;
  category: string;
  country: string;
  payout: string;
  completion: string;
  href: string;
};

const offers: Offer[] = [
  { id: 1, name: "Survey A", category: "Surveys", country: "🇺🇸", payout: "$5.00", completion: "$50", href: "/offers/1" },
  { id: 2, name: "Survey B", category: "Surveys", country: "🇬🇧", payout: "$4.50", completion: "$45", href: "/offers/2" },
  { id: 3, name: "Game A", category: "Play Games", country: "🇨🇦", payout: "$8.00", completion: "$80", href: "/offers/3" },
  { id: 4, name: "App Install A", category: "Install Apps", country: "🇦🇺", payout: "$6.00", completion: "$60", href: "/offers/4" },
  { id: 5, name: "Trial A", category: "Trial Offers", country: "🇺🇸", payout: "$10.00", completion: "$100", href: "/offers/5" },
  { id: 6, name: "Video A", category: "Watch Videos", country: "🇮🇳", payout: "$2.00", completion: "$20", href: "/offers/6" },
  // 👉 you can extend this list freely (table auto-scales)
];

const categories = [
  "Surveys",
  "Play Games",
  "Install Apps",
  "Trial Offers",
  "Watch Videos",
];

export default function HighPayingOffersTable() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredOffers = activeCategory
    ? offers.filter((o) => o.category === activeCategory)
    : offers;

  return (
    <section className="bg-[#0b0f1a] py-16 text-white">
      <div className="max-w-7xl mx-auto px-5">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            High Paying Offers
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Complete offers and earn real rewards instantly
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-yellow-400 to-green-500 text-black shadow-lg"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="relative overflow-x-auto rounded-2xl border border-white/10 bg-[#0f1424] shadow-xl">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-[#12182b] sticky top-0 z-10">
              <tr className="text-gray-300 text-sm uppercase">
                <th className="px-6 py-4">Offer</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Completion</th>
                <th className="px-6 py-4 text-right">Payout</th>
              </tr>
            </thead>

            <tbody>
              {filteredOffers.map((offer) => (
                <tr
                  key={offer.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    <Link
                      href={offer.href}
                      className="hover:underline text-white"
                    >
                      {offer.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {offer.category}
                  </td>
                  <td className="px-6 py-4 text-xl">
                    {offer.country}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {offer.completion}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 to-green-500">
                      {offer.payout}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredOffers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No offers available in this category
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
