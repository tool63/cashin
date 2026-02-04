import React from "react"
import { LiveWrapper } from "./SmallComponents" // ✅ Import LiveWrapper

export default function LiveOfferCompletion() {
  const items = [
    { id: 1, flag: "🇺🇸", user: "Emma" },
    { id: 2, flag: "🇬🇧", user: "Liam" },
    { id: 3, flag: "🇨🇦", user: "Olivia" },
  ]

  return (
    <LiveWrapper title="✅ Live Offer Completion">
      {items.map((i) => (
        <div key={i.id} className="flex justify-between p-2 bg-white dark:bg-[#111827] rounded-md">
          <span>{i.flag} {i.user}</span>
        </div>
      ))}
    </LiveWrapper>
  )
}
