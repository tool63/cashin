"use client"

import { useEffect, useMemo, useRef, useState } from "react"

/* ================= DATA ================= */

const names = [
  "Alex","Emma","Liam","Noah","Olivia","Sophia","James","Daniel",
  "Ava","Lucas","Mia","Ethan","Amelia","Benjamin","Henry","Ella",
  "Jack","Leo","Grace","Arjun","Ayaan","Rahul","Sofia",
]

const flags = ["🇺🇸","🇬🇧","🇨🇦","🇩🇪","🇫🇷","🇮🇳","🇯🇵","🇧🇷"]

const randomTime = () => `${Math.floor(Math.random() * 10) + 1}s ago`

/* ================= TYPES ================= */

interface LiveJoin {
  id: number
  name: string
  flag: string
  time: string
}

/* ================= HELPERS ================= */

const createJoin = (used: Set<string>): LiveJoin => {
  let name = ""
  do {
    name = names[Math.floor(Math.random() * names.length)]
  } while (used.has(name))

  used.add(name)

  return {
    id: Date.now() + Math.random(),
    name,
    flag: flags[Math.floor(Math.random() * flags.length)],
    time: randomTime(),
  }
}

/* ================= COMPONENT ================= */

export default function LiveJoining() {
  const [items, setItems] = useState<LiveJoin[]>([])
  const offsetRef = useRef(0)
  const containerRef = useRef<HTMLUListElement>(null)

  /* Initial items (only once) */
  useEffect(() => {
    const used = new Set<string>()
    setItems(Array.from({ length: 40 }, () => createJoin(used)))
  }, [])

  /* Smooth auto scroll (optimized) */
  useEffect(() => {
    const interval = setInterval(() => {
      offsetRef.current += 0.5

      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-${offsetRef.current}px)`
      }

      if (offsetRef.current >= 48) {
        offsetRef.current = 0

        setItems(prev => {
          const used = new Set(prev.map(i => i.name))
          return [createJoin(used), ...prev.slice(0, -1)]
        })
      }
    }, 33) // ~30fps (very light)

    return () => clearInterval(interval)
  }, [])

  /* Static gradient (no recalculation per frame) */
  const gradient = useMemo(
    () =>
      "linear-gradient(90deg,#ff0080,#7928ca,#2afadf)",
    []
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">
        🔥 Live Joining
      </h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] rounded-xl px-2 py-2">
        {/* Header */}
        <div className="grid grid-cols-3 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Name</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">Time</span>
        </div>

        <ul
          ref={containerRef}
          className="space-y-2 will-change-transform"
        >
          {items.map(j => (
            <li
              key={j.id}
              style={{ background: gradient }}
              className="grid grid-cols-3 items-center border rounded-xl p-3 text-sm md:text-base text-white"
            >
              <span className="font-semibold truncate">{j.name}</span>
              <span className="text-center text-lg">{j.flag}</span>
              <span className="opacity-80 text-center">{j.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
