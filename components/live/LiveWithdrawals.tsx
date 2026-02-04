"use client"

import { useState } from "react"
import LiveEngine from "./engine/LiveEngine"
import { countries, names, withdrawMethods, baseItem } from "./engine/liveUtils"

export default function LiveWithdrawals() {
  const [items, setItems] = useState(
    Array.from({ length: 80 }, () => {
      const c = countries[Math.floor(Math.random() * countries.length)]
      return {
        username: names[Math.floor(Math.random() * names.length)],
        flag: c.flag,
        method: withdrawMethods[Math.floor(Math.random() * withdrawMethods.length)],
        amount: `$${(Math.random() * 20 + 1).toFixed(2)}`,
        ...baseItem(),
      }
    })
  )

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-2xl font-bold text-center text-white mb-6">
        Live Withdrawals
      </h3>

      <LiveEngine
        items={items}
        setItems={setItems}
        renderRow={(u: any) => (
          <div className="flex md:grid md:grid-cols-5 items-center gap-3 text-white">
            <span className="username font-semibold">{u.username}</span>
            <span>{u.flag}</span>
            <span className="hidden md:block">{u.method}</span>
            <span className="text-green-300 font-semibold">{u.amount}</span>
            <span className="text-gray-300">{u.time}</span>
          </div>
        )}
      />
    </section>
  )
}
