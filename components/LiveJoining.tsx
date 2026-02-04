"use client"

import { useEffect, useState } from "react"

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
}

// Generate 100 fake users
const generateUsers = (): LiveUser[] =>
  Array.from({ length: 100 }, () => {
    const c = countries[Math.floor(Math.random() * countries.length)]
    return {
      username: randomName(),
      country: c.name,
      flag: c.flag,
      time: "Just now",
    }
  })

export default function LiveJoining() {
  const [users, setUsers] = useState<LiveUser[]>(generateUsers())

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const scrollNext = () => {
      setUsers((prev) => {
        const next = [...prev]
        const first = next.shift()
        if (first) {
          first.time =
            Math.random() > 0.5
              ? "Just now"
              : `${Math.floor(Math.random() * 5) + 1} min ago`
          next.push(first)
        }
        return next
      })

      // Call again after a random interval between 1s and 3s
      const randomInterval = Math.floor(Math.random() * 2000) + 1000
      timeout = setTimeout(scrollNext, randomInterval)
    }

    scrollNext()

    return () => clearTimeout(timeout)
  }, [])

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
        <ul className="space-y-2">
          {users.map((user, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-100 dark:bg-white/5
                border border-gray-200 dark:border-white/10 rounded-xl p-3 text-sm md:text-base transition-all duration-500"
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
