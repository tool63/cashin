import React from "react"
import { LiveWrapper } from "./SmallComponents" // ✅ Import LiveWrapper

export default function LiveWithdrawals() {
  const items = [
    { id: 1, flag: "🇺🇸", user: "Mike" },
    { id: 2, flag: "🇬🇧", user: "Anna" },
    { id: 3, flag: "🇨🇦", user: "Sophia" },
  ]

  return (
    <LiveWrapper title="💵 Live Withdrawals">
      {items.map((i) => (
        <div key={i.id} className="flex justify-between p-2 bg-white dark:bg-[#111827] rounded-md">
          <span>{i.flag} {i.user}</span>
        </div>
      ))}
    </LiveWrapper>
  )
}
