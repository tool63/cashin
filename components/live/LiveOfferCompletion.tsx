"use client"

import { useState } from "react"
import LiveEngine from "./engine/LiveEngine"
import { offers, names, baseItem } from "./engine/liveUtils"

export default function LiveOfferCompletion() {
  const [items, setItems] = useState(
    Array.from({ length: 80 }, () => ({
      username: names[Math.floor(Math.random() * names.length)],
      offer: offers[Math.floor(Math.random() * offers.length)],
      reward: `$${(Math.random() * 3 + 0.5).toFixed(2)}`,
      ...baseItem(),
    }))
  )

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-2xl font-bold text-center text-white mb-6">
        Live Offer Completion
      </h3>

      <LiveEngine
        items={items}
        setItems={setItems}
        renderRow={(u: any) => (
          <div className="flex justify-between items-center text-white">
            <span className="username font-semibold">{u.username}</span>
            <span>Completed {u.offer}</span>
            <span className="text-green-300">{u.reward}</span>
            <span className="text-gray-300">{u.time}</span>
          </div>
        )}
      />
    </section>
  )
}
