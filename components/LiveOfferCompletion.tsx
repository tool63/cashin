"use client"

import { SectionTitle } from "./SmallComponents"

export default function LiveOfferCompletion() {
  const offers = [
    ["User #4821", "Completed Survey", "+$1.20"],
    ["User #1932", "Installed App", "+$3.50"],
    ["User #7720", "Played Game", "+$5.00"],
  ]

  return (
    <section className="py-14 bg-black/5 dark:bg-white/5">
      <SectionTitle icon="🔥" text="Live Offer Completions" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {offers.map(([user, action, amount], i) => (
          <div
            key={i}
            className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 flex justify-between"
          >
            <div>
              <p className="font-medium">{user}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{action}</p>
            </div>
            <span className="text-emerald-400 font-semibold">{amount}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
