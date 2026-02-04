"use client"

import { useState } from "react"
import LiveEngine from "./engine/LiveEngine"
import { countries, names, baseItem } from "./engine/liveUtils"

export default function LiveJoining() {
  const [items, setItems] = useState(
    Array.from({ length: 80 }, () => {
      const c = countries[Math.floor(Math.random() * countries.length)]
      return {
        username: names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 99),
        country: c.name,
        flag: c.flag,
        ...baseItem(),
      }
    })
  )

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-2xl font-bold text-center text-white mb-6">
        Live Joining
      </h3>

      <LiveEngine
        items={items}
        setItems={setItems}
        renderRow={(u: any) => (
          <div className="flex justify-between items-center text-white">
            <span className="username font-semibold">{u.username}</span>
            <span className="flex gap-2 items-center">
              {u.flag}
              <span className="hidden md:inline">{u.country}</span>
            </span>
            <span className="text-gray-300">{u.time}</span>
          </div>
        )}
      />
    </section>
  )
}
