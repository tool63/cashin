"use client"

import { useEffect, useState } from "react"

interface LiveJoiningItem {
  username: string
  task: string
  time: string
}

const sampleData: LiveJoiningItem[] = [
  { username: "Alex23", task: "Surveys", time: "Just now" },
  { username: "MiaK", task: "App Installs", time: "1 min ago" },
  { username: "JohnD", task: "Watching Videos", time: "2 min ago" },
  { username: "SaraL", task: "Offerwall", time: "Just now" },
]

export default function LiveJoining() {
  const [data, setData] = useState<LiveJoiningItem[]>([])

  useEffect(() => {
    // Simulate live updates every 3s
    setData(sampleData)
    const interval = setInterval(() => {
      setData((prev) => [
        ...sampleData.sort(() => Math.random() - 0.5),
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
        Live Joining
      </h3>

      <ul className="space-y-3">
        {data.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-gray-100 dark:bg-white/5
              border border-gray-200 dark:border-white/10 rounded-xl p-4"
          >
            <span className="font-semibold">{item.username}</span>
            <span className="text-gray-600 dark:text-gray-400">{item.task}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
