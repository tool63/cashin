"use client"

import { useEffect, useRef, useState } from "react"

// Countries and flags
const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "India", flag: "🇮🇳" },
  { name: "France", flag: "🇫🇷" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Brazil", flag: "🇧🇷" },
]

// Random username generator
function randomName() {
  const names = ["Alex", "Mia", "John", "Sara", "Leo", "Emma", "Chris", "Liam", "Olivia", "Noah"]
  const numbers = Math.floor(Math.random() * 100)
  return names[Math.floor(Math.random() * names.length)] + numbers
}

interface LiveUser {
  username: string
  country: string
  flag: string
  time: string
  speed: number // unique speed per row
  highlight?: boolean // flash effect
}

// Generate 100 users
const generateUsers = (): LiveUser[] =>
  Array.from({ length: 100 }, () => {
    const c = countries[Math.floor(Math.random() * countries.length)]
    return {
      username: randomName(),
      country: c.name,
      flag: c.flag,
      time: `${Math.floor(Math.random() * 10) + 1}s ago`, // 1s → 10s
      speed: 0.3 + Math.random() * 1.2,
      highlight: false,
    }
  })

export default function LiveJoining() {
  const [users, setUsers] = useState<LiveUser[]>(generateUsers())
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let animationFrame: number

    const scrollStep = () => {
      if (!listRef.current) return

      const listItems = Array.from(listRef.current.children) as HTMLLIElement[]

      listItems.forEach((item, index) => {
        const user = users[index]
        const currentMargin = parseFloat(item.style.marginBottom || "0")
        item.style.marginBottom = `${(currentMargin + user.speed).toFixed(2)}px`
      })

      const lastItem = listItems[listItems.length - 1]
      if (lastItem) {
        const lastHeight = lastItem.offsetHeight
        const lastMargin = parseFloat(lastItem.style.marginBottom || "0")

        if (lastMargin >= lastHeight) {
          // Move last item to top with highlight
          setUsers((prev) => {
            const next = [...prev]
            const moved = next.pop()
            if (moved) {
              moved.time = `${Math.floor(Math.random() * 10) + 1}s ago`
              moved.speed = 0.3 + Math.random() * 1.2
              moved.highlight = true
              next.unshift(moved)
            }

            // Reset margin for all
            listItems.forEach((li) => (li.style.marginBottom = "0"))
            return next
          })

          // Remove highlight after 700ms
          setTimeout(() => {
            setUsers((prev) =>
              prev.map((u, i) => (i === 0 ? { ...u, highlight: false } : u))
            )
          }, 700)
        }
      }

      animationFrame = requestAnimationFrame(scrollStep)
    }

    animationFrame = requestAnimationFrame(scrollStep)
    return () => cancelAnimationFrame(animationFrame)
  }, [users])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
        Live Joining
      </h3>

      {/* Table header */}
      <div className="grid grid-cols-3 gap-4 md:grid-cols-3 text-center mb-2">
        <span className="font-semibold hidden md:block">Username</span>
        <span className="font-semibold hidden md:block">Country</span>
        <span className="font-semibold hidden md:block">Time</span>
      </div>

      {/* Auto-scrolling list */}
      <div className="overflow-hidden h-[360px] md:h-[400px]">
        <ul ref={listRef} className="space-y-2">
          {users.map((user, idx) => (
            <li
              key={idx}
              className={`flex justify-between items-center border rounded-xl p-3 text-sm md:text-base
                transition-colors duration-500
                ${
                  user.highlight
                    ? "bg-green-400/50 dark:bg-green-500/50 border-green-300 dark:border-green-400 shadow-lg shadow-green-400/50 animate-pulse"
                    : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10"
                }`}
            >
              <span className="font-semibold">{user.username}</span>
              <span className="flex items-center justify-center gap-2">
                <span>{user.flag}</span>
                <span className="hidden md:inline">{user.country}</span>
              </span>
              <span className="text-gray-600 dark:text-gray-400">{user.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
