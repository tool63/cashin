"use client"

import { SectionTitle } from "./SmallComponents"

export default function LiveWithdrawals() {
  const withdrawals = [
    ["User #6501", "PayPal", "$10.00"],
    ["User #2290", "USDT", "$25.00"],
    ["User #8842", "Gift Card", "$5.00"],
  ]

  return (
    <section className="py-14">
      <SectionTitle icon="🏦" text="Live Withdrawals" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {withdrawals.map(([user, method, amount], i) => (
          <div
            key={i}
            className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 flex justify-between"
          >
            <div>
              <p className="font-medium">{user}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Withdraw via {method}</p>
            </div>
            <span className="text-indigo-400 font-semibold">{amount}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
