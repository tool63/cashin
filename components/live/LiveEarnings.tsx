"use client"

import { useState } from "react"
import LiveEngine from "./engine/LiveEngine"
import { names, baseItem } from "./engine/liveUtils"

export default function LiveEarnings() {
  const [items, setItems] = useState(
    Array.from({ length: 80 }, () => ({
      username: names[Math.floor(Math.random() * names.length)],
      earning: `$${(Math.random() * 2 + 0.1).toFixed(2)}`,
      ...baseItem(),
    }))
  )

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-2xl font-bold text-center text-white mb-6">
        Live Earnings
      </h3>

      <LiveEngine
        items={items}
        setItems={setItems}
        renderRow={(u: any) => (
          <div className="flex justify-between items-center text-white">
            <span className="username font-semibold">{u.username}</span>
            <span className="text-green-300">Earned {u.earning}</span>
            <span className="text-gray-300">{u.time}</span>
          </div>
        )}
      />
    </section>
  )
}
