import React from "react"
import { LiveWrapper } from "./SmallComponents"  // ✅ Correct import

export default function LiveEarnings() {
  const items = [
    { id: 1, flag: "🇺🇸", user: "User123", amount: "$5.20" },
    { id: 2, flag: "🇬🇧", user: "User456", amount: "$3.80" },
  ]

  return (
    <LiveWrapper title="💸 Live Earnings">
      {items.map((i) => (
        <div key={i.id} className="flex justify-between p-2 bg-white dark:bg-[#111827] rounded-md">
          <span>{i.flag} {i.user}</span>
          <span className="font-semibold">{i.amount}</span>
        </div>
      ))}
    </LiveWrapper>
  )
}
