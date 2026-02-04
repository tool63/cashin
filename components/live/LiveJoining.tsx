import React from "react"
import { LiveWrapper } from "./SmallComponents" // ✅ Correct import

export default function LiveJoining() {
  const items = [
    { id: 1, flag: "🇺🇸", user: "JohnDoe" },
    { id: 2, flag: "🇬🇧", user: "JaneSmith" },
    { id: 3, flag: "🇨🇦", user: "Alex" },
  ]

  return (
    <LiveWrapper title="🔥 Live Joining">
      {items.map((i) => (
        <div
          key={i.id}
          className="flex justify-between p-2 bg-white dark:bg-[#111827] rounded-md"
        >
          <span>{i.flag} {i.user}</span>
        </div>
      ))}
    </LiveWrapper>
  )
}
